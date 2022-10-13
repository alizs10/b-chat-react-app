import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Auth from './components/Auth/Auth'
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm'
import LoginForm from './components/Auth/LoginForm'
import ResetPasswordForm from './components/Auth/ResetPasswordForm'
import SignupForm from './components/Auth/SignupForm'
import VerificationCodeForm from './components/Auth/VerificationCodeForm'
import AuthContextContainer from './components/Context/AuthContextContainer'
import AuthCheck from './components/Helpers/AuthCheck'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <AuthCheck>
                        <App />
                    </AuthCheck>

                } />
                <Route path='/auth' element={
                    // <AuthCheck>
                        <AuthContextContainer>
                            <Auth />
                        </AuthContextContainer>
                    // </AuthCheck> 
                }>
                    <Route path='login' element={<LoginForm />} />
                    <Route path='register' element={<SignupForm />} />
                    <Route path='verify/:email' element={<VerificationCodeForm />} />
                    <Route path='forgot-password' element={<ForgotPasswordForm />} />
                    <Route path='reset-password/:email/:token' element={<ResetPasswordForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes