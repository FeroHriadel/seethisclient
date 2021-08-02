/*HOW TO USE:

    <Heading>

        This will be black

        <span>
            things inside a span will be red
        </span>

        and this will be black again
        
    </Heading>

*/



export default function Heading({ children }) {
    return (
        <div className='heading-main-box'>
            <h1 className='heading-h1'>
                {children}
            </h1>
        </div>
    )
}
