import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Auth from './components/Auth/Auth'
import LoginForm from './components/Auth/LoginForm'
import SignupForm from './components/Auth/SignupForm'
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
                    <AuthContextContainer>
                        <AuthCheck>
                            <Auth />
                        </AuthCheck>
                    </AuthContextContainer>
                }>
                    <Route path='login' element={<LoginForm/>}/>
                    <Route path='register' element={<SignupForm/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes