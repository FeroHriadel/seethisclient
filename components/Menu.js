/* HOW TO USE 
    
    place the <Menu /> component inside the page main wrapper like this:

    <div className='index-page'>
        <Menu />
    </div>

*/


import Navbar from "./Navbar";



export default function Menu() {
    return (
        <div className='menu-main-box'>

            <input type="checkbox" id="checkbox" />
        
            <div id="hamburger">
                <div></div>
            </div>
        
            <div id="menu">
                <div id="sphere"></div>
                <Navbar />
            </div>

        </div>
    )
}
