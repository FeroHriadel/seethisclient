import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import Link from 'next/link';
import { API } from '../config';



export default function Map({ spots }) {
    return (
        <MapContainer 
            center={[49.020606517888275, 19.603840559810987]} 
            zoom={7} 
            scrollWheelZoom={true} 
            style={{height: "100%", width: "100%"}}
        > 
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {spots && spots.length > 0 && spots.map(spot => (
                <Marker 
                position={[spot.lat, spot.long]}
                draggable={true}
                animate={true}
                >
                    <Popup>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '5px',
                            background: `url(${API}/getspotimage/${spot.slug}) no-repeat center center/cover`,
                            backgroundColor: 'var(--black-color)',
                            marginRight: '15px'
                        }} />

                        <div>
                            <p style={{fontFamily: 'Aclonica'}}>{spot.title}</p>
                            <Link href={`/spots/${spot.slug}`}>
                                <a style={{fontFamily: 'Aclonica', textDecoration: 'none', color: 'var(--red-color)'}}>Open Spot</a>
                            </Link>
                        </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

        </MapContainer>

    )
}
