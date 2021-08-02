import React, { useContext, useEffect, useState } from 'react';
import Heading from "../components/Heading";
import Bricks from "../components/Bricks";
import Switch from "../components/Switch";
import Menu from "../components/Menu";
import Link from 'next/link';
import { Context } from '../context';
import { wakeServerUp } from '../actions/userActions';
import Image from 'next/image';



export default function Home() {
  //GET USER
  const { state, dispatch } = useContext(Context);
  const [user, setUser] = useState(false); //html doesn't seem to work well with context.state, so I am using react.state
  
  useEffect(() => {
      if (state && state.user && state.user.email) {
          setUser(true);
      } else {
          setUser(false);
      }
  }, [state, state.user]);



  //WAKE SERVER UP
  useEffect(() => {
    wakeServerUp();
  }, []);



  //RENDER
  return (
    <div className='index-page'>
      <Bricks /> {/* position fixed */}

      {/* either replace the <img> with real html or keep this div so SEO is happy*/}
      <div className='html-for-search-engines' style={{
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        opacity: '0',
      }}>
        <h1>See This</h1>
        <h2>Top Spots in Slovakia</h2>
      </div>

      <Switch />

      <Menu />

      <div className='main-box'>      
        <div className='img'>
          <Image 
              src='/images/Logo.png' 
              alt='' 
              width='400' 
              height='300' 
              layout='intrinsic'
          />
        </div>

        <section className='text-box'>
          <Heading>
            Explore the 
            <span> hottest spots </span>
            in Slovakia
          </Heading>

          <ul className='links'>
            <li>
              <Link href='/explore'>
                <a className='link'>Explore</a>
              </Link>
            </li>
            <li>
              <Link href='/spots/addspot'>
                <a className='link'>Share</a>
              </Link>
            </li>
            {
              user
              ?
              ''
              :
              <li>
                <Link href='/join'>
                  <a className='link'>Join</a>
                </Link>
              </li>
            }
            <li>
              <Link href='/profile'>
                <a className='link'>Me</a>
              </Link>
            </li>
          </ul>
        </section>
      </div>



    </div>
  )
}
