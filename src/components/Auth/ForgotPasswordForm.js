import { Formik } from 'formik'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { object, string } from 'yup'
import { forgotPassword } from '../../api/auth'

function ForgotPasswordForm() {

    const [message, setMessage] = useState("")

    const validationSchema = object({
        email: string().required().email()
    })

    return (
        <>

            <Formik
                initialValues={{ email: "" }}
                validationSchema={() => validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {

                    setSubmitting(true)

                    let data = {
                        email: values.email
                    }

                    let res = await forgotPassword(data)

                    if (res.status) {
                        let data = res.data
                        setMessage(data.message)
                        resetForm()
                    } else {
                        setErrors(res.errors)
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
                        {message && (
                            <span className='text-center text-xs text-gray-600'>{message}</span>
                        )}
                        {errors.message && (
                            <span className='text-center text-xs text-red-500'>{errors.message}</span>
                        )}
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Email</label>
                            <input type="text" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.email && touched.email && (
                            <span className='text-xs text-red-500'>{errors.email}</span>
                        )}

                        <button type='submit' disabled={isSubmitting ? true : false} className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${isSubmitting ? "bg-gray-200" : "bg-[#4361EE]"} btn-hover text-white transition-all duration-300`}>
                            <span className='text-base'>Send Recovery Email</span>
                            <i className="fa-regular fa-paper-plane text-lg"></i>
                        </button>
                    </form>
                )}
            </Formik>
            <Link to="/auth/login">
                <button className='text-gray-600 text-xs'>Want to Login? click here</button>
            </Link>
        </>
    )
}

export default ForgotPasswordForm