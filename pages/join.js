import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Heading from '../components/Heading';
import ButtonSquare from '../components/ButtonSquare';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from "../components/Menu";



export default function Join() {
    //ROUTER
    const router = useRouter();



    //REDIRECT LOGGED-IN USERS AWAY
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        if (state && state.user && state.user.email) {
            router.push('/');
        }
    })



    //RENDER
    return (
        <div className='join-page'>
            <Bricks />
            <Switch />
            <Menu />

            <article className='main-box'>
                <Heading>
                    Why <span>join</span> us?
                </Heading>
                <p>
                    Why sign up? So you can share the most interesting places youve seen in Slovakia with the community. The entire content of the page doesnt require signup. Feel free to browse and explore Slovakias top spots. If you do join us, however, youll be able to write articles and add photos of the places you think are worth seeing.
                </p>
                <div className='button-box'>
                        <ButtonSquare text='Sign up' action={() => router.push('/signup') } />
                        <ButtonSquare text='Sign in' action={() => router.push('/signin')} />
                </div>
            </article>
        </div>
    )
}
