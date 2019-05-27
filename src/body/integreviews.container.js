import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Route, Link, Redirect } from "react-router-dom";
import {Button, PageHeader, Preloader} from "../components/common";
import ItemCard from '../components/Itemcard/itemcard.widget';
import {KEY, ReviewsService} from "../_base/services";
import {ALlReviews, IntegrReviews} from "../_base/actions";
import Wrap from "../_base/_wrap";

class IntegReviews extends Component {
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
            all_reviews: [],
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
        ReviewsService.getIntegrationReviews()
            .then(reviews => {
                if (reviews.status) {
                    const _reviews = reviews.data.Result.map(review => {
                        return {
                            ...review,
                            original: review,
                            type: 'integration',
                            state: review.review_status,
                            name: review.integration_name,
                            description: review.description,
                            _id: review.path
                        }
                    });
                    this.props.dispatch(IntegrReviews(_reviews));
                    this.setState(state => ({
                        ...state,
                        loading: false,
                        all_reviews: _reviews,
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
        const _filtered = this.temp_filtered.filter((review) => {
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
        if (this.props.user.is_logged_in) <Redirect to={'/user/dashboard'} />
        return (
            <div className="sf-route-content">
                {
                    this.state.loading
                        ?   <Preloader type={'BODY'} />
                        :   <Wrap>
                            <PageHeader title={'All Activities'}>
                                <div className="sf-input-inputcontrol sf-flex-1 sf-m-p-r">
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
                                                return  <li onClick={ (e) => this.updatedFilter(e, c.text) } key={c.text}>
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
                            {
                                this.state.filtered.map((review) =>
                                    <ItemCard key={KEY()} item={review} />
                                )
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

export default connect(mapStateToProps)(IntegReviews);