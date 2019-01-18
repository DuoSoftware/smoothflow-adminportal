import React from 'react'
import './list.scss'

const extractList = (list) => {
    return list.map(li => {
        <li>{ li }</li>
    });
};

const List = (props) => {
    return (
        <ul className="sf-list">
            {
                props.list
                ?   this.extractList(props.list)
                :   props.children
            }
        </ul>
    )
};

export { List };