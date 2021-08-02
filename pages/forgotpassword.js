import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Menu from '../components/Menu';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Image from 'next/image';



export default function Forgotpassword() {
    //REDIRECT LOGGED-IN USERS AWAY
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (state && state.user && state.user.email) {
            router.push('/');
        }
    });

    

    //RENDER
    return (
        <div className='forgot-password-page'>
            <Switch />
            <Menu />
            <Bricks />

            <div className='container'>
                <Image src='images/forgotpassword.svg' />
                <ForgotPasswordForm />
            </div>
        </div>
    )
}
