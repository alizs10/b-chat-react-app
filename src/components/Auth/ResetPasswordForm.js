import { Formik } from 'formik'
import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Yup from 'yup';
import { resetPassword } from '../../api/auth';

function ResetPasswordForm() {

    const {email, token} = useParams()

    const [message, setMessage] = useState("")

    const validationSchema = Yup.object({
        password: Yup.string().required().password(),
        password_confirmation: Yup.string().required().oneOf([Yup.ref('password'), null], "must match your password")
    })    

    const formRef = useRef(null)
    return (
        <>
            <Formik
                initialValues={{password: "", password_confirmation: ""}}
                validationSchema={() => validationSchema}
                onSubmit={async (values, { setSubmitting, setErrors,resetForm }) => {

                    setSubmitting(true)

                    let data = {
                        email: email,
                        reset_password_token: token,
                        password: values.password,
                        password_confirmation: values.password_confirmation
                    }

                    let res = await resetPassword(data);

                    if (res.status) {
                        let data = res.data;
                        setMessage(data.message)
                        if(data.status)
                        {
                            setSubmitting(false)    
                            resetForm()
                        }
                        
                    } else {
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
                    <form ref={formRef} className='mx-auto p-3 flex flex-col gap-y-2' onSubmit={handleSubmit}>
                        {message && (
                            <span className='text-center text-xs text-gray-600'>{message}</span>
                        )}
                        {errors.message && (
                            <span className='text-center text-xs text-red-500'>{errors.message}</span>
                        )}
                        
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Password</label>
                            <input autoFocus={true} type="password" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='flex flex-col gap-y-2 mt-2'>
                            <label className="ml-3 text-sm text-gray-600">Password Confirmation</label>
                            <input type="password" className='w-full border border-gray-200 p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                                name='password_confirmation'
                                value={values.password_confirmation}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {errors.password_confirmation && touched.password_confirmation && (
                            <span className='text-xs text-red-500'>{errors.password_confirmation}</span>
                        )}
                        <button type='submit' disabled={isSubmitting ? true : false} className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${isSubmitting ? "bg-gray-200" : "bg-[#4361EE]"} btn-hover text-white transition-all duration-300`}>
                            <span className='text-lg'>Reset Password</span>
                            <i className="fa-regular fa-arrow-right-to-arc text-base"></i>
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

export default ResetPasswordForm