import React, { Component } from 'react';
import './list_iconed.scss';

class ListI extends Component {
    constructor(props) {
        super(props);
    }
    getList(list) {
        const _list = list.map((i) =>
            <li>
                <span className="sf-list-icon"><span className={`sf-icon icon-sf_ico_${i.icon}`}></span></span><span>{ i.text }</span>
            </li>
        );
        return _list;
    }

    render() {
        return (
            <div className="sf-list sf-list-iconed">
                <ul>
                    { this.getList(this.props.list) }
                </ul>
            </div>
        )
    }
}

export default ListI;