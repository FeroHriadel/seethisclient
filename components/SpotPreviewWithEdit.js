/*
    styled by _SpotPreview.scss
    and @media query adjusted in _profile.scss
*/


import { API } from '../config';
import { useRouter } from 'next/router';
import BlackCircle from './BlackCircle';
import RedCircle from './RedCircle';
import ButtonSquare from './ButtonSquare';



export default function SpotPreviewWithEdit({ spot }) {
    //ROUTER
    const router = useRouter();



    //RENDER
    return (
        <div className='spot-preview-container'>
            
            <div className='image-box' style={{background: `url(${API}/getspotimage/${spot.slug}) no-repeat center center/cover`, width: '260px', height: '260px', borderRadius: '50%', minWidth: '260px'}} />
            
            <div className='text-box'>
                
                <h2 onClick={() => router.push(`/spots/${spot.slug}`)}>{spot.title}</h2>
                
                <p style={{fontFamily: 'IndieFlower', color: 'var(--black-color-light)', fontSize: '0.75rem', transform: `translateY(-0.5rem)`}}>by {spot.postedBy.split('@')[0]}</p>
                
                <div className='icons-box'>
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
                </div>
                
                <p
                    onClick={() => router.push(`/spots/${spot.slug}`)}
                    style={{
                        fontFamily: 'IndieFlower', 
                        color: 'var(--black-color-light)', 
                        fontSize: '1rem',
                        margin: '1rem 0 0.5rem 0'
                    }}    
                >
                    {spot.excerpt}
                </p>
                
                <ButtonSquare 
                    text='Edit Spot' 
                    action={() => router.push(`/spots/editspot/${spot.slug}`)}   
                />
            </div>
        </div>
    )
}
