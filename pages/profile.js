import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../context';
import { getUsersSpots } from '../actions/spotActions';
import ProtectRoute from '../components/ProtectRoute';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from '../components/Menu';
import Heading from '../components/Heading';
import SpotPreviewWithEdit from '../components/SpotPreviewWithEdit';



export default function Profile() {
    //GET USER
    const { state, dispatch } = useContext(Context);
    const [message, setMessage] = useState('Loading...');
    const [spots, setSpots] = useState(null);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!state || !state.user || !state.user.token) return;
            
            getUsersSpots(state.user.token)
                .then(data => {
                    if (!data || data.error) {
                        return setMessage(`Error: ${data && data.error ? data.error : ''}`);
                    }

                    setSpots(data);
                    setMessage('');
                })
        }
    }, [state.user]);



    return (
        <ProtectRoute>
            <div className='profile-page'>
                <Bricks />
                <Menu />
                <Switch />

                <div className='container'>
                    <Heading>
                        <span>My </span> Spots
                    </Heading>

                    {
                        message && <p className='message'>{message}</p>
                    }

                    {
                        !spots || spots.length < 1
                        ?
                        <h2 className='subheading'>You haven't added any spots yet</h2>
                        :
                        <React.Fragment>
                            <h2 className='subheading'>Spots you shared: </h2>
                            {
                                spots.map(spot => (
                                    <SpotPreviewWithEdit spot={spot} key={spot._id}/>
                                ))
                            }
                        </React.Fragment>
                    }
                    
                </div>
                
            </div>
        </ProtectRoute>
    )
}
