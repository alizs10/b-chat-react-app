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
                    console.log("here");
                    dispatch(deleteUser())
                    navigate('/auth')
                }
            } else {
                dispatch(deleteUser())
                navigate('/auth')
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