import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../../api/auth';
import { BChatContext } from '../../Context/BChatContext';

import { deleteUser, setUser } from '../../redux/slices/userSlice';
import { notify } from './notify';

function AuthCheck({ children }) {

    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();

    const { setProgress, setLoading } = useContext(BChatContext)

    useEffect(() => {
        setLoading(true)
        setProgress(70)
    }, [])

    const onError = () => {
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

        setProgress(100)
    }

    const { isLoading } = useQuery(
        ['check-auth'],
        checkAuthentication,
        {
            refetchOnWindowFocus: false,
            onSettled: (data, error) => {

                //success
                if (data.status == 200) {
                    let user = data.data
                    dispatch(setUser(user))
                    navigate('/')
                } else {
                    navigate('/auth/login')
                    setTimeout(() => {
                        notify(data.errors.message[0], "warning")
                    }, 1000)

                }

                setProgress(100)
            }
        }
    )

    if (isLoading) return;

    return (
        <>
            {children}
        </>
    );
}

export default AuthCheck