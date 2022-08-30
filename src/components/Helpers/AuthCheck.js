import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

import { Navigate, useLocation } from 'react-router-dom';
import { checkAuthentication } from '../../api/auth';
import AuthContext from '../../Context/AuthContext';

function AuthCheck({ children }) {

    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const location = useLocation();

    useEffect(() => {
        
        async function check() {

            //check for authentication
            console.log("is? ", isAuthenticated);
            let token = localStorage.getItem('token');

            if (token) {

                const res = await checkAuthentication(token);

                if (res) {
                    setIsAuthenticated(true)
                } else {

                    setIsAuthenticated(false)
                }
            }

            setLoading(false)
        }

        check()
        
    })


    return !loading ? (
        (isAuthenticated || location.pathname === "/auth") ? (
            (location.pathname === "/auth" && isAuthenticated) ? (
                <Navigate to="/" />
            ) :
                (

                    <>
                        {children}
                    </>
                )

        ) : <Navigate to="/auth" />
    ) : null;
}

export default AuthCheck