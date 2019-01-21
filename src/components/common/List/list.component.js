import React from 'react'
import './list.scss'
import {KEY} from "../../../_base/services";

const extractList = (list) => {
    return list.map(li =>
        <li key={KEY()}>{ li }</li>
    );
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