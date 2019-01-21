import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import {PageHeader, Preloader} from "../components/common";
import ItemCard from '../components/Itemcard/itemcard.widget';
import {ReviewsService} from "../_base/services";
import {ALlReviews} from "../_base/actions";
import Wrap from "../_base/_wrap";

class Reviews extends Component {
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

    componentDidMount () {
        this.getAllItems();
    }

    getAllItems = () => {
        this.setState(state => ({
            ...state,
            loading: true
        }));
        ReviewsService.getAllReviews()
            .then(reviews => {
                if (reviews.status) {
                    const _reviews = reviews.data.Result.map(review => {
                        return {
                            ...review,
                            original: review,
                            type: 'review',
                            state: review.review_status,
                            name: review.activity_name,
                            image: review.image,
                            description: review.description,
                            variables:
                                review.variables.map((v) => {
                                    return  {
                                        "Key": v.Key,
                                        "DisplayName": v.DisplayName,
                                        "Value": v.Value,
                                        "ValueList": v.ValueList.map(vl => {
                                            return {
                                                "key": vl.key,
                                                "value": vl.value
                                            }
                                        }),
                                        "APIMethod": v.APIMethod,
                                        "Type": v.Type,
                                        "Category": v.Category,
                                        "DataType": v.DataType,
                                        "Group": v.Group,
                                        "Priority": v.Priority,
                                        "advance": v.advance,
                                        "control": v.control,
                                        "placeholder": v.placeholder
                                    }
                                }),
                            reviews: []
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
                        ?   <Preloader type={'BODY'} />
                        :   <Wrap>
                            {
                                this.props.reviews.reviews.map((review) => {
                                    return <ItemCard item={review} />
                                })
                            }
                        </Wrap>
                }
            </div>
        );
    }
}

const mapStateToProps = (state => ({
    uihelper : state.uihelper,
    reviews : state.reviews,
    user : state.user
}));

export default connect(mapStateToProps)(Reviews);