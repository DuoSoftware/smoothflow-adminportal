import React, { Component } from 'react';
import './button.scss';

const Button = (props) => {
    return <button {...props}>
                {
                    props.icon
                    ?   props.mat ? <i className="sf-icon material-icons">{props.icon}</i> : <span className={`sf-icon icon-sf_ico_${ props.icon }`}></span>
                    :   null
                }
                { props.children }
            </button>
};

export { Button };