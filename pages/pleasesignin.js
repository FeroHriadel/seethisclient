import { useRouter } from 'next/router';
import Bricks from '../components/Bricks';
import Switch from '../components/Switch';
import Menu from '../components/Menu';
import Heading from '../components/Heading';
import Link from 'next/link';



export default function Pleasesignin() {
    return (
        <div className='please-sign-in-page'>
            <Bricks />
            <Switch />
            <Menu />

            <div className='container'>
                <Heading>
                    Sorry, this page <span>requires login</span>
                </Heading>

                <ul>
                    <li>
                        <Link href='/signin'>
                            <h2 className='link'>Log in</h2>
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <h2 className='link'>Go home</h2>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
