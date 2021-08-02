import React, { useState, useEffect } from 'react';
import { getCategories } from '../../actions/categoryActions';
import { getTags } from '../../actions/tagActions';
import { getSpots } from '../../actions/spotActions';
import Bricks from '../../components/Bricks';
import Switch from '../../components/Switch';
import Menu from '../../components/Menu';
import Heading from '../../components/Heading';
import ButtonSquare from '../../components/ButtonSquare';
import SpotPreview from '../../components/SpotPreview';
import { FaChevronUp } from 'react-icons/fa'



export default function Searchspots() {
    //VALUES
    const [message, setMessage] = useState('Loading...');
    const [values, setValues] = useState({
        searchword: '',
        category: '',
        tag: '',
        postedBy: '',
        sortBy: '',
        order: 'desc'
    });

    const { searchword, category, tag, postedBy, sortBy, order } = values;

    const [data, setData] = useState(null);



    //CHANGE HANDLER
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }



    //CATEGORIES
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories()
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error. Categories didn't load`);
                }

                setCategories(data);
                setMessage('');
            });
    }, []);



    //TAGS
    const [tags, setTags] = useState(null);

    useEffect(() => {
        getTags()
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: Tags didn't load`);
                }

                setTags(data);
                setMessage('');
            })
    }, []);



    //SUBMIT HANDLER
    const handleSubmit = () => {
        setMessage('');

        getSpots(1, searchword, category, tag, postedBy, sortBy, order)
            .then(data => {
                if (!data || data.error) {
                    setMessage(`${data && data.error ? data.error : 'No spots matching your criteria found'}`);
                    setData([]);
                }

                setData(data);

                const pageEl = document.querySelector('.search-spots-page');
                pageEl.scrollTop = 500;

            })
    }



    //INFINITE SCROLL
    const loadMore = e => {
        const totalHeight = e.target.scrollHeight;
        const scrolledFromTop = e.target.scrollTop;
        const viewHeight = e.target.clientHeight;

        if (
            scrolledFromTop + viewHeight >= totalHeight * 0.9
            &&
            data.page <= data.numberOfPages
        ) {
            getSpots(data.page + 1, searchword, category, tag, postedBy, sortBy, order) //args = (pageNumber, searchword, category, tag, postedBy, sortBy, order)
                .then(responseData => {
                    if (!responseData || responseData.error) {
                        return console.log(`Couldn't load more spots: ${responseData && responseData.error ? responseData.error : ''}`)
                    }

                    setData({...data, page: data.page + 1, numberOfPages: data.numberOfPages, spots: [...data.spots, ...responseData.spots]});
                })
        }
    }



    //ONCLICK SCROLLUP
    const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);

    useEffect(() => {
        const pageEl = document.querySelector('.search-spots-page');

        const listenForScroll = () => {
            if (pageEl.scrollTop > 400) {
                setShowScrollUpBtn(true);
            } else {
                setShowScrollUpBtn(false);
            }
        }

        pageEl.addEventListener('scroll', listenForScroll);

        return () => pageEl.removeEventListener('scroll', listenForScroll);

    }, [])

    const scrollUp = () => {
        const pageEl = document.querySelector('.search-spots-page');
        pageEl.scrollTop = 0; 
    }



    //RENDER
    return (
        <div className='search-spots-page' onScroll={loadMore}>
            <Switch />
            <Menu />
            <Bricks />

            {showScrollUpBtn && <div className='go-up-btn' title='Up to Searchbar' style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                borderRadius: '50%',
                width: '25px',
                height: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'var(--black-color)',
                cursor: 'pointer',
                zIndex: '22'
            }} onClick={scrollUp}>
                <p style={{color: 'var(--white-color)'}}> <FaChevronUp /> </p>
            </div>}

            <div className='container'>
                <Heading>
                    <span>Search </span> Spots
                </Heading>

                <form className='searchbar'>
                    <div className='grid'>
                        <div className='form-group'>
                            <label>Searchword:</label>
                            <input
                                type='text'
                                value={searchword}
                                name='searchword'
                                onChange={handleChange}
                            />
                        </div>

                        {
                            categories
                            &&
                            <div className='form-group'>
                                <label>Category:</label>
                                <select name='category' onChange={handleChange}>
                                    <option value=''>Any</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }

                        {
                            tags
                            &&
                            <div className='form-group'>
                                <label>Tag:</label>
                                <select name='tag' onChange={handleChange}>
                                    <option value=''>Any</option>
                                    {tags.map(tag => (
                                        <option key={tag._id} value={tag._id}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }

                        <div className='form-group'>
                            <label>Posted by:</label>
                            <input
                                type='text'
                                value={postedBy}
                                name='postedBy'
                                onChange={handleChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label>Order By:</label>
                            <select name='orderBy' onChange={handleChange}>
                                <option value='title'>Title</option>
                                <option value='postedBy'>Author</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <label>Order:</label>
                            <select name='order' onChange={handleChange}>
                                <option value='desc'>latest to oldest</option>
                                <option value='asc'>oldest to latest</option>
                            </select>
                        </div>
                    </div>

                    <ButtonSquare text='Search' action={handleSubmit} />
                </form>

                {message && <p className='message'>{message}</p>}

                <div className='results'>
                    {
                        data && data.spots
                        &&
                        <React.Fragment>
                            <h2>Results:</h2>
                            {data.spots.map(s => (
                                <SpotPreview key={s._id} spot={s} />
                            ))}
                        </React.Fragment>
                    }
                </div>
            </div>
            
        </div>
    )
}
