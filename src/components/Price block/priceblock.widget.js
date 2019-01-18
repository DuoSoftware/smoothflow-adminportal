import React, { Component } from 'react';
import './priceblock.scss';
import ListI from '../List/list_iconed.widget';

class PriceBlock extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="sf-priceblock">
                <div className="sf-prcblk-header">
                    <h3 className="sf-c-p">{ this.props.name }</h3>
                </div>
                <div className="sf-prcblk-body">
                    <div className="sf-prcblk-body-title">Features</div>
                    <div className="sf-prcblk-body-content" style={ {'margin-bottom':'15px'} }>
                        <ListI list={ this.props.list } />
                    </div>
                    <div className="sf-prcblk-body-title">Price</div>
                    <div className="sf-prcblk-body-content sf-p-s">
                        <div>${ this.props.price } per { this.props.billCycle }</div>
                    </div>
                </div>
                <div className="sf-prcblk-footer">
                    {/*<button className="sf-button sf-button-primary sf-button-primary-p">Buy</button>*/}
                </div>
            </div>
        )
    }
}

export default PriceBlock;