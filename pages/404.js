import Heading from "../components/Heading";
import Bricks from "../components/Bricks";
import Switch from "../components/Switch";
import Link from 'next/link';


export default function NotFoundPage() {
    return (
        <div className='not-found-page'>

            <Bricks />

            <Switch />

            <div className ='main-box' >
                <Heading>
                    Sorry, this page was 
                    <span> not found </span> 
                </Heading>

                <Link href='/' passHref>
                    <h2 className='link'>Go Home</h2>
                </Link>

            </div>
            
        </div>
    )
}
