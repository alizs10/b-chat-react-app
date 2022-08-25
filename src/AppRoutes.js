import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import Auth from './components/Auth/Auth'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes