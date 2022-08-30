import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom';
import { checkAuthentication } from '../../api/auth';

function AuthCheck({ children }) {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const location = useLocation();

    useEffect(() => {
        async function check() {
            //check for authentication
            let token = localStorage.getItem('token');

            if (token) {

                const res = await checkAuthentication(token);

                if (res) {
                    setIsAuthenticated(true)
                } else {

                    setIsAuthenticated(false)
                }
            } else {

                setIsAuthenticated(false)
            }

            setLoading(false)
        }

        check()
    }, [])

    return !loading ? (
        isAuthenticated ? (
            location.pathname !== "/auth" ? (

                <>
                {children}
            </>
                ) : (
                    <Navigate to="/" />        
                )

        ) : <Navigate to="/auth" />
    ) : null;
}

export default AuthCheck