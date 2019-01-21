import React, { Component } from 'react';
import './textblock.scss';

class TextblockI extends Component {
    render() {
        return (
            <div className="sf-txtblock sf-txtblock-iconed">
                <div className="sf-txtblock-icon">
                    <span className={`sf-icon icon-sf_ico_${ this.props.icon }`}></span>
                </div>
                <div className="sf-txtblock-text">
                    <div className="sf-txtblock-txt-title">{ this.props.title }</div>
                    <div className="sf-txtblock-txt-text">{ this.props.text }</div>
                </div>
            </div>
        )
    }
}

export default TextblockI;
