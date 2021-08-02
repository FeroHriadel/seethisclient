import React, { useState, useContext } from "react";
import ButtonSquare from "./ButtonSquare";
import { Context } from '../context';
import { useRouter } from "next/router";
import { createTag } from '../actions/tagActions';



export default function TagCreateForm() {
    //ROUTER
    const router = useRouter();



    //CONTEXT
    const { state, dispatch } = useContext(Context);
    


    //VALUES
    const [values, setValues] = useState({name: '', description: ''});
    const { name, description } = values;
    const [message, setMessage] = useState('');
    const [submitShown, setSubmitShown] = useState(true);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setValues({...values, [e.target.name]: e.target.value});
    }



    //SUBMIT HANDLER
    const handleSubmit = e => {
        e.preventDefault();

        if (!name) {
            return setMessage('Name is required');
        }

        setMessage('Loading...');

        createTag(state.user.token, values)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setMessage('Tag created. Redirecting to Tag List...');
                setSubmitShown(false);

                setTimeout(() => {router.push('/admin/tags')}, 2000);
            })
    }



    //RENDER
    return (
        <form onSubmit={handleSubmit} className='tag-create-form'>
            <div className='form-group'>
                <input 
                    type='text' 
                    value={name}
                    name='name'
                    onChange={handleChange}
                    required
                    maxLength='10'
                />
                <label>
                    {Array.from('Tag Name:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                </label>
            </div>

            <div className='form-group'>
                <label className='textarea-label'>
                    {Array.from('Tag Description:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                </label>
                <textarea 
                    value={description}
                    name='description'
                    onChange={handleChange}
                    required
                    maxLength='250'
                />
            </div>

            {
                message
                &&
                <p className='message'>{message}</p>
            }

            {
                submitShown
                &&
                <div className='form-group'>
                    <ButtonSquare text='Create Tag' action={handleSubmit} />
                </div>
            }
        </form>
    )
}
