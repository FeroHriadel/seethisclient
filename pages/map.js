import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from '../components/Menu';
import ButtonSquare from '../components/ButtonSquare';
import Heading from '../components/Heading';
import { getCategories } from '../actions/categoryActions';
import { getSpotsByCategory } from '../actions/spotActions';
import dynamic from "next/dynamic"; 




export default function Map() {
    //IMPORT MAP W/O SSR => SO IT HAS ACCESS TO WINDOW !!!
    const MapWithNoSSR = dynamic(() => import("../components/Map"), {
        ssr: false
    });



    //ROUTER
    const router = useRouter();



    //VALUES
    const [message, setMessage] = useState('Loading...');
    const [categories, setCategories] = useState([]);
    const [spots, setSpots] = useState([]);



    //FETCH CATEGORIES
    useEffect(() => {
        getCategories()
            .then(data => {
                if (!data || data.error) {
                return setMessage(`Error: ${data && data.error ? data.error : 'Categories could not be fetched'}`);
                }

                setCategories(data);
                setMessage('');
            });
    }, []);



    //GET SPOTS BY CATEGORY
    const getSpots = categoryId => {
        setMessage('Getting Spots...');

        getSpotsByCategory(categoryId)
            .then(data => {
                if (!data || data.error) {
                    return setMessage(`Error: ${data && data.error ? data.error : 'Getting spots failed'}`)
                }

                setSpots(data);
                setMessage('');
            })
    }

    useEffect(() => {
        if (spots && spots.length < 1) {
            setMessage('No spots')
        }
    }, [spots])



    //RENDER
    return (
        <div className='map-page'>
            <Bricks />
            <Switch />

            <div className='container'>
                <p className='pre-title'>See it on the map</p>
                
                <Heading>
                    Spot <span> Map</span>
                </Heading>

                {
                    message && <p className='message'>{message}</p>
                }

                <div className='buttons-and-map-box'>
                    <section className='categories-section'>
                        <ButtonSquare text='Go Home' action={() => router.push('/')} />
                        {
                            categories && categories.length > 0
                            &&
                            categories.map(category => (
                                <ButtonSquare key={category._id} text={category.name} action={() => getSpots(category._id)} />
                            ))
                        }
                    </section>

                    {message && <p className='message bottom-message'>{message}</p>}

                    <section className='map-section'>
                       <MapWithNoSSR spots={spots} />
                    </section>
                </div>
            </div>
        </div>
    )
}
