/* HOW TO USE
    Place this component as a first child of the page like this:

    <div className='index-page'>
      <Bricks />
      <p>abc</p>
    </div>
*/

import NProgress from 'nprogress'; //import NProgress
import Router from 'next/router'; //import Router



Router.onRouteChangeStart = url => NProgress.start(); //set Router event listneners
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();



export default function Bricks() {
    return (
        <div className='bricks'></div>
    )
}
