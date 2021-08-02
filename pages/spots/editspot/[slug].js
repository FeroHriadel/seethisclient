import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../../context/index';
import { getCategories } from '../../../actions/categoryActions';
import { getTags } from '../../../actions/tagActions';
import { getSpotBySlug, updateSpot } from '../../../actions/spotActions';
import { getUser } from '../../../actions/userActions';
import ProtectRoute from '../../../components/ProtectRoute';
import Heading from '../../../components/Heading';
import Bricks from '../../../components/Bricks';
import Switch from '../../../components/Switch';
import Menu from '../../../components/Menu';
import BlackCircle from '../../../components/BlackCircle';
import RedCircle from '../../../components/RedCircle';
import ButtonSquare from '../../../components/ButtonSquare';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});





export default function editspot({ slug }) {
    //CONTEXT
    const { state, dispatch } = useContext(Context);
        // const authtoken = state.user.token



    //ROUTER
    const router = useRouter();



    //INIT FORMDATA
    const [values, setValues] = useState({formData: {}});
    const { formData } = values;
    const [canStartFetching, setCanStartFetching] = useState(false); //FormData must be initialize first, only then can we getSpotBySlug() That's because getSpotBySlug sets formData and if you initialize formData within the same useEffect then the formData.set runs before nextjs realizes that formData had already been initialized and crashes. How I love nextjs sometimes... it keeps me fit => jumping thru the hoops :)))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setValues({formData: new FormData()});
            setCanStartFetching(true);
        }
    }, []);



    //GET ALL CATEGORIES & TAGS
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [message, setMessage] = useState('Loading...');

    const fetchCategories = () => {
        getCategories()
            .then(data => {
                if (!data || data.error) {
                    setMessage('Sorry, something went wrong with categories :(');
                    return
                }

                setCategories(data);
                setMessage('');
            });
    }

    const fetchTags = () => {
        getTags()
            .then(data => {
                if (!data || data.error) {
                    setMessage('Sorry, something went wrong with tags :(');
                    return
                }

                setTags(data);
                setMessage('');
            });
    }

    useEffect(() => {
        fetchCategories();
        fetchTags();
    }, []);



    //STORE CLICKED CATEGORY
    const [selectedCategory, setSelectedCategory] = useState({_id: '', name: ''});

    const chooseCategory = (clickedCategory) => {
        if (selectedCategory._id === clickedCategory._id) {
            setSelectedCategory({_id: '', name: ''});
        } else {
            setSelectedCategory(clickedCategory);
            formData.set('category', clickedCategory._id);
        }
    }



    //STORE CLICKED TAGS
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagNames, setTagNames] = useState([]);

    const chooseTag = (tag) => {
        setMessage('');

        let existingTags = selectedTags;
        let tagIndex = existingTags.indexOf(tag._id);
        if (tagIndex === -1) existingTags.push(tag._id);
        if (tagIndex !== -1) existingTags.splice(tagIndex, 1);
        setSelectedTags([...existingTags]);
        formData.set('tags', [...existingTags]);

        let existingNames = tagNames;
        let nameIndex = existingNames.indexOf(tag.name);
        if (nameIndex === -1) existingNames.push(tag.name);
        if (nameIndex !== -1) existingNames.splice(nameIndex, 1);
        setTagNames([...existingNames]);
    }



    //STORE TITLE
    const [spotTitle, setSpotTitle] = useState({title: ''});
    const { title } = spotTitle;

    const titleChangeHandler = e => {
        setMessage('');
        setSpotTitle({title: e.target.value});
        formData.set('title', e.target.value)
    }



    //STORE GPS COORDS
    const [spotLat, setSpotLat] = useState({lat: ''});
    const [spotLong, setSpotLong] = useState({long: ''});
    const { lat } = spotLat;
    const { long } = spotLong;

    const latChangeHandler= e => {
        setMessage('');
        setSpotLat({lat: e.target.value});
        formData.set('lat', e.target.value);
    }

    const longChangeHandler= e => {
        setMessage('');
        setSpotLong({long: e.target.value});
        formData.set('long', e.target.value);
    }



    //STORE IMAGE
    const [isImage, setIsImage] = useState(false);

    const imageChangeHandler = e => {
        setMessage('');
        const value = e.target.files[0];
        setIsImage(true);
        formData.set('image', value);
    }



    //STORE REACT QUILL
    const [body, setBody] = useState({});

    const handleReactQuill = e => {
        setMessage('');
        setBody(e);
        formData.set('body', e);
    }



    //GET EDITED SPOT
    const [spotId, setSpotId] = useState({_id: ''}); //also store spot._id so backend can use getById();
    const [runAuthCheck, setRunAuthCheck] = useState(false);
    const [postedBy, setPostedBy] = useState(null); //this is for runAuthCheck to compare logged-in user with spot.postedBy

    useEffect(() => {

            if (canStartFetching) {
                //fetch edited spot
                getSpotBySlug(slug)
                    .then(data => {
                        if (!data || data.error) {
                            return setMessage(`Error: ${data && data.error ? data.error : 'Slug could not be fetched'}`)
                        }

                        //populate form values
                        setSelectedCategory({_id: data.category._id, name: data.category.name});
                        formData.set('category', data.category._id)
                        
                        const tagIDs = data.tags.map(tag => tag._id);
                        setSelectedTags([...tagIDs]);
                        formData.set('tags', [...tagIDs]);
                        const tagNames = data.tags.map(tag => tag.name);
                        setTagNames([...tagNames]);

                        setSpotTitle({ title: data.title});
                        formData.set('title', data.title);

                        setSpotLat({lat: data.lat});
                        formData.set('lat', data.lat);
                        setSpotLong({long: data.long});
                        formData.set('long', data.long);

                        setIsImage(true);

                        setBody(data.body);
                        formData.set('body', data.body);

                        setSpotId({_id: data._id})
                        formData.set('spotId', data._id);

                        setMessage('');

                        //runAuthCheck (is logged-in user also the author or admin?)
                        setPostedBy(data.postedBy);
                        setRunAuthCheck(true);
                    })
        }
    }, [canStartFetching]);



    //REDIRECT NON-ADMINS / NON-AUTHORS AWAY
    useEffect(() => {
        if (runAuthCheck) {
            if (!state || !state.user || !state.user.token) {
                console.log('No token in Context, redirecting');
                router.push('/');
            }

            getUser(state.user.token)
                .then(data => {
                    if (!data || data.error) {
                        console.log(`Error: ${data && data.error ? data.error : 'getUser failed'}`);
                        router.push('/');
                        return
                    }

                    if (data.role === 'admin') {
                        console.log('Admin, access granted');
                        return
                    }

                    if (state.user.email === postedBy) {
                        console.log(`Post author - access granted`)
                    } else {
                        console.log(`Not author. Access denied`);
                        router.push('/')
                    }
                })
        }
    }, [runAuthCheck]);



    //SUBMT HANDLER
    const submitSpot = () => {

        if (!selectedCategory) return setMessage('Category is required');
        if (!title) return setMessage('Title is required');
        if (!lat) return setMessage('Latitude is required');
        if (!long) return setMessage('Longitude is required');
        if (Number(lat) > 49.3574 || Number(lat) < 47.64725) return setMessage('Latitude is outside Slovakia (47.64725 - 49.3574)');
        if (Number(long) < 16.60943 || Number(long) > 22.76178) return setMessage('Longitude is outside Slovakia (16.60943 - 22.76178)');

        updateSpot(state.user.token, formData)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                }

                setMessage('Spot updated');
            })
    }
    


    //RENDER
    return (
        <ProtectRoute>
            <div className='edit-spot-page'>
                <Bricks />
                <Menu />
                <Switch />

                <div className='container'>
                    <p>Need to change something?</p>

                    <Heading>
                        <span>Edit </span> Spot
                    </Heading>

                    {
                        message
                        &&
                        <p>{message}</p>
                    }

                    <section className='categories-box'>
                        <h3 className='instructions'>
                            Please choose a category: 
                            {' '} 
                            {selectedCategory && <span style={{color: 'var(--red-color)'}}>{selectedCategory.name}</span> } 
                        </h3>
                        {
                            categories && categories.length < 1
                            ?
                            <p>There don't seem to be any categories created yet</p>
                            :
                            categories.map(c => (
                                <RedCircle key={c._id}>
                                    <h3 onClick={() => {chooseCategory(c)}}>{c.name}</h3>
                                </RedCircle>
                            ))
                        }
                    </section>

                    <section className='tags-box'>
                        <h3 className='instructions'>
                            Please choose tags:
                            {' '}
                            {tagNames && tagNames.map(tagName => (
                                <span key={Math.random()} style={{color: 'var(--red-color)', marginRight: '0.5rem'}}>
                                    {tagName}
                                </span>
                            ))}
                        </h3>

                        {
                            tags && tags.length < 1
                            ?
                            <p>There don't seem to be any tags created yet</p>
                            :
                            tags.map(tag => (
                                <BlackCircle key={tag._id}>
                                    <h3 onClick={() => {chooseTag(tag)}}>{tag.name}</h3>
                                </BlackCircle>
                            ))

                        }
                    </section>

                    <section className='title-box'>
                        <h3 className='instructions'>
                            Please enter the title:
                            {' '}
                            {title && <span style={{color: 'var(--red-color)'}}>{title}</span>}
                        </h3>

                        <div className='input-group'>
                            <label>Title: </label>
                            <input
                                type='text'
                                name='title'
                                value={title}
                                onChange={titleChangeHandler}
                            />
                        </div>                        
                    </section>

                    <section className='gps-box'>
                        <h3 className='instructions'>
                            Please enter GPS coordinates:
                            {' '}
                            {lat && lat !== '' && <span style={{color: 'var(--red-color)', marginRight: '0.5rem'}}>lat: {lat}</span>}
                            {long && long !== '' && <span style={{color: 'var(--red-color)'}}>long: {long}</span>}
                        </h3>
                        <small style={{fontFamily: 'IndieFlower', color: 'var(--black-color-light)'}}>E.g.: lat = 48.123456, long = 18.987654</small>
                        <div className='input-group'>
                            <label>Latitude: </label>
                            <input
                                type='number'
                                name='lat'
                                value={lat}
                                onChange={latChangeHandler}
                            />
                        </div>
                        <div className='input-group'>
                            <label>Longitude: </label>
                            <input
                                type='number'
                                name='long'
                                value={long}
                                onChange={longChangeHandler}
                            />
                        </div>
                    </section>

                    <section className='image-upload-box'>
                        <h3 className='instructions'>
                            Please upload the main image:
                            {' '}
                            {isImage && <span style={{color: 'var(--red-color)'}}>Image uploaded</span>}    
                        </h3>
                        <label htmlFor='image'>
                            <input 
                                type='file'
                                accept='img/*'
                                onChange={imageChangeHandler}
                                name='image'
                                id='image'
                                hidden
                            />
                            Upload Image
                        </label>
                    </section>

                    <section className='react-quill-box'>
                        <h3 className='instructions'>Please write something about your spot: </h3>
                        <p className='info'>You can add images inside your article by clicking the editor's image icon</p>
                        <ReactQuill 
                            placeholder='Add text here...'
                            modules={editspot.modules} //see settings below
                            formats={editspot.formats} //see settings below
                            value={body} //markup is stored in ‘body’state (and formData)
                            onChange={handleReactQuill}
                            style={{marginBottom: '4rem'}}
                        />
                    </section>

                    <section className='submit-box'>
                        {message && <p>{message}</p>}
                        <ButtonSquare text='Submit' action={submitSpot} />
                    </section>
                </div>
            </div>
        </ProtectRoute>
    )
}



editspot.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
editspot.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];



export async function getServerSideProps({ query }) {
    console.log(query)
    return {props: {slug: query.slug}}
}