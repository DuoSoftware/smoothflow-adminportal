import React, { Component } from 'react';
import './tabs.scss';

class Tab extends Component {
    render() {
        return (
            <li className={`sf-tab ${this.props.isActive ? 'active' : ''}`}>
                <a onClick={(event) => {
                       event.preventDefault();
                       this.props.onClick(this.props.tabIndex);
                   }}>
                    { this.props.title }
                </a>
                <span className="sf-tab-active-arrow"></span>
            </li>
        )
    }
}

export default Tab;