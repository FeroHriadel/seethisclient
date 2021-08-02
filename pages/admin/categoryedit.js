import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { Context } from '../../context';
import { getCategoryById, editCategory, deleteCategory } from "../../actions/categoryActions";
import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import ButtonSquare from '../../components/ButtonSquare';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';



export default function Categoryedit() {
    //GET CATEGORYID FROM URL
    const router = useRouter();
    const categoryId = router.query.categoryId;
    


    // VALUES
    const { state, dispatch } = useContext(Context);
    const [message, setMessage] = useState('Getting category...');
    const [category, setCategory] = useState({});
    const { name, description } = category;
    const [submitShown, setSubmitShown] = useState(true);



    //GET CATEGORY
    useEffect(() => {
        getCategoryById(categoryId)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setCategory(data);
                setMessage('');
            })
    }, [categoryId]);



    //CHANGE HANDLER
    const handleChange = e => {
        setMessage('');
        setCategory({...category, [e.target.name]: e.target.value});
    }



    //SUBMIT HANDLER (UPDATE CATEGORY)
    const handleSubmit = e => {
        e.preventDefault();

        if (!name) {
            return setMessage('Category name is required');
        }

        setMessage('Updating category...');

        editCategory(state.user.token, categoryId, {name, description})
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`)
                }

                setMessage('Category updated');
            })
    }



    //DELETE CATEGORY
    const removeCategory = () => {
        setMessage('Deleting category...');
        deleteCategory(state.user.token, categoryId)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setMessage('Category deleted');
                setSubmitShown(false);
                setCategory({name: '', description: ''});
            })
    }



    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='category-edit-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span> Edit Category</span>
                    </Heading>

                    <div className='go-back-btn' style={{marginTop: '2rem'}}>
                        <ButtonSquare text='Go back' action={() => router.push('/admin/categories')} />
                    </div>

                    <form onSubmit={handleSubmit} className='category-edit-form'>
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
                                {Array.from('Category Name:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
                            </label>
                        </div>

                        <div className='form-group'>
                            <label className='textarea-label'>
                                {Array.from('Category Description:').map((letter, index) => <span key={index} style={{transitionDelay: `${index * 25}ms` }}>{letter}</span>)}
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
                            <ButtonSquare text='Delete' action={removeCategory} />
                        </div>
                    }
                </div>
                
            </div>
        </ProtectAdminRoute>
    )
}
