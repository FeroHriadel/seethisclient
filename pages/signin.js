import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Menu from '../components/Menu';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import SigninForm from '../components/SigninForm';
import Image from 'next/image';




export default function Signin() {
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
        <div className='signin-page'>
            <Switch />
            <Menu />
            <Bricks />
            <div className='container'>
                <div className='img'>
                    <Image 
                        src='/images/signin.svg' 
                        alt='' 
                        width='800' 
                        height='800' 
                        layout='intrinsic'
                    />
                </div>  
                <SigninForm />
            </div>
        </div>
    )
}
