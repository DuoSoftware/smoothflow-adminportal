import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { createHashHistory  } from 'history'
import Tab from '../components/Tab/tab.widget';
import Tabs from '../components/Tab/tabs.widget';
import {PageHeader, Button, Preloader} from '../components/common';
import Wrap from "../_base/_wrap";

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {}
    };

    componentDidMount() {
        debugger
    }

    render() {
        if (!this.props.location.activity) {
            return <Redirect to={'/user/all_reviews'} /> ;
        }
        return(
            <Wrap>
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'}/>
                    :   <div className="sf-route-content">
                            <PageHeader title={this.props.location.activity.name}>
                                {
                                    this.props.location.activity.state === 'private'
                                        ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_upload" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_publish(e) }>Publish</Button>
                                        :   null
                                }
                                <Link
                                    to={{
                                        pathname: this.props.location.activity.type === 'activity' ? '/user/activities/create' : '/user/integrations/create',
                                        candidate: {...this.props.location.activity}
                                    }}>
                                    <Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_edit"></span></Button>
                                </Link>
                                {
                                    this.props.location.activity.type === 'integration'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteInit.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   this.props.location.activity.type === 'activity' && this.props.location.activity.state === 'private'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteInit.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   null
                                }
                            </PageHeader>

                            <div className="sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <div className="sf-header-bordered">
                                        <h3 className="sf-txt-c-p">{ this.props.location.activity.name }</h3>
                                    </div>
                                    <div className="sf-text-sub">
                                        <p>{ this.props.location.activity.description }</p>
                                    </div>
                                </div>
                                <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box sf-border-radius" style={{display: 'flex'}}>
                                </div>
                            </div>
                            <div className="sf-hr"></div>

                            {
                                this.props.location.advanced
                                ?   <div>
                                        <Tabs>
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Reviews'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    {
                                                        this.props.location.activity.reviews.map(review => {
                                                            <div className="sf-block">
                                                                <h4>{ review.reviewer }</h4>
                                                                <p>{ review.comment }</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                :   null
                            }
                        </div>
                }
            </Wrap>
        )
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    uihelper : state.uihelper,
    user : state.user
});

export default connect(mapStateToProps)(ItemView);