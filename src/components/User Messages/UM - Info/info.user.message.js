import React, { Component } from 'react';
import './sf-um-info.scss'

class UMInfo extends Component {
    render() {
        return (
            <div className="sf-um sf-um-info">
                <span className="sf-icon icon-sf_ico_information"></span>{ this.props.text }
            </div>
        )
    }
}

export default UMInfo;