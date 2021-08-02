import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase';
import { useRouter } from 'next/router';
import { Context } from '../context';
import Menu from '../components/Menu';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Heading from '../components/Heading';
import ButtonSquare from '../components/ButtonSquare';
import { signup } from '../actions/userActions';







export default function Completeregistration() {
    //CONTEXT
    const { state, dispatch } = useContext(Context);



    //ROUTER
    const router = useRouter();



    //VALUES
    const [values, setValues] = useState({email: '', password: ''});
    const { email, password } = values;
    const [message, setMessage] = useState('Please click the button to complete your registration');
    const [submitShown, setSubmitShown] = useState(true);

    useEffect(() => {
        setValues({
            email: window.localStorage.getItem('emailForRegistration'),
            password: window.localStorage.getItem('passwordForRegistration')
        });
    }, []);
   


    //SUBMIT HANDLER
    const handleSubmit = async e => {
        e.preventDefault();
        setMessage('Loading...');
        setSubmitShown(false);

        if (!email || !password) {
            return setMessage('Sorry, your password & email got lost. Try signing up again');
        }

        try {
             //save and login user in firebase
            const result = await auth.signInWithEmailLink(email, window.location.href);

            if (result.user.emailVerified)  {
                //save user's password in firebase
                window.localStorage.removeItem('emailForRegistration');
                window.localStorage.removeItem('passwordForRegistration');
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                       
                //save user in mongo
                signup(idTokenResult.token)
                    .then(data => {
                        if (!data || data.error) {
                            return setMessage(`Error: ${data.error}`);
                        }

                        //put user in Context
                        if (data.role === 'user') {
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: {
                                    email: user.email,
                                    token: idTokenResult.token,
                                    isAdmin: false
                                }
                            });

                            setSubmitShown(false);
                            setMessage('Thank you for signing up. Redirecting...');
                            setTimeout(() => {router.push('/');}, 2000);
                        }

                        if (data.role === 'admin') {
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: {email: user.email, token: idTokenResult.token, isAdmin: true}
                            });

                            setSubmitShown(false);
                            setMessage('Thnk you for signing up. Redirecting...');
                            setTimeout(() => {router.push('/admin');}, 2000);
                        }
                });
            }

        } catch (error) {
            console.log(error);
            setMessage('Error: ', error);
            window.localStorage.removeItem('emailForRegistration');
            window.localStorage.removeItem('passwordForRegistration');
        }
    }



    //RENDER
    return (
        <div className='complete-registration-page'>
            <Bricks />
            <Switch />
            <Menu />

            <div className='container'>
                <Heading>
                    <span>Complete</span> your Registration
                </Heading>
                {message && <p>{message}</p>}
                {submitShown && <ButtonSquare text='Complete' action={handleSubmit} />}
            </div>
        </div>
    )
}