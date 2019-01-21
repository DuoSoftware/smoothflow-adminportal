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
                    const _reviews = reviews.data.Result.map(review => {
                        debugger
                        return {
                            ...review,
                            original: review,
                            type: 'review',
                            state: review.state,
                            name: review.activity_name,
                            image: review.image,
                            description: review.description,
                            features:
                                review.features.map((ft) => {
                                    return {
                                        title: ft.title,
                                        icon: 'check_circle',
                                        description: ft.description
                                    }
                                }),
                            tags:
                                review.tags.map((tag) => {
                                    return {
                                        name: tag.tag
                                    }
                                }),
                            what_you_get:
                                review.what_you_get.map((wyg) => {
                                    return {
                                        type: 'image',
                                        file: wyg.file
                                    }
                                }),
                            pricings:
                                review.pricings.map((price) => {
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
                                }),
                            faq:
                                review.faq.map((fq) => {
                                    return  {
                                        question: fq.question,
                                        answer: fq.answer
                                    }
                                }),
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
