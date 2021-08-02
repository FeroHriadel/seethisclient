import { useState, useEffect  } from "react";
import { getSpots } from '../../actions/spotActions';
import Bricks from '../../components/Bricks';
import Switch from '../../components/Switch';
import Menu from '../../components/Menu';
import Heading from '../../components/Heading';
import SpotPreview from "../../components/SpotPreview";
import Navbar from '../../components/Navbar';



export default function Allspots({ initialSpots }) {
    //VALUES (SPOTS & PAGINATION)
    const [data, setData] = useState(initialSpots); //data is getSpots() response, it has {spots: [], numberOfPages, page}



    //MESSAGE
    const [message, setMessage] = useState('Loading... Give us a second, please');

    useEffect(() => {
        if (data) {
            setTimeout(() => setMessage(''), 1000);
        }
    }, [])



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
            getSpots(data.page + 1) //args = (pageNumber, searchword, category, tag, postedBy, sortBy, order)
                .then(responseData => {
                    if (!responseData || responseData.error) {
                        return console.log(`Couldn't load more spots: ${responseData && responseData.error ? responseData.error : ''}`)
                    }

                    setData({...data, page: data.page + 1, spots: [...data.spots, ...responseData.spots]});
                    setMessage('');
                })
        }
    }


    //RENDER
    return (
        <div className='all-spots-page' onScroll={loadMore}>
            <Bricks />
            <Switch />
            <Menu />

            <div className='container'>
                    <Heading>
                        <span>All </span> Spots
                    </Heading>

                    {
                        message && <p className='message'>{message}</p>
                    }

                    <div className='list'>
                        {
                            !data
                            ?
                            <p style={{fontFamily: 'IndieFlower', fontSize: '2rem', color: 'var(--black-color-light)'}}>Sorry, something went wrong</p>
                            :
                            data.error
                            ?
                            <p style={{fontFamily: 'IndieFlower', fontSize: '2rem', color: 'var(--black-color-light)'}}>Error: {data.error}</p>
                            :
                            data.spots.length < 1
                            ?
                            <p style={{fontFamily: 'IndieFlower', fontSize: '2rem'}}>There don't seem to be any spots created yet</p>
                            :
                            data.spots.map(spot => (
                                <SpotPreview key={spot._id} spot={spot} />
                            ))
                        }
                    </div>
            </div>
        </div>
    )
}


export async function getServerSideProps() {
    const initialSpots = await getSpots();
    console.log(initialSpots) /////////

    return { props: {initialSpots}}
}