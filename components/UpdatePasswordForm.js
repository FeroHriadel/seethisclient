import React, { useState } from 'react';
import { auth }  from '../firebase/firebase';
import Heading from './Heading';
import ButtonSquare from './ButtonSquare';
import router from 'next/router';



export default function UpdatePasswordForm() {
    //VALUES
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [submitShown, setSubmitShown] = useState(true);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setPassword(e.target.value);
    }



    //SUBMIT HANDLER
    const handleSubmit = async e => {
        e.preventDefault();

        auth.currentUser.updatePassword(password)
            .then(() => {
                setMessage('Password updated. Redirecting...');
                setSubmitShown(false);
                setTimeout(() => {
                    router.push('/')
                }, 2000);
            })
            .catch(error => {
                setMessage(`Error: ${JSON.stringify(error)}`)
            });
    }



    //RENDER
    return (
        <div className='update-password-form-container'>          
            <Heading>
                <span>Update </span> password
            </Heading>

            <form>
                <div className='form-group'>
                    <input 
                        type='password' 
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                    <label>
                        {Array.from('Your new password:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                    </label>
                </div>

                {message && <p className='message'>{message}</p>}

                {
                    submitShown
                    &&
                    <div className='form-group buttons'>
                        <ButtonSquare text='Update Password' action={handleSubmit} />
                    </div>
                }
            </form>
        </div>
    )
}
