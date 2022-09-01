import React, { useContext, useRef, useState } from 'react'
import { object, string, ValidationError } from 'yup'
import { verifyEmail } from '../../api/auth'
import AuthContext from '../../Context/AuthContext'

function VerificationCodeForm() {


    const { email, message, setMessage } = useContext(AuthContext)

    const [vCodeArr, setVCodeArr] = useState(["", "", "", "", "", ""])
    const [update, setUpdate] = useState(false)
    const [errors, setErrors] = useState({})
    const [formSubmitting, setFormSubmitting] = useState(false)

    const handleVerificationCode = (e, position) => {

        let value = e.target.value;

        if (value.match(/[0-9]/g) || value === "") {
            if (value.length > 1 && position == 0) {
                let arrValue = value.split("")
                let arr = vCodeArr;
                arrValue.map((number, index) => {
                    if (index < 6) {
                        arr[index] = number
                        let next = index + 1;
                        if (next < 6) {
                            handleFocusOnInput(next)
                        }
                    }
                })
                setVCodeArr(arr)
                setUpdate(!update)
            } else {
                if (value.length > 1) return

                let arr = vCodeArr;
                arr[position] = value;
                setVCodeArr(arr)
                setUpdate(!update)

                if (value !== "" && position != 5) {
                    let next = position + 1
                    handleFocusOnInput(next)

                }
            }
        }
    }

    const handleOnKeyDown = (e, position) => {
        if (e.keyCode == 8 && vCodeArr[position] === "") {
            let prev = position - 1;
            handleFocusOnInput(prev.toString())
        }
    }

    const handleFocusOnInput = (position) => {

        switch (position.toString()) {
            case "0":
                vcodeRef0.current.focus()
                break;
            case "1":
                vcodeRef1.current.focus()
                break;
            case "2":
                vcodeRef2.current.focus()
                break;
            case "3":
                vcodeRef3.current.focus()
                break;
            case "4":
                vcodeRef4.current.focus()
                break;
            case "5":
                vcodeRef5.current.focus()
                break;

            default:
                break;
        }
    }

    const vcodeRef0 = useRef(null)
    const vcodeRef1 = useRef(null)
    const vcodeRef2 = useRef(null)
    const vcodeRef3 = useRef(null)
    const vcodeRef4 = useRef(null)
    const vcodeRef5 = useRef(null)

    const validationSchema = object({
        email: string().required().email().label('email'),
        verification_code: string().required().length(6).matches(/[0-9]/, 'verification code must be a number').label('verification_code'),
    })


    const handleVerify = async e => {
        console.log("clicked");
        e.preventDefault()
        setFormSubmitting(true)
        let data = {
            verification_code: vCodeArr.join(""),
            email,
        }

        try {
            let validatedData = await validationSchema.validate(data, { abortEarly: false })

            if (validatedData) {
                setErrors({})

                let res = await verifyEmail(validatedData)
                console.log(res);
                if (res.status) {
                    let data = res.data;

                    setMessage(data.message)
                    setTimeout()


                } else {
                    console.log(res.errors);
                    setErrors(res.errors)
                }
            }

        } catch (err) {

            if (err instanceof ValidationError) {
                let validationErrors = {}
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });

                setErrors(validationErrors)
            }
            setFormSubmitting(false)
        }


    }

    return (
        <form className='flex-center flex-col gap-y-2' onSubmit={handleVerify}>

            <div className='w-4/5 md:w-3/5 lg:w-2/5'>
                {message && (
                    <span className='text-xs text-gray-600'>{message}, not receiving? <span className='text-blue-600'>click here</span></span>
                )}
                {errors && errors.email && (
                    <span className='text-center block text-xs text-red-500'>{errors.email}</span>
                )}
                {errors && errors.message && (
                    <span className='text-center block text-xs text-red-500'>{errors.message}</span>
                )}
                <span className="mt-4 ml-3 text-left block text-sm text-gray-600">Verification Code</span>
            </div>
            <div className='w-4/5 md:w-3/5 lg:w-2/5 grid grid-cols-6 gap-x-2'>

                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 0)}
                    onKeyDown={e => handleOnKeyDown(e, 0)}

                    value={vCodeArr[0]}
                    ref={vcodeRef0}
                />
                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 1)}
                    onKeyDown={e => handleOnKeyDown(e, 1)}
                    value={vCodeArr[1]}
                    ref={vcodeRef1}
                />
                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 2)}
                    onKeyDown={e => handleOnKeyDown(e, 2)}
                    value={vCodeArr[2]}
                    ref={vcodeRef2}
                />
                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 3)}
                    onKeyDown={e => handleOnKeyDown(e, 3)}
                    value={vCodeArr[3]}
                    ref={vcodeRef3}
                />
                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 4)}
                    onKeyDown={e => handleOnKeyDown(e, 4)}
                    value={vCodeArr[4]}
                    ref={vcodeRef4}
                />
                <input type="text" className='col-span-1 border border-gray-200 text-center p-2 md:p-3 focus:outline-none input-focus bg-transparent rounded-corners text-gray-800'
                    onChange={e => handleVerificationCode(e, 5)}
                    onKeyDown={e => handleOnKeyDown(e, 5)}
                    value={vCodeArr[5]}
                    ref={vcodeRef5}
                />
                {errors && errors.verification_code && (
                    <span className='mt-2 ml-3 col-span-6 text-xs text-red-500'>{errors.verification_code}</span>
                )}
            </div>
            <button type='submit' disabled={formSubmitting ? true : false} className={`mt-4 flex-center gap-x-2 items-center py-3 px-5 rounded-corners ${formSubmitting ? 'bg-gray-200' : 'bg-[#4361EE]'} btn-hover text-white transition-all duration-300`}>
                <span className='text-lg'>Verify</span>
                <i className="fa-regular fa-badge-check text-base"></i>
            </button>
        </form>
    )
}

export default VerificationCodeForm