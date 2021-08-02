import React, { useState } from 'react';
import { auth }  from '../firebase/firebase';
import Heading from '../components/Heading';
import ButtonSquare from './ButtonSquare';



export default function SignupForm() {
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

        if (password.length < 6) {
            return setMessage('Please enter a password at least 6 characters long')
        }
        
        const config = {
            url: process.env.NEXT_PUBLIC_DEVELOPMENT_CONFIRMATION_EMAIL_REDIRECT,
            handleCodeInApp: true
        }

        const success = await auth.sendSignInLinkToEmail(email, config);
        //can't figure out error handling here. If something goes wrong with firebase, user is screwed...
        setMessage('Please check your email to complete registration');
        setSubmitShown(false);
        localStorage.setItem('emailForRegistration', email);
        localStorage.setItem('passwordForRegistration', password);
    }



    //RENDER
    return (
        <div className='signup-form-container'>
            <p>Don't have an account?</p>
            
            <Heading>
                Sign <span>up</span>
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
                        {Array.from('Create your password:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                    </label>
                </div>

                {message && <p className='message'>{message}</p>}

                {
                    submitShown
                    &&
                    <div className='form-group'>
                        <ButtonSquare text='Sign up' action={handleSubmit} />
                    </div>
                }
            </form>
        </div>
    )
}
