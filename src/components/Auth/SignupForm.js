import { Formik } from 'formik'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../../Context/AuthContext'

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { checkUsername, register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { isNull } from 'lodash';
import { notify } from '../Helpers/notify';
import { BChatContext } from '../../Context/BChatContext';
import { useMutation } from '@tanstack/react-query';


YupPassword(Yup);

function SignupForm() {

    const { setLoading, setProgress } = useContext(BChatContext)

    const handleNavigateToLogin = () => {
        setLoading(true)
        setProgress(70)
        navigate('/auth/login')
    }

    useEffect(() => {
        setProgress(100)
    }, [])

    const { setMessage, setEmail } = useContext(AuthContext)

    const navigate = useNavigate()
    const formRef = useRef(null)


    const [usernameAvailability, setUsernameAvailability] = useState(null)
    const [checking, setChecking] = useState(false)


    const validationSchema = Yup.object({
        username: Yup.string().required().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'allowed chars: . _ a-z A-Z 0-9').min(6),
        email: Yup.string().required().email(),
        password: Yup.string().required().password(),
        password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null], "must match your password")
    })

    const { mutate: checkUsernameMutate } = useMutation(checkUsername, {
        onSettled: (data, error) => {
            console.log(data);
            data?.data?.available ? setUsernameAvailability(true) : setUsernameAvailability(false)
            setChecking(false)
            setProgress(100)
        }
    })

    const usernameValidationSchema = Yup.object({
        username: Yup.string().required().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, 'allowed chars: . _ a-z A-Z 0-9').min(6),
    })

    const handleCheckUsername = async value => {
        if (checking) {
            notify("can't send another request while there's one still in progress", "warning")
            return
        }

        try {
            setLoading(true)
            setProgress(70)
            setChecking(true)
            let data = { username: value }

            let validatedData = await usernameValidationSchema.validate(data, { abortEarly: false })
            if (validatedData) {
                formRef?.current.setErrors({})
                checkUsernameMutate(data)
            }

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                setUsernameAvailability(null)
                let validationErrors = {}
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });

                formRef?.current.setErrors(validationErrors)
                setChecking(false)
            }
            
        }
        setProgress(100)
    }

    const { mutate: sendRegisterReq } = useMutation(register, {
        onError: (error) => {
            console.log(error);
            formRef?.current?.setSubmitting(false)
            setProgress(100)
        },
        onSuccess: (data) => {
            setProgress(100)
            formRef?.current?.setSubmitting(false)
            const res = data?.data;

            if (data.status) {
                setMessage(res.message)
                setLoading(true)
                navigate(`/auth/verify/${res.user.email}`)
                setProgress(70)
            } else {
                formRef?.current?.setErrors(data.errors)
            }

        },

    })


    return (

        <>
            <Formik
                innerRef={formRef}
                initialValues={{ username: "", email: "", password: "", password_confirmation: "" }}
                validationSchema={() => validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setLoading(true)
                    setProgress(70)

                    sendRegisterReq(values)

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (


                    <form className='mx-auto p-3 flex flex-col gap-y-2' onSubmit={handleSubmit}>
                        {errors.message && (
                            <span className='text-center text-xs text-red-500'>{errors.message}</span>
                        )}
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <div className='flex justify-between mx-3'>
                                <label className="text-sm text-gray-600">Username</label>
                                <span className='flex gap-x-1 items-center'>
                                    <button type='button' onClick={() => handleCheckUsername(values.username)} className='text-xs text-[#1C42EA]'>{checking ? '...' : 'check'}</button>
                                    {!isNull(usernameAvailability) && (
                                        <span className={`${usernameAvailability ? 'text-emerald-500' : 'text-red-500'} text-xs`}>({usernameAvailability ? 'available' : 'taken'})</span>
                                    )}
                                </span>

                            </div>
                            <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.username && touched.username && (
                            <span className='ml-3 text-xs text-red-500'>{errors.username}</span>
                        )}
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Email</label>
                            <input type="email" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.email && touched.email && (
                            <span className='ml-3 text-xs text-red-500'>{errors.email}</span>
                        )}
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Password</label>
                            <input type="password" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password && touched.password && (
                            <span className='ml-3 text-xs text-red-500'>{errors.password}</span>
                        )}
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Confirm Password</label>
                            <input type="password" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='password_confirmation'
                                value={values.password_confirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password_confirmation && touched.password_confirmation && (
                            <span className='ml-3 text-xs text-red-500'>{errors.password_confirmation}</span>
                        )}
                        <button type='submit' disabled={isSubmitting ? true : false} className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${isSubmitting ? 'bg-gray-200' : 'bg-[#4361EE]'} btn-hover text-white transition-all duration-300`}>
                            <span className='text-lg'>Sign up</span>
                            <i className="fa-regular fa-user-plus text-base"></i>
                        </button>
                    </form>
                )}
            </Formik>
            <div className='flex gap-x-2 items-end text-sm mx-auto'>
                <span className="text-gray-600">Already a memeber?</span>

                <button
                    onClick={handleNavigateToLogin}
                    className='text-[#1C42EA]'>Login!</button>

            </div>
        </>

    )
}
export default SignupForm