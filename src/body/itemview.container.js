import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { createHashHistory  } from 'history'
import {PageHeader, Button, Preloader} from '../components/common';
import Wrap from "../_base/_wrap";
import Input from "../components/Input/input.widget";
import {ActivitiesService, ReviewsService} from "../_base/services";
import ReactQuill from 'react-quill'; // ES6
import $ from 'jquery'
import { toastr } from 'react-redux-toastr';
import {PreloadBody} from "../_base/actions";
import JSZip from 'jszip';
import { saveAs } from 'file-saver'

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {
            comments_loading: false,
            comments: [],
            review_comment_status: "",
            comment: {
                "comment": "",
                "status": "PENDINGREVISION"
            }
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
            comment: {
                ...status.comment,
                comment: comment
            }
        }));
    };

    extractComment = (comment, i) => {
        $(document).find('#' + 'sf_comment_' + i).append(comment);
    };
    setReviewStatus = (e) => {
        const _val = e.target.value;
        this.setState(state => ({
            ...state,
            comment: {
                ...state.comment,
                status: _val
            }
        }));
    };
    addComment = (e) => {
        this.setState(state => ({...state, comments_loading: true}));
        const reviewer = this.props.user;
        const comment = {
            "reviewer": reviewer.username,
            "comment": this.state.comment.comment,
            "status": this.state.comment.status
        };
        let comments = [...this.state.comments];
        if (this.state.comment.status === 'PASSED') {
            const toastrConfirmOptions = {
                onOk: () => {
                    const _payload = {
                        review_status: 'PASSED'
                    };
                    ReviewsService.updateReviewQueue(this.props.location.activity._id, _payload)
                        .then(res => {
                            if (res.data.IsSuccess) {
                                this.postReviewReport(comment, comments, true);
                            } else {
                                toastr.error(this.props.location.activity.activity_name, 'Something went wrong. Please try again later');
                                this.props.dispatch(PreloadBody(false));
                            }
                        })
                        .catch(res => {
                            toastr.success('Review starting failed', 'Something went wrong. Please try again later');
                            this.props.dispatch(PreloadBody(false));
                        });
                },
                onCancel: () => {}
            };
            toastr.confirm('You are about to PASS the Activity you have being reviewing. This result on publishing this Activity to Public use and will be available on the Marketplace. Are you sure you intend to do this?', toastrConfirmOptions);
        } else {
            this.postReviewReport(comment, comments, false);
        }
    };
    postReviewReport(comment, comments, toast) {
        const _self = this;
        ReviewsService.addComment(comment, this.props.location.activity._id)
            .then(res => {
                if (res.data.IsSuccess) {
                    comments.unshift(comment);
                    _self.updateMarketplaceActivity(comment, comments, toast);
                } else {
                    _self.props.dispatch(PreloadBody(false));
                }
            })
            .catch(erres => {
                _self.props.dispatch(PreloadBody(false));
            });
    }
    init_review = (e) => {
        const toastrConfirmOptions = {
            onOk: () => this.reviewStart(),
            onCancel: () => {}
        };
        toastr.confirm('Once you start reviewing, this Activity will be locked for other agents to review. Are you sure you want to start reviewing this Activity?', toastrConfirmOptions);
    };
    direct_publish = (e) => {
        const _self = this;
        e.preventDefault();
        this.
        ReviewsService.getIntegrationById(this.props.location.activity._id)
            .then(res=>{
                if (res.data.IsSuccess) {
                    debugger
                    const _payload = {
                        "connectionID": res.data.connectionID,
                        "connectionType": "test",
                        "integrationName": res.data.integrationName,
                        "integrationConnections": res.data.integrationConnections,
                        "image": res.data.image,
                        "integrationData": res.data.integrationData,
                        "description": res.data.description,
                        "state": "public",
                        "enable": true
                    };
                    ReviewsService.directPublish(_payload)
                        .then(res_ => {
                            if (res_.data.IsSuccess) {
                                toastr.success(_self.props.location.activity.activity_name, 'Integration published to public successfully.');
                            } else {
                                toastr.error(_self.props.location.activity.activity_name, 'Integration has failed to publish publically');
                            }
                        })
                        .catch(eres_ => {
                            toastr.error(_self.props.location.activity.activity_name, 'Integration has failed to publish publically');
                        })
                }
            })
            .catch(eres=> {
                debugger
            })
        // ReviewsService.directPublish(this.props.location.activity)
    }

    reviewStart () {
        this.props.dispatch(PreloadBody(true));
        const _payload = {
            review_status: 'UNDERREVIEW',
            scope: this.props.user.username
        };
        const _fileName = this.props.location.activity.path.split('/').pop();
        ReviewsService.downloadActivity(_fileName)
            .then(activityfile => {
                if (activityfile.data.isSuccess) {
                    debugger
                    const _self = this;
                    fetch(activityfile.data.data)
                        .then(function(res){return res.arrayBuffer();})
                        .then(function(buf) {
                            // const _activityFile = new File([buf], _fileName, {type: 'application/zip'});
                            ReviewsService.updateReviewQueue(_self.props.location.activity._id, _payload)
                                .then(res => {
                                    if (res.data.IsSuccess) {
                                        _self.download(_fileName, activityfile.data.data);
                                        toastr.success(this.props.location.activity.activity_name, 'Activity is now under review. No other agent will be able to access this Activity until the review is done.');
                                        _self.props.dispatch(PreloadBody(false));
                                    } else {
                                        toastr.success('Review starting failed', 'Something went wrong. Please try again later');
                                        _self.props.dispatch(PreloadBody(false));
                                    }
                                })
                                .catch(res => {
                                    toastr.success('Review starting failed', 'Something went wrong. Please try again later');
                                    _self.props.dispatch(PreloadBody(false));
                                });
                        })
                } else {
                    toastr.success('Review starting failed', 'Something went wrong. Please try again later');
                    this.props.dispatch(PreloadBody(false));
                }
            })
    }
    download(filename, text) {
        const zip = new JSZip();
        let _content = zip.folder("review_"+filename);
        _content.file(filename, text, {base64: true});
        zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, filename);
            });
        // const element = document.createElement('a');
        // element.setAttribute('href', 'data:application/zip;base64,' + encodeURIComponent(text));
        // // element.setAttribute('href', filename);
        // element.setAttribute('download', filename);
        //
        // element.style.display = 'none';
        // document.body.appendChild(element);
        // element.click();
        // document.body.removeChild(element);
    }
    updateMarketplaceActivity (comment, comments, toast) {
        const _self = this;
        let __payload = {
            "tenant_name": this.props.user.username,
            "activities": []
        };
        const _activity = {
            activity_name : this.props.location.activity.activity_name,
            insertOrUpdate : "update",
            state: 'public'
        };
        __payload.activities.push(_activity);
        ActivitiesService.saveNewActivity(__payload)
            .then((res) => {
                if (res.data.IsSuccess) {
                    this.setState(state => ({
                        ...state,
                        comments_loading: false,
                        comments: comments
                    }));
                    if (toast) {
                        toastr.success(this.props.location.activity.activity_name, 'Activity successfully published to Public');
                    }
                    _self.props.dispatch(PreloadBody(false));
                }
            })
            .catch((errorres) => {
                toastr.error('Failed to Publish', 'Something went wrong. Please try again later.');
                _self.props.dispatch(PreloadBody(false));
            });
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
                                    // this.props.location.activity.review_status === 'INQUEUE'
                                    this.props.location.activity.type === 'integration'
                                    ? <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_download" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.direct_publish(e) }>Publish</Button>
                                        : true
                                        ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_download" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_review(e) }>Review Activity</Button>
                                        // :
                                        // this.props.location.activity.review_status === 'UNDERREVIEW'
                                        // ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="assignment_turned_in" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_review(e) }>Release to Public</Button>
                                        :   null
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
                                        <p>{ this.props.location.activity.description ? this.props.location.activity.description : '- No description available -' }</p>
                                    </div>
                                </div>
                                <div>
                                    <span className={`sf-activity-state${' sf-activity-'+this.props.location.activity.state.toLowerCase()}`}>{ this.props.location.activity.state }</span>
                                </div>
                            </div>
                            <div className="sf-hr"></div>

                        <div className="sf-m-p-b">
                            <h3>Reviews</h3>
                        </div>

                            <div style={ {position: 'relative', width: '100%', height: '60%'} }>
                            {
                                this.state.comments_loading
                                ?   <Preloader type={'BODY'} />
                                :   <Wrap>
                                        <div>
                                            {
                                                this.state.comments.map((review, i) =>
                                                    <div className={`sf-comment-block${ ' sf-comment-' + review.status.toLowerCase()}`}>
                                                        <div className="sf-comment-block-prefix">
                                                            <i className="material-icons">{ review.status === 'PENDINGREVISION' ? 'warning' : 'assignment_turned_in' }</i>
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



                                        <div className="sf-add-review-block">
                                           <div className="sf-add-review-header">
                                               <h3>Add review comment</h3>
                                               <div className="sf-custom-input sf-custom-select">
                                                   <select name="reviewStatus" id="reviewStatus" defaultValue={'_'} onChange={(event) => this.setReviewStatus(event)}>
                                                       <option value="PENDINGREVISION">SEND FOR REVISION</option>
                                                       <option value="PASSED">PASSED</option>
                                                   </select>
                                               </div>
                                           </div>
                                            <ReactQuill value={this.state.comment.comment}
                                                        placeholder="Type your review report here..."
                                                        onChange={this.createComment} />
                                        </div>
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