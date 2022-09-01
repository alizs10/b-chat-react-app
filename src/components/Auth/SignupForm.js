import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../Context/AuthContext'

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { checkUsername, register } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { set } from 'lodash';

YupPassword(Yup);

function SignupForm() {


    const {setMessage, username, setUsername, setEmail} = useContext(AuthContext)

    const navigate = useNavigate()

    const [usernameErr, setUsernameErr] = useState("")

    const [usernameAvailability, setUsernameAvailability] = useState(null)
    const [checking, setChecking] = useState(false)

    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().password(),
        password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null], "must match your password")
    })

    const handleUsername = value => {

        //validation
        if (value.match(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)) {

            setUsernameErr("")
        } else if (value === "") {

            setUsernameErr("username is required")
        }
        else {
            setUsernameErr("allowed chars: . _ a-z A-Z 0-9")
        }
        setUsername(value)
    }

    useEffect(() => {

        if (username.length >= 6) {
            setTimeout(async () => {
                setChecking(true)
                let availability = await checkUsername({ username })
                console.log(availability);
                availability.available ? setUsernameAvailability(true) : setUsernameAvailability(false)
                setChecking(false)
            }, 1000)
        } else {
            setChecking(false)
            setUsernameAvailability(null)
        }

    }, [username])

    return (

        <>
            <Formik
                initialValues={{ email: "", password: "", password_confirmation: "" }}
                validationSchema={() => validationSchema}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    values.username = username
                    setSubmitting(true)
                    let res = await register(values)

                    if (res.status) {
                        let data = res.data;
                        
                        setMessage(data.message)
                        setEmail(data.user.email)
                        navigate('/auth/verify')
                    } else {
                        console.log(res.errors);
                        setErrors(res.errors)
                        setSubmitting(false)
                    }

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
                            <div className='flex justify-between'>
                                <label className="ml-3 text-sm text-gray-600">Username</label>
                                {usernameAvailability != null && (

                                    <span className='text-xs'>
                                        {checking ? "checking" : (
                                            usernameAvailability ? "available" : "taken"
                                        )}
                                    </span>
                                )}
                            </div>
                            <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='username'
                                value={username}
                                onChange={e => handleUsername(e.target.value)}
                            />
                        </div>
                        {usernameErr !== "" && (
                            <span className='ml-3 text-xs text-red-500'>{usernameErr}</span>
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
                        <button className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${isSubmitting ? 'bg-gray-200' : 'bg-[#4361EE]'} btn-hover text-white transition-all duration-300`}>
                            <span className='text-lg'>Sign up</span>
                            <i className="fa-regular fa-user-plus text-base"></i>
                        </button>
                    </form>
                )}
            </Formik>
            <div className='flex gap-x-2 items-end text-sm mx-auto'>
                <span className="text-gray-600">Already a memeber?</span>
                <Link to="/auth/login">
                    <button className='text-[#1C42EA]'>Login!</button>
                </Link>
            </div>
        </>

    )
}

export default SignupForm