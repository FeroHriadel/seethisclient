import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Menu from '../components/Menu';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import SignupForm from '../components/SignupForm';
import Image from 'next/image';




export default function Signup() {
    //REDIRECT LOGGED-IN USERS AWAY
    const router = useRouter();
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (state && state.user) {
            router.push('/');
        }
    }, []);



    //RENDER
    return (
        <div className='signup-page'>
            <Switch />
            <Menu />
            <Bricks />
            <div className='container'>
                <Image src='images/signup.svg' />
                <SignupForm />
            </div>
        </div>
    )
}
