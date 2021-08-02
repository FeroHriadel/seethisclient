import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import Bricks from '../../components/Bricks';
import Switch from '../../components/Switch';
import Menu from '../../components/Menu';
import Heading from '../../components/Heading';
import ButtonSquare from '../../components/ButtonSquare';
import ProtectAdminRoute from '../../components/ProtectAdminRoute';
import { getSpots, deleteSpot } from '../../actions/spotActions';
import { FaTrash, FaPenFancy } from "react-icons/fa";
import router from 'next/router';



export default function Spots() {
    //CONTEXT
    const { state, dispatch } = useContext(Context);



    //GET INITIAL SPOTS
    const [data, setData] = useState({});
    const [message, setMessage] = useState('Loading spots...')

    useEffect(() => {
        getSpots()
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : 'Spots could not be loaded'}`)
                }

                setData(data);
                setMessage('');
            })

    }, []);



    //SEARCHBAR VALUES
    const [values, setValues] = useState({
        searchword: '',
        postedBy: '',
        sortBy: '',
        order: 'desc'
    });

    const { searchword, postedBy, sortBy, order } = values;

    


    //CHANGE HANDLER
    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value});
    }



    //SUBMIT HANDLER
    const handleSubmit = () => {
        getSpots(1, searchword, '', '', postedBy, sortBy, order)
            .then(data => {
                if (!data || data.error) {
                    setMessage(`${data && data.error ? data.error : 'No spots matching your criteria found'}`);
                    setData([]);
                }

                setData(data);
            })
    }



    //INFINITE SCROLL
    const loadMore = e => {
        console.log('ran') //////////

        const totalHeight = e.target.scrollHeight;
        const scrolledFromTop = e.target.scrollTop;
        const viewHeight = e.target.clientHeight;

        if (
            scrolledFromTop + viewHeight >= totalHeight * 0.9
            &&
            data.page <= data.numberOfPages
        ) {
            getSpots(data.page + 1, searchword, '', '', postedBy, sortBy, order) //args = (pageNumber, searchword, category, tag, postedBy, sortBy, order)
                .then(responseData => {
                    if (!responseData || responseData.error) {
                        return console.log(`Couldn't load more spots: ${responseData && responseData.error ? responseData.error : ''}`)
                    }

                    setData({...data, page: data.page + 1, numberOfPages: data.numberOfPages, spots: [...data.spots, ...responseData.spots]});
                })
        }
    }



    //DELETE SPOT
    const removeSpot = spotId => {
        deleteSpot(state.user.token, spotId)
            .then(responseData => {
                if (!responseData || responseData.error) {
                    setMessage(`Error: ${responseData && responseData.error ? responseData.error : 'Spot could not be deleted'}`)
                    setTimeout(() => setMessage(''), 3000);
                    return;
                }

                let spotsBefore = data.spots;
                let remainingSpots = spotsBefore.filter(spot => spot._id !== spotId);
                setData({...data, spots: [...remainingSpots]});
                setMessage('Spot deleted');
                setTimeout(() => setMessage(''), 3000);
            })
    }
 


    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='admin-spot-list-page' onScroll={loadMore}>
                <Menu />
                <Bricks />
                <Switch />

                <div className='container'>
                    <Heading>
                        <span>Edit </span> Spots
                    </Heading>

                    {
                        message && <p className='message'>{message}</p>
                    }


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



                    <div className='spot-list'>
                        {
                            data && data.spots
                            &&
                            data.spots.map(spot => (
                                <div className='line' key={spot._id}>
                                    <h3 
                                        className='spot-title' 
                                        onClick={() => router.push(`/spots/${spot.slug}`)}
                                        title='Go to spot details'
                                    >
                                        {spot.title}
                                    </h3>
                                    <p className='posted-by'>{spot.postedBy}</p>
                                    <div className='buttons'>
                                        <p
                                             title='Delete spot'
                                             onClick={() => removeSpot(spot._id)}
                                        >
                                            <FaTrash />
                                        </p>
                                        <p 
                                            title='Edit spot'
                                            onClick={() => {router.push(`/spots/editspot/${spot.slug}`)}}
                                        >
                                            <FaPenFancy />
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </ProtectAdminRoute>
    )
}
