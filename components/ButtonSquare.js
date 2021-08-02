import React from "react";


export default function ButtonSquare({ text = '', action = f => f}) {
    return (
        <div className='button-square' onClick={action}>
            {text}
        </div>
    )
}
