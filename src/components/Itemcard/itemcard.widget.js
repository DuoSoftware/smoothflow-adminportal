import React, { Component } from 'react';
import './itemcard.scss';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link } from "react-router-dom";
import {Button, Block, Textbox} from "../common";
import Moment from 'react-moment';

class ItemCard extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {
    }
    render() {
        return (
            <div className="sf-item-card-wrap" {...this.props}>
                <Link to={ this.props.item.review_status === 'UNDERREVIEW' && !this.props.item.scope === this.props.user.username ? {} : { pathname: '/user/activity/' + this.props.item.activity_name , activity: {...this.props.item}, advanced: true } } className={`sf-item-card sf-border-box sf-item-card-clickable${ this.props.className ? ' ' + this.props.className : null}`}>
                    <div className="sf-item-card-header bordered">
                        <h3>{ this.props.item.name }</h3>
                        <span className={`sf-activity-state${' sf-activity-'+this.props.item.review_status.toLowerCase()}`}>{ this.props.item.review_status }</span>
                    </div>
                    <div className="sf-item-card-body">
                        <div className="sf-image-text-container" style={{overflow:'hidden'}}>
                            <div className="sf-text sf-flex-1">
                                <p>{ this.props.item.description }</p>
                            </div>
                        </div>
                        <Textbox icon="face" mat={true} size="17">
                            <span>{ this.props.item.tenant_name }</span>
                        </Textbox>
                        <Textbox icon="today" mat={true} size="17">
                            <span><i>Created : </i><Moment format={'D MMM YYYY'}>{ this.props.item.created_date }</Moment></span>
                        </Textbox>
                    </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps) (ItemCard);