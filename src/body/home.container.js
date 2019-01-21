import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import {Activities, ActivitiesLoader, ALlReviews} from '../_base/actions'
import {ActivitiesService, KEY, ReviewsService} from '../_base/services';
import ItemCard from '../components/Itemcard/itemcard.widget';
import Wrap from '../_base/_wrap'
import {Button, Preloader} from '../components/common';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            filter: {
                categories: [
                    {
                        text: 'All',
                        selected: true
                    },
                    {
                        text: 'PRIVATE',
                        selected: false
                    },
                    {
                        text: 'PUBLISHED',
                        selected: false
                    }
                ],
                toggleDropdown: false
            },
            filtered: [],
            temp_filtered: []
        };
    }
    componentDidMount() {
        this.getAllItems();
    }

    temp_all_activities = [];
    // -------------------------------------------------------------------------------
    getAllItems = () => {
        ReviewsService.getAllReviews()
            .then(reviews => {
                if (reviews.status) {
                    const _reviews = reviews.data.Result.map(activity => {
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
                    this.props.dispatch(ALlReviews(_reviews));
                    this.setState(state => ({
                        ...state,
                        loading: false,
                        filtered: _reviews,
                        temp_filtered: _reviews
                    }));
                }
            })
            .catch(error => {
                debugger
            });
    };
    // -------------------------------------------------------------------------------

    // Search
    search = (e) => {
        const _filtered = this.temp_all_activities.filter((review) => {
            return review.name.toLowerCase().includes(e.target.value.toLowerCase());
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
                    this.state.loading
                    ?   <Preloader />
                    :   <Wrap>
                            {
                                this.props.reviews.reviews.map((review) => {
                                    if(review) return <ItemCard item={review} />
                                })
                            }
                        </Wrap>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    reviews: state.reviews
});

export default connect(mapStateToProps)(Home);
