import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { FORGOT_PASSWORD_REDIRECT } from '../config';
import Heading from '../components/Heading';
import ButtonSquare from './ButtonSquare';



export default function ForgotPasswordForm() {
    //VALUES
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [submitShown, setSubmitShown] = useState(true);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setEmail(e.target.value)
    }



    //SUBMIT HANDLER
    const handleSubmit = async e => {
        e.preventDefault();

        const config = {
            url: FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setMessage('Please check your email to complete the password reset');
                setSubmitShown(false);
            }).catch(error => {
                setMessage(`Error: ${JSON.stringify(error)}`);
            });
    }


    
    //RENDER
    return (
        <div className='forgot-password-form-container'>
            <Heading>
                <span>Forgot </span> password?
            </Heading>

            <p>Don't worry. Reset it here.</p>

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

                {message && <p className='message'>{message}</p>}

                {
                    submitShown
                    &&
                    <div className='form-group'>
                        <ButtonSquare text='Reset Password' action={handleSubmit} />
                    </div>
                }
            </form>
        </div>
    )
}
