import React from 'react'
import './message.scss'

const Message = (props) => {
    return (
        <div className={`sf-message`}>
            {
                props.children
            }
        </div>
    )
};

export {Message};