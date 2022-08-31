import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../../api/auth';

import { deleteUser, setUser } from '../../redux/slices/userSlice';

function AuthCheck({ children }) {

    const [loading, setLoading] = useState(true);

    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        async function check() {

            //check for authentication
            let token = localStorage.getItem('token');

            if (token) {

                const res = await checkAuthentication(token);

                if (res) {
                    dispatch(setUser(res))
                    navigate('/')
                } else {
                    dispatch(deleteUser())

                    if (location.pathname === "/auth") {
                        navigate('/auth')
                    } else if (location.pathname === "/auth/login") {
                        navigate('/auth/login')
                    }
                    else if (location.pathname === "/auth/register") {
                        navigate('/auth/register')
                    } else if (location.pathname === "/auth/verify") {
                        navigate('/auth/verify')
                    } else {
                        navigate('/auth')
                    }
                }

            } else {
                dispatch(deleteUser())
                if (location.pathname.includes('/auth')) {
                    navigate(location.pathname)
                } else {
                    navigate('/auth')

                }
            }

            setLoading(false)
        }

        check()

    }, [])


    return !loading ? (
        <>
            {children}
        </>
    ) : null;
}

export default AuthCheck