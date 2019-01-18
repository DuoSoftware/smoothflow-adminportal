import React, { Component } from 'react';
import './block.scss';

const Block = (props) =>
    <div className={`sf-block${
        props.sfBlockShadow ? ' sf-block-shadow' :
        props.sfBlockBorder ? ' sf-block-border' :
        ''
    }`}>
        { props.children }
    </div>

export { Block };