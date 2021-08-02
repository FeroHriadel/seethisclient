import { API } from '../config';
import { useRouter } from 'next/router';
import BlackCircle from './BlackCircle';
import RedCircle from './RedCircle';



export default function SpotPreview({ spot }) {
    //ROUTER
    const router = useRouter();



    //RENDER
    return (
        <div className='spot-preview-container' onClick={() => router.push(`/spots/${spot.slug}`)}>

            <div className='image-box' style={{background: `url(${API}/getspotimage/${spot.slug}) no-repeat center center/cover`, width: '260px', height: '260px', borderRadius: '50%', minWidth: '260px'}} />
            
            <div className='text-box'>
                
                <h2>{spot.title}</h2>
                
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
                
                <p className='excerpt'>{spot.excerpt}</p>
            
            </div>

        </div>
    )
}
