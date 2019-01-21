import React, { Component } from 'react';
import './tag.scss'

class Tag extends Component {
    render() {
        return (
            <div className="sf-tag">
                <span className="sf-tag-text">{ this.props.text }</span>
                <span className="sf-tag-arrow"></span>
            </div>
        )
    }
}

export default Tag;