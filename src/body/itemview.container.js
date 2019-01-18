import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import TableTwoCol from '../components/Table - Two Col/table_two_col.widget';
import UMInfo from '../components/User Messages/UM - Info/info.user.message';
import TagBlock from '../components/Tag/tagblock.widget';
import Tab from '../components/Tab/tab.widget';
import Tabs from '../components/Tab/tabs.widget';
import TextBlockI from '../components/Text blocks/textblock_iconed.widget';
import Carousel from '../components/Carousel/carousel.widget';
import PriceBlock from "../components/Price block/priceblock.widget";
import Accordion from '../components/Accordion/accordion.widget';
import AccordionItem from '../components/Accordion/accordion_item.widget';
import {PageHeader, Block, Button, Preloader} from '../components/common';
import {ActivitiesService, IntegrationsService, KEY} from "../_base/services";
import {PreloadBody} from "../_base/actions";
import Wrap from "../_base/_wrap";
import Input from "../components/Input/input.widget";

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preload_activity : false,
            preload_comments : false,
            activity: {
                review_content : this.props.location.activity
            }
        }
    }

    componentDidMount() {
        this.getActivityDetails();
    }

    // NPM instance initialization

    // models
    _mod_comment = {
        "reviewer": this.props.user.username,
        "comment": "",
        "status": ""
    };
    getActivityDetails() {
        this.props.dispatch(PreloadBody(true));
        if(!this.props.location.activity) {
            return <Redirect to={'/'} /> ;
        };
        ActivitiesService.getActivityDetailsByName(this.props.location.activity.name)
            .then(res => {
                let activity = {};
                if(res.data.Result.length) activity = res.data.Result[0];
                activity.features = res.data.Result[0].features.map((ft) => {
                    return {
                        title: ft.title,
                        icon: 'check_circle',
                        description: ft.description
                    }
                });
                activity.pricings = res.data.Result[0].pricings.map((price) => {
                    return {
                        name: price.name,
                        pricing_fts:
                            price.pricing_fts.map((ft) => {
                                return {
                                    icon: 'check_circle_thin',
                                    text: ft
                                }
                            }),
                        price: price.price,
                        bill_cycle: price.bill_cycle
                    }
                });
                activity.tags = res.data.Result[0].tags.map((tag) => {
                    return {
                        name: tag.tag
                    }
                });
                activity.comments = [];
                this.setState(state => ({
                    ...state,
                    preload_activity: true,
                    activity: {
                        ...state.activity,
                        activity: activity
                    }
                }));
                this.props.dispatch(PreloadBody(false));
            })
            .catch(errorres => {
                this.setState(state => ({
                    ...state,
                    preload_activity: true
                }));
                this.props.dispatch(PreloadBody(false));
            });
    }
    getFeatures(features) {
        const _features = features.map((feature) =>
            <TextBlockI key={KEY()} icon={feature.icon} title={feature.title} text={feature.description} />
        );
        return _features;
    }
    getPricing(pricing) {
        const _pricing = pricing.map((price) =>
            <PriceBlock key={KEY()} name={ price.name } list={ price.pricing_fts } price={ price.price } billCycle={ price.bill_cycle } />
        );
        return _pricing;
    }
    getFAQ(faq) {
        const _faq = faq.map((f, i) =>
            <AccordionItem key={KEY()} title={ f.question } index={ 'FAQ '+ (i+1) }><p>{ f.answer }</p></AccordionItem>
        );
        return _faq;
    }
    createComment(e) {
        this._mod_comment.comment = e.target.value;
        this.setState();
    };
    addComment = () => {
        const comment = this._mod_comment;
        this.setState(state => ({
            ...state,
            preload_comments : true
        }));
        ActivitiesService.addComment(comment, this.props.location.activity._id)
            .then(res => {
                debugger;
                this.setState(state => ({
                    ...state,
                    preload_comments : false,
                    activity: {
                        ...state.activity,
                        review_content: {
                            ...state.activity.review_content,
                            reviewer_comments: res.data.Result.reviewer_comments
                        }
                    }
                }));
            })
            .catch(errores => {
                debugger
            });
    };

    downloadActivity = (activityName) => {
        debugger
    };

    render() {
        if (!this.props.location.activity) {
            return <Redirect to={'/'} /> ;
        }
        return(
            this.props.uihelper._preload_body_
            ?   <Preloader type={'BODY'}/>
            :   <div className="sf-route-content">
                    <Wrap>
                        {
                            this.state.preload_activity
                            ?   <Wrap>
                                    <PageHeader title={this.state.activity.activity.activity_name}>
                                        <Button className="sf-button sf-button-primary sf-button-primary-p" onClick={ this.downloadActivity.bind(this.state.activity.activity.activity_name) }>Download</Button>
                                    </PageHeader>
                                    <div className="sf-flexbox-row">
                                        <div className="sf-flex-1">
                                            <div className="sf-header-bordered">
                                                <h3 className="sf-txt-c-p">{ this.state.activity.activity.activity_name }</h3>
                                            </div>
                                            <div className="sf-text-sub">
                                                <p>{ this.state.activity.activity.description }</p>
                                            </div>
                                            <div style={ {'maxWidth':'400px'} }>
                                                <TableTwoCol tabledata={ this.state.activity.activity.pricings } />
                                            </div>
                                            <div className="sf-p-p-h">
                                                {/* <UMInfo text="Free for customers viewing and creating tickets" /> */}
                                            </div>
                                            <div className="sf-flexbox-row" style={{alignItems: 'center'}}>
                                                {
                                                    this.props.location.advanced
                                                        ?   <Block className="sf-flex-1">
                                                            <button className="sf-button sf-button-primary sf-button-primary-p sf-button-block">30 Days Trial</button>
                                                        </Block>
                                                        :   null
                                                }
                                                <div>
                                                    <TagBlock tags={ this.state.activity.activity.tags } />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box sf-border-radius" style={{display: 'flex'}}>
                                            <img src={this.state.activity.image} alt="" style={{maxWidth: '300px'}}/>
                                        </div>
                                    </div>

                                    <div className="sf-hr"></div>

                                    <Tabs>
                                        <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Features'}>
                                            <div className="sf-p-ex sf-auto-fix">
                                                { this.getFeatures( this.state.activity.activity.features) }
                                            </div>
                                        </Tab>
                                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'What you get'}>
                                            <div className="sf-p-ex sf-auto-fix">
                                                <Carousel slides={ this.state.activity.activity.what_you_get } />
                                            </div>
                                        </Tab>
                                        <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Pricing'}>
                                            <div className="sf-p-ex sf-auto-fix">
                                                <div style={ {'display' : 'flex','justify-content' : 'center'}}>
                                                    { this.getPricing( this.state.activity.activity.pricings ) }
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'FAQ'}>
                                            <div className="sf-p-ex sf-auto-fix">
                                                <Accordion atomic={true}>
                                                    { this.getFAQ(this.state.activity.activity.faq) }
                                                </Accordion>
                                            </div>
                                        </Tab>
                                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Developer'}>
                                            <div className="sf-p-ex sf-auto-fix">

                                            </div>
                                        </Tab>
                                        <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Comments'}>
                                            <div className="sf-block">
                                                <Input type="textarea" placeholder="Type your comment here..." onChange={ (event) => this.createComment(event) }/>
                                            </div>
                                            <div className="sf-block text-right">
                                                <Button className="sf-button sf-button-secondary sf-button-secondary-s" onClick={ this.addComment.bind() }>Add Comment</Button>
                                            </div>
                                            <div className="sf-hr"></div>
                                            <div>
                                                {
                                                    this.state.activity.review_content.reviewer_comments.map(comment =>
                                                        <div className="sf-comments-wrap" key={comment._id}>
                                                            <div className="sf-comment-block" key={comment._id}>
                                                                <div className="sf-commenter">
                                                                    <span className="sf-commenter-face">{ comment.reviewer.substring(0,2) }</span>
                                                                </div>
                                                                <div className="sf-comment">
                                                                    <h4>{ comment.reviewer }</h4>
                                                                    <p>{ comment.comment }</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </Wrap>
                            :   null
                        }
                    </Wrap>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(ItemView);