import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MyReviewsLoader, PreloadBody } from '../_base/actions'
import ItemCard from '../components/Itemcard/itemcard.widget';
import { BrowserRouter as Route, Link } from "react-router-dom";
import {Preloader, PageHeader, Button} from "../components/common";
import {KEY, ReviewsService} from "../_base/services";

class MyReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.getMyReviews();
    }

    // -------------------------------------------------------------------------------
    getMyReviews = () => {
        this.props.dispatch(PreloadBody(true));
        ReviewsService.getAllReviews()
            .then((res) => {
                if (typeof(res.data.Result) === "object" && res.data.Result.activities.length > 0) {
                    const loadedQueue = {
                        activities: [],
                        integrations: []
                    };
                    loadedQueue.activities = res.data.Result.activities.filter((activity, index) => {
                        if(activity.type === 'activity') {
                            return {
                                ...activity,
                                original: activity,
                                type: activity.type,
                                state: activity.state,
                                name: activity.activity_name,
                                image: activity.image,
                                description: activity.description,
                                features:
                                    activity.features.map((ft) => {
                                        return {
                                            title: ft.title,
                                            icon: 'check_circle',
                                            description: ft.description
                                        }
                                    }),
                                tags:
                                    activity.tags.map((tag) => {
                                        return {
                                            name: tag.tag
                                        }
                                    }),
                                what_you_get:
                                    activity.what_you_get.map((wyg) => {
                                        return {
                                            type: 'image',
                                            file: wyg.file
                                        }
                                    }),
                                pricings:
                                    activity.pricings.map((price) => {
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
                                    activity.faq.map((fq) => {
                                        return  {
                                            question: fq.question,
                                            answer: fq.answer
                                        }
                                    }),
                                variables:
                                    activity.variables.map((v) => {
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
                        }
                    });
                    loadedQueue.integrations = res.data.Result.activities.filter((activity, index) => {
                        if(activity.type === 'integration') {
                            return {
                                ...activity,
                                original: activity,
                                type: activity.type,
                                state: activity.state,
                                name: activity.activity_name,
                                image: activity.image,
                                description: activity.description,
                                features:
                                    activity.features.map((ft) => {
                                        return {
                                            title: ft.title,
                                            icon: 'check_circle',
                                            description: ft.description
                                        }
                                    }),
                                tags:
                                    activity.tags.map((tag) => {
                                        return {
                                            name: tag.tag
                                        }
                                    }),
                                what_you_get:
                                    activity.what_you_get.map((wyg) => {
                                        return {
                                            type: 'image',
                                            file: wyg.file
                                        }
                                    }),
                                pricings:
                                    activity.pricings.map((price) => {
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
                                    activity.faq.map((fq) => {
                                        return  {
                                            question: fq.question,
                                            answer: fq.answer
                                        }
                                    }),
                                variables:
                                    activity.variables.map((v) => {
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
                        }
                    });
                    this.props.dispatch(MyReviews(loadedQueue));
                    this.setState(state => ({
                        ...state,
                        filtered: [loadedQueue.activities, loadedQueue.integrations],
                        temp_filtered: [loadedQueue.activities, loadedQueue.integrations]
                    }));
                    this.props.dispatch(PreloadBody(false));
                } else {
                    this.props.dispatch(MyReviews([]));
                    this.props.dispatch(PreloadBody(false));
                }
            })
            .catch((errorRes) => {
                console.log(errorRes);
                this.props.dispatch(PreloadBody(false));
            });
    };

    // Search
    search = (e) => {
        const _filtered = this.state.temp_filtered.filter((activity) => {
            return activity.activity_name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.setState(state => ({
            ...state,
            filtered: _filtered
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
        let filtered = [];
        _filters.map((f) => {
            if(f.text === selected) {
                f.selected = true;
            }
            else{
                f.selected = false;
            }
        });
        if (selected === 'All') {
            filtered = this.props.user.myactivities;
        } else {
            filtered = this.props.user.myactivities.filter(activity =>
                activity.state === selected.toLowerCase()
            );
        }
        this.setState(prevState => ({
            ...prevState,
            filter: {
                toggleDropdown: false,
                categories: _filters
            },
            filtered: filtered,
            temp_filtered: filtered
        }));
    };

    render() {
        return (
            <div className="sf-route-content">
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'} />
                    :   <div>
                            <PageHeader title={'My Activities'}>
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
                                <Link to={'/user/activities/create'} className="sf-button-link">
                                    <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-raised">Create</Button>
                                </Link>
                            </PageHeader>
                            <div>
                                {
                                    !this.props.uihelper._preload_body_
                                    ?   this.state.filtered.map((activity) => {
                                            if(activity) return <ItemCard key={KEY()} item={activity} advanced={true} />
                                        })
                                    :   null
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps)(MyReviews);
