import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../../api/auth';
import { BChatContext } from '../../Context/BChatContext';

import { deleteUser, setUser } from '../../redux/slices/userSlice';

function AuthCheck({ children }) {

    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();

    const {progress, setProgress, loading, setLoading} = useContext(BChatContext)

    useEffect(() => {
        setLoading(true)
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

    const { isLoading, isError, data, error } = useQuery(
        ['check-auth'],
        checkAuthentication,
        {
            refetchOnWindowFocus: false,
            onSuccess: data => {
                check(data)
            },
            onError
        }
    )

    async function check(data) {

        //check for authentication
        let token = localStorage.getItem('token');

        if (token) {

            const res = data;

            if (res) {
                dispatch(setUser(res.data))
                navigate('/')
            } else {
                onError()
            }

        } else {
            dispatch(deleteUser())
            if (location.pathname.includes('/auth')) {
                navigate(location.pathname)
            } else {
                navigate('/auth')

            }
        }

        setProgress(100)

    }

    return !isLoading ? (
        <>
            {children}
        </>
    ) : null;
}

export default AuthCheck