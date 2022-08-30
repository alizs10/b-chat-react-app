import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Auth from './components/Auth/Auth'
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
                    <AuthCheck>
                        <AuthContextContainer>
                            <Auth />
                        </AuthContextContainer>
                    </AuthCheck>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes