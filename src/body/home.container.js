import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import {Activities, ActivitiesLoader, PreloadBody} from '../_base/actions'
import { ActivitiesService } from '../_base/services';
import ItemCard from '../components/Itemcard/itemcard.widget';
import Wrap from '../_base/_wrap'
import { Preloader, PageHeader } from '../components/common';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allActivities: [],
            loadingPage: false,
            filter: {
                categories: [
                    {
                        text: 'All',
                        selected: true
                    },
                    {
                        text: 'INQUEUE',
                        selected: false
                    },
                    {
                        text: 'PENDINGREVISION',
                        selected: false
                    },
                    {
                        text: 'INPROGRESS',
                        selected: false
                    },
                    {
                        text: 'PASSED',
                        selected: false
                    },
                    {
                        text: 'FAILED',
                        selected: false
                    }
                ],
                toggleDropdown: false
            }
        };
    }
    componentDidMount() {
        this.getAllItems();
    }

    // -------------------------------------------------------------------------------
    temp_all_activities = [];

    getAllItems = () => {
        this.props.dispatch(PreloadBody(true));
        ActivitiesService.getReviewQueues()
            .then(res => {
                if(res.data.IsSuccess) {
                    const _queue = res.data.Result.map(activity => {
                        return {
                            name: activity.activity_name,
                            description: activity.description,
                            created_date: activity.created_at,
                            company: activity.company,
                            tenant: activity.tenant,
                            tenant_name: activity.tenant_name,
                            state: activity.review_status,
                            reviewer_comments: activity.reviewer_comments,
                            _id: activity._id,
                        }
                    });
                    this.setState(state => ({
                        ...state,
                        allActivities: _queue
                    }));
                    this.props.dispatch(PreloadBody(false));
                }
            })
            .catch(errorres => {
                debugger
            });
    };

    // Search
    search = (e) => {
        const _filtered = this.temp_all_activities.filter((activity) => {
            return activity.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.setState(prevState => ({
            ...prevState,
            allActivities: _filtered
        }));
    };

    openSearchDropdown = (e) => {
        const handler = !this.state.filter.toggleDropdown;
        this.setState(prevState => ({
            ...prevState,
            filter: {
                ...prevState.filter,
                toggleDropdown: handler
            }
        }));
    };
    updatedFilter = (e, selected) => {
        let _filters = [...this.state.filter.categories];
        _filters.map((f) => {
            if(f.text === selected) {
                f.selected = true;
            }else{
                f.selected = false;
            }
        });
        this.setState(prevState => ({
            ...prevState,
            filter: {
                toggleDropdown: false,
                categories: _filters
            }
        }));
    };

    render() {
        if(this.props.user.is_logged_in) <Redirect to={'/user/dashboard'} />
        return (
            <div className="sf-route-content">
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader />
                    :   <Wrap>
                            <PageHeader title={'Queued Activities'}>
                                <div className="sf-input-inputcontrol sf-flex-1">
                                    <div className="sf-inputcontrol-select" onClick={ (event) => this.openSearchDropdown(event) }>
                                        <i className="material-icons">search</i>
                                        {
                                            this.state.filter.categories.map((c) => {
                                                if(c.selected) return <span className={`sf-inputcontrol-state state-${c.text}`} key={c.text}>{ c.text }</span>
                                            })
                                        }
                                        <span className="sf-icon icon-sf_ico_chevron_down"></span>
                                    </div>
                                    <div className={`input-dropdown ${this.state.filter.toggleDropdown ? ' input-dropdown-opened' : ''}`}>
                                        {
                                            this.state.filter.categories.map((c) => {
                                                return  <li onClick={ (e)=>this.updatedFilter(e, c.text)} key={c.text}>
                                                    <span className="sf-list-icon">
                                                        { c.selected ? <span className="sf-icon icon-sf_ico_check_circle"></span> : null }
                                                        </span>
                                                    <span className={`sf-inputcontrol-state state-${c.text}`}>{ c.text }</span>
                                                </li>
                                            })
                                        }
                                    </div>
                                    <input type="text" id="mainSearch" placeholder="Search.." onChange={ (e) => this.search(e) }/>
                                </div>
                            </PageHeader>
                            <div>
                                {
                                    !this.props.uihelper._preload_body_
                                    ?   this.state.allActivities.map((activity) => {
                                        if(activity) return <ItemCard item={activity} key={activity._id} />
                                    })
                                    :   null
                                }
                            </div>
                        </Wrap>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(Home);
