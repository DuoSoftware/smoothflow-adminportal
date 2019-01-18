import React, { Component } from 'react';
import './error.scss'

class Error extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sf-error-block">
                <div className="sf-error-title">{ this.props.title }</div>
                <div className="sf-error-body">{ this.props.body }</div>
                <div className="sf-error-remark">Remark: <b>{ this.props.remark }</b></div>
            </div>
        )
    }
}

export default Error;