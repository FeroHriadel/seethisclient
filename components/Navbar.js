import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonSquare from './ButtonSquare';
import { auth } from '../firebase/firebase';
import { Context } from '../context';
import { getUser } from  '../actions/userActions';



export default function Navbar() {
    //ROUTER
    const router = useRouter();


    //GET USER
    const { state, dispatch } = useContext(Context);
    const [user, setUser] = useState(false); //html doesn't seem to work well with context.state, so I am using react.state
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (state && state.user && state.user.email) {
            setUser(true);

            //
            getUser(state.user.token)
                .then(data => {
                    if (!data || data.error) {
                        console.log('Navbar getUser error');
                        return;
                    }

                    if (data.role === 'admin') {
                        setIsAdmin(true);
                    }
                });
            //
        } else {
            setUser(false);
        }
    }, [state.user]);



    //RENDER
    return (
        <nav className='navbar-main-box' style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <ul style={{listStyleType: 'none'}}>
                <li onClick={() => router.push('/')}>
                    <div className='nav-logo' style={{
                        width: '260px',
                        height: '75px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#333',
                        margin: '10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                    }}
                    >
                        <h3 style={{
                            fontFamily: 'Aclonica',
                            fontSize: '18px',
                            color: 'var(--red-color)',

                        }}>
                            TOP SPOTS
                        </h3>

                        <div style={{width: '50%', height: '2px', background: '#ddd', marginBottom: '5px'}} />

                        <h3 style={{
                            fontFamily: 'Aclonica',
                            fontSize: '18px',
                            color: '#ddd',
                        }}>
                            IN SLOVAKIA
                        </h3>
                    </div>
                </li>
                <li>
                    <ButtonSquare text='All Spots' action={() => {router.push('/spots/allspots')}} />
                </li>
                <li>
                    <ButtonSquare text='Add Spot' action={() => {router.push('/spots/addspot')}} />
                </li>
                <li>
                    <ButtonSquare text='Search Spots' action={() => {router.push('/spots/searchspots')}} />
                </li>
                <li>
                    <ButtonSquare text='Map' action={() => {router.push('/map')}} />
                </li>
                <li>
                    <ButtonSquare text='My Spots' action={() => {router.push('/profile')}} />
                </li>
                <li>
                    {
                        user
                        ?
                        <ButtonSquare text='Sign out' action={() => {
                            auth.signOut();
                            setIsAdmin(false);
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: null
                            });
                        }} />
                        :
                        <ButtonSquare text='Log in' action={() => {router.push('/join')}} />
                    }
                </li>
                {
                    isAdmin
                    &&
                    <li>
                        <ButtonSquare text='Admin Dashboard' action={() => {router.push('/admin')}} />
                    </li>
                }
            </ul>
        </nav>
    )
}
