import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Heading from '../components/Heading';
import ButtonSquare from '../components/ButtonSquare';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from "../components/Menu";



export default function Explore() {
    //ROUTER
    const router = useRouter();


    //RENDER
    return (
        <div className='explore-page'>
            <Bricks />
            <Switch />
            <Menu />

            <article className='main-box'>
                <Heading>
                    <span>Explore </span> Spots
                </Heading>
                <p>
                    We have a collection of the most beautiful spots in Slovkia. Whether you are a tourist, hiker, or just looking for an interesting place to see - we have it for you. Go to 'All Spots' to browse them all, or click 'Search Spots' to find a spot that matches your criteria.
                </p>
                <div className='button-box'>
                        <ButtonSquare text='All Spots' action={() => router.push('/spots/allspots') } />
                        <ButtonSquare text='Search Spots' action={() => router.push('/spots/searchspots')} />
                </div>
            </article>
        </div>
    )
}
