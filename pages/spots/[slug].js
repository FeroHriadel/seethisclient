import React from 'react';
import { API } from '../../config';
import { getSpotBySlug } from '../../actions/spotActions';
import { useRouter } from 'next/router';
import Switch from '../../components/Switch';
import Bricks from '../../components/Bricks';
import Menu from '../../components/Menu';
import ButtonSquare from '../../components/ButtonSquare';
import BlackCircle from '../../components/BlackCircle';
import RedCircle from '../../components/RedCircle';
import renderHTML from 'react-render-html';
import { Map, ZoomControl, MouseControl, MarkerLayer, Marker } from 'react-mapycz';
import Head from 'next/head';
import { APP_NAME, DOMAIN } from '../../config';



export default function Spotdetails({ spot }) {
    //ROUTER
    const router = useRouter();



    //RENDER
    return (
        <div className='spot-details-page'>
            <Switch />
            <Menu />
            <Bricks />

            <Head>
                <title>{spot.title} | {APP_NAME}</title>
                <meta name='description' content={spot.excerpt.substring(0, 160)} />
                <link rel='canonical' href={`${DOMAIN}/spots/${spot.slug}`} />

                <meta property='og:title' content={`${spot.title} | ${spot.excerpt.substring(0, 160)}`} />
                <meta type='og:description' content={`${spot.excerpt.substring(0, 160)}`} />
                <meta property='og:type' content='website' />
                <meta property='og:url' content={`${DOMAIN}/${router.pathname}`} />
                <meta property='og:site_name' content={APP_NAME} />
                <meta property='og:image' content={`${API}/getspotimage/${spot.slug}`} />
                <meta property='og:image:type' content='image/jpg' />
            </Head>

            {
                !spot
                ?
                <p style={{fontFamily: 'IndieFlower', fontSize: '2rem', marginTop: '6rem', marginLeft: '2rem', color: 'var(--black-color-light)'}}>Sorry, something went wrong</p>
                :
                spot.error
                ?
                <p style={{fontFamily: 'IndieFlower', fontSize: '2rem', marginTop: '6rem', marginLeft: '2rem', color: 'var(--black-color-light)'}}>{spot.error}</p>
                :
                <React.Fragment>
                    <section 
                        className='showcase' 
                        style={{background: `url(${API}/getspotimage/${spot.slug}) no-repeat center center/cover`, backgroundColor: 'var(--black-color)'}}
                    >
                        <h1>{spot.title}</h1>
                        <ButtonSquare text='All Spots' action={() => {router.push('/spots/allspots')}} />
                    </section>

                    <section className='icons'>
                        {
                            spot.tags.map(tag => (
                                <BlackCircle key={tag._id}>
                                    <h3>{tag.name}</h3>
                                </BlackCircle>
                            ))
                        }
                        <RedCircle>
                            <h3>{spot.category.name}</h3>
                        </RedCircle>
                    </section>

                    <section className='text'>
                        {renderHTML(spot.body)}
                    </section>

                    <section className='map-section'>
                        <div className="map-container">
                            <Map height="100%" center={{lat: spot.lat, lng: spot.long}} zoom={10}>
                                <ZoomControl />
                                <MouseControl zoom={true} pan={true} wheel={true} />
                                <MarkerLayer>
                                    <Marker coords={{lat: spot.lat, lng: spot.long}} />
                                </MarkerLayer>
                            </Map>
                        </div>
                    </section>

                    <section className='comments-section'>
                    </section>
                </React.Fragment>
            }
        </div>
    )
}



export async function getServerSideProps({ query: { slug } }) {
    const spot = await getSpotBySlug(slug);
    return {props: {spot}}
}