import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { auth, googleAuthProvider }  from '../firebase/firebase';
import { useRouter } from 'next/router';
import Heading from '../components/Heading';
import ButtonSquare from './ButtonSquare';
import { signup } from '../actions/userActions';



export default function SigninForm() {
    //CONTEXT
    const { dispatch } = useContext(Context);



    //ROUTER
    const router = useRouter();



    //VALUES
    const [values, setValues] = useState({email: '', password: ''});
    const { email, password } = values;



    //FORM MESSAGE & BTN
    const [message, setMessage] = useState('');
    const [submitShown, setSubmitShown] = useState(true);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setValues({...values, [e.target.name]: e.target.value});
    }



    //SUBMIT HANDLER
    const handleSubmit = async e => {
        e.preventDefault();

        if (!email || !password) {
            return setMessage('Please fill in both fields');
        }

        if (!email.includes('.') || !email.includes('@')) {
            return setMessage('Please provide a valid email address');
        }

        try {
            //use firebase method to sign user in with email and password
            await auth.signInWithEmailAndPassword(email, password)
                .then(async result => {
                    const { user } = result;
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
                                setMessage('Signed in. Redirecting...');
                                setTimeout(() => {router.push('/');}, 2000);
                            }
    
                            if (data.role === 'admin') {
                                dispatch({
                                    type: 'LOGGED_IN_USER',
                                    payload: {email: user.email, token: idTokenResult.token, isAdmin: true}
                                });

                                setSubmitShown(false);
                                setMessage('Signed in. Redirecting...');
                                setTimeout(() => {router.push('/admin');}, 2000);
                            }
                        });
                });

        } catch (error) {
            console.log(error);
            setMessage('Error. Are the email & password ok?');
        }
    }



    //LOG IN WITH GOOGLE
    const googleLogin = () => {
        //use firebase sign-in-with-google method:
        auth.signInWithPopup(googleAuthProvider)
            .then(async result => {
                const { user } = result;
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
                            setMessage('Signed in. Redirecting...');
                            setTimeout(() => {router.push('/');}, 2000);
                        }

                        if (data.role === 'admin') {
                            dispatch({
                                type: 'LOGGED_IN_USER',
                                payload: {email: user.email, token: idTokenResult.token, isAdmin: true}
                            });

                            setSubmitShown(false);
                            setMessage('Signed in. Redirecting...');
                            setTimeout(() => {router.push('/admin');}, 2000);
                        }
                    });

                //error handling?
            });
    }



    //RENDER
    return (
        <div className='signin-form-container'>
            <p className='pre-heading'>Have an account?</p>
            
            <Heading>
                Sign <span>in</span>
            </Heading>

            <form>
                <div className='form-group'>
                    <input 
                        type='text' 
                        value={email}
                        name='email'
                        onChange={handleChange}
                        required
                    />
                    <label>
                        {Array.from('Your email:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                    </label>
                </div>

                <div className='form-group'>
                    <input 
                        type='password' 
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                    <label>
                        {Array.from('Your password:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                    </label>
                </div>

                {message && <p className='message'>{message}</p>}

                {
                    submitShown
                    &&
                    <div className='form-group buttons'>
                        <ButtonSquare text='Sign in' action={handleSubmit} />
                        <ButtonSquare text='Log in w. Google' action={googleLogin} />
                        <ButtonSquare text='Forgot Password?' action={() => {router.push('/forgotpassword')}} />
                    </div>
                }
            </form>
        </div>
    )
}