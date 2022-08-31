import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import AuthContext from '../../Context/AuthContext'

import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { checkUsername } from '../../api/auth';
import { Link } from 'react-router-dom';
YupPassword(Yup);

function SignupForm({ setLoginFormVisibility, setSignupFormVisibility }) {

    const { handleRegister } = useContext(AuthContext)

    const [usernameAvailability, setUsernameAvailability] = useState(null)
    const [checking, setChecking] = useState(false)

    const handleSwitchToLogin = () => {
        setLoginFormVisibility(true)
        setSignupFormVisibility(false)
    }

    const validationSchema = Yup.object({
        username: Yup.string().matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/, "allowed chars: . _ a-z A-Z 0-9").required().min(6).max(25),
        email: Yup.string().required().email(),
        password: Yup.string().required().password(),
        passwordConfirmation: Yup.string().required().oneOf([Yup.ref('password'), null], "must match your password")
    })

    return (

        <>
            <Formik
                initialValues={{ email: "", username: "", password: "", passwordConfirmation: "" }}
                validate={(values) => {
                    if (values.username.length >= 6) {
                        setTimeout(async () => {
                            setChecking(true)
                            let availability = await checkUsername({ username: values.username })
                            console.log(availability);
                            availability.available ? setUsernameAvailability(true) : setUsernameAvailability(false)
                            setChecking(false)
                        }, 1000)
                    } else {
                        setChecking(false)
                        setUsernameAvailability(null)
                    }
                }}
                validationSchema={() => validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    // on submit

                    console.log(values);
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
                                name='passwordConfirmation'
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.passwordConfirmation && touched.passwordConfirmation && (
                            <span className='ml-3 text-xs text-red-500'>{errors.passwordConfirmation}</span>
                        )}
                        <button type='submit' className='mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners bg-[#4361EE] btn-hover text-white transition-all duration-300'>
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