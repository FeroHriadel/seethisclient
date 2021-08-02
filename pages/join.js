import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Heading from '../components/Heading';
import ButtonSquare from '../components/ButtonSquare';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from "../components/Menu";



export default function join() {
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
                    Why sign up? So you can share the most interesting places you've seen in Slovakia with the community. The entire content of the page doesn't require signup. Feel free to browse and explore Slovakia's top spots. If you do join us, however, you'll be able to write articles and add photos of the places you think are worth seeing.
                </p>
                <div className='button-box'>
                        <ButtonSquare text='Sign up' action={() => router.push('/signup') } />
                        <ButtonSquare text='Sign in' action={() => router.push('/signin')} />
                </div>
            </article>
        </div>
    )
}
