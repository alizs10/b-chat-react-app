import { useMutation } from '@tanstack/react-query'
import { Formik } from 'formik'
import React, { useContext, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { login } from '../../api/auth'
import { BChatContext } from '../../Context/BChatContext'

import { deleteUser, setUser } from '../../redux/slices/userSlice'
import { notify } from '../Helpers/notify'

function LoginForm() {

    const { setLoading, setProgress } = useContext(BChatContext)

    useEffect(() => {
        setProgress(100)
    }, [])

    const handleNavigateToRegister = () => {
        setLoading(true)
        setProgress(70)
        navigate('/auth/register')
    }

    const handleNavigateToForgotPassword = () => {
        setLoading(true)
        setProgress(70)
        navigate("/auth/forgot-password")
    }

    const { mutate: sendLoginRequest } = useMutation(credential => login(credential), {
        onSuccess: data => {
            setProgress(100)
            loginFormRef?.current.setSubmitting(false)

            let res = data;
            if (res?.status) {
                localStorage.setItem('token', res.data.token)
                dispatch(setUser(res.data.user))
                navigate('/')
                setTimeout(() => {
                    notify("you're logged in", "success")
                }, 1000)

            } else {
                dispatch(deleteUser())
                loginFormRef?.current.setErrors(res.errors)
                notify(res.errors.message[0], "warning")
            }
        }
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialValues = {
        username: "",
        password: ""
    }

    const validationSchema = object({
        username: string().required().min(6).max(25),
        password: string().required().min(8).max(16)
    })

    const loginFormRef = useRef(null)

    return (
        <>
            <Formik
                innerRef={loginFormRef}
                initialValues={initialValues}
                validationSchema={() => validationSchema}
                onSubmit={(values, { setSubmitting }) => {

                    setSubmitting(true)
                    setLoading(true)
                    setProgress(70)

                    let credentials = {
                        username: values.username,
                        password: values.password
                    }
                    sendLoginRequest(credentials)
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
                            <label className="ml-3 text-sm text-gray-600">Username</label>
                            <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='username'
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.username && touched.username && (
                            <span className='text-xs text-red-500'>{errors.username}</span>
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
                            <span className='text-xs text-red-500'>{errors.password}</span>
                        )}

                        <button type='submit' disabled={isSubmitting} className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${isSubmitting ? "bg-gray-200" : "bg-[#4361EE]"} btn-hover text-white transition-all duration-300`}>
                            <span className='text-base'>Login</span>
                            <i className="fa-regular fa-arrow-right-to-arc text-lg"></i>
                        </button>
                    </form>
                )}
            </Formik>
            <div className='flex-center flex-col gap-y-2'>

                <div className='flex gap-x-2 items-end text-sm mx-auto'>
                    <span className="text-gray-600">Not a memeber?</span>

                    <button
                        onClick={handleNavigateToRegister}
                        className='text-[#1C42EA]'>Sign up!</button>

                </div>

                <button
                    onClick={handleNavigateToForgotPassword}
                    className='text-gray-600 text-xs'>Forgot Password?</button>

            </div>
        </>
    )
}

export default LoginForm