import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { createHashHistory  } from 'history'
import {PageHeader, Button, Preloader} from '../components/common';
import Wrap from "../_base/_wrap";
import Input from "../components/Input/input.widget";
import {ReviewsService} from "../_base/services";
import ReactQuill from 'react-quill'; // ES6
import $ from 'jquery'

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {
            comments_loading: false,
            comments: [],
            comment: ""
        };
        this.extractComment = this.extractComment.bind(this);
    };

    componentDidMount() {
        this.setState(state => ({
            ...state,
            comments: this.props.location.activity.reviewer_comments.reverse()
        }));
    }
    createComment = (e) => {
        const comment = e;
        this.setState(status => ({
            ...status,
            comment: comment
        }));
    };

    extractComment = (comment, i) => {
        $(document).find('#' + 'sf_comment_' + i).append(comment);
    };

    addComment = (e) => {
        this.setState(state => ({...state, comments_loading: true}));
        const reviewer = this.props.user;
        const comment = {
            "reviewer": reviewer.username,
            "comment": this.state.comment,
            "status": "INPROGRESS"
        };
        let comments = [...this.state.comments];
        ReviewsService.addComment(comment, this.props.location.activity._id)
            .then(res => {
                comments.unshift(comment);
                this.setState(state => ({
                    ...state,
                    comments_loading: false,
                    comments: comments
                }));
            })
            .catch(erres => {
                debugger
            });
    };
    updateQueueItem = () => {

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
                                    <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_download" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.updateQueueItem(e) }>Review Activity</Button>
                                }
                                {/*<Link*/}
                                    {/*to={{*/}
                                        {/*pathname: this.props.location.activity.type === 'activity' ? '/user/activities/create' : '/user/integrations/create',*/}
                                        {/*candidate: {...this.props.location.activity}*/}
                                    {/*}}>*/}
                                    {/*<Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_edit"></span></Button>*/}
                                {/*</Link>*/}
                                {/*{*/}
                                    {/*<Button className="sf-button sf-button-circle" onClick={ this.updateQueueItem.bind() }><span className="sf-icon icon-sf_ico_edit"></span></Button>*/}
                                {/*}*/}
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
                                <div>
                                    <span className={`sf-activity-state${' sf-activity-'+this.props.location.activity.state.toLowerCase()}`}>{ this.props.location.activity.state }</span>
                                </div>
                            </div>
                            <div className="sf-hr"></div>

                            <div style={ {position: 'relative', width: '100%', height: '60%'} }>
                            {
                                this.state.comments_loading
                                ?   <Preloader type={'BODY'} />
                                :   <Wrap>
                                        <div>
                                            {
                                                this.state.comments.map((review, i) =>
                                                    <div className="sf-comment-block sf-comment-passed">
                                                        <div className="sf-comment-block-prefix">
                                                            <i className="material-icons">{ !review ? 'warning' : 'assignment_turned_in' }</i>
                                                        </div>
                                                        <div className="sf-comment-block-body">
                                                            <h4><i className="material-icons">account_circle</i>{ review.reviewer }</h4>
                                                            <div className="sf-comment-content" id={'sf_comment_' + i}>
                                                                <div dangerouslySetInnerHTML={{__html: review.comment}}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <ReactQuill value={this.state.comment}
                                                    placeholder="Type your review report here..."
                                                    onChange={this.createComment} />
                                        <div className="sf-block text-right">
                                            {/*<Input type="textarea" cols="" rows="4" placeholder="Type your comment here..." onChange={ (e) => this.createComment(e) }></Input>*/}
                                                <Button className="sf-button sf-button-secondary" onClick={ (e) => this.addComment(e) }>Add</Button>
                                        </div>
                                    </Wrap>
                            }
                            </div>
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