import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

export const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) return;
        // @todo : Reverse this user initilaization to user -> !user and vice versa
        if (user) {
            clearUser();
            navigate("/login")
        }
    }, [user, loading, clearUser, navigate]);
};
