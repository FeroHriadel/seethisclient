import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { Context } from '../../context';
import { getTagById, editTag, deleteTag } from "../../actions/tagActions";
import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import ButtonSquare from '../../components/ButtonSquare';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';



export default function Tagedit() {
    //GET TAGID FROM URL
    const router = useRouter();
    const tagId = router.query.tagId;
    console.log(tagId);
    


    // VALUES
    const { state, dispatch } = useContext(Context);
    const [message, setMessage] = useState('Getting tag...');
    const [tag, setTag] = useState({});
    const { name, description } = tag;
    const [submitShown, setSubmitShown] = useState(true);



    //GET TAG
    useEffect(() => {
        getTagById(tagId)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setTag(data);
                setMessage('');
            })
    }, [tagId]);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setTag({...tag, [e.target.name]: e.target.value});
    }



    //SUBMIT HANDLER (UPDATE TAG)
    const handleSubmit = e => {
        e.preventDefault();

        console.log({name, description}) ///////////////

        if (!name) {
            return setMessage('Tag name is required');
        }

        setMessage('Updating tag...');

        editTag(state.user.token, tagId, {name, description})
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`)
                }

                setMessage('Tag updated');
            })
    }



    //DELETE TAG
    const removeTag = () => {
        setMessage('Deleting tag & removing tags from Spots...');
        deleteTag(state.user.token, tagId)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setMessage('Tag deleted');
                setSubmitShown(false);
                setTag({name: '', description: ''});
            })
    }



    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='tag-edit-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span> Edit Tag</span>
                    </Heading>

                    <div className='go-back-btn' style={{marginTop: '2rem'}}>
                        <ButtonSquare text='Go back' action={() => router.push('/admin/tags')} />
                    </div>

                    <form onSubmit={handleSubmit} className='tag-edit-form'>
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
                    </form>

                    {
                        submitShown
                        &&
                        <div className='buttons'>
                            <ButtonSquare text='Edit' action={handleSubmit} />
                            <ButtonSquare text='Delete' action={removeTag} />
                        </div>
                    }
                </div>
                
            </div>
        </ProtectAdminRoute>
    )
}
