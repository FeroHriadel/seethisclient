import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Menu from '../components/Menu';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import UpdatePasswordForm from '../components/UpdatePasswordForm';
import ProtectRoute from '../components/ProtectRoute';
import Image from 'next/image';



export default function Updatepassword() {

    //RENDER
    return (
        <ProtectRoute>
        <div className='update-password-page'>
            <Switch />
            <Menu />
            <Bricks />
            <div className='container'>
                <Image src='images/updatepassword.svg' />
                <UpdatePasswordForm />
            </div>
        </div>
        </ProtectRoute>
    )
}
