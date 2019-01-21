import React, { Component } from 'react';
import './sidenav.scss';
import { connect } from 'react-redux'
import {Block, Textbox, List, Button, Preloader} from "../components/common";
import { Link } from 'react-router-dom'
import Wrap from "../_base/_wrap";
import {KEY} from "../_base/services";
import {Dropdown} from "../components/common/Dropdown/dropdown.component";

class Sidenav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _sidenav : [{
                name: 'All reviews',
                icon: 'code',
                active: false
            }, {
                name: 'My Reviews',
                icon: 'code',
                active: false
            }],
            _create_dd: false
        };
    };

    componentDidMount() {
        this.initSidenav();
    };

    initSidenav() {
        let _nav_obj = {
            taps: {
                list: []
            },
            activities: {
                list: []
            },
            apps: {
                list: []
            }
        };
        for(const i of this.state._sidenav ) {
            if (i.category === 'tap') {
                _nav_obj.taps.list.push(i);
            }
            else if (i.category === 'activity') {
                _nav_obj.activities.list.push(i);
            }
            else if (i.category === 'app') {
                _nav_obj.apps.list.push(i);
            }
        }
        this.setState(prevState => ({
            ...prevState,
            _structuredList: _nav_obj
        }));
    };

    setActiveNav = (e, _name) => {
        const _state_nav = [...this.state._sidenav];
        for (const nav of _state_nav) {
            if (nav.name === _name) nav.active = true;
            else nav.active = false;
        };
        this.setState(state => ({
            ...state,
            _sidenav : _state_nav
        }));
    };

    render() {
        return (
            <div className="sf-sidenav sf-custom-scroll">
                {
                    this.props.uihelper._preload_shell_
                    ?   <Preloader type="SHELL:SIDENAV" />
                    :   <div>
                            {
                                this.props.user.is_logged_in
                                ?   <Wrap>
                                        <div className="sf-user-nav">
                                            {/*<Block></Block>*/}
                                            <List>
                                                <div className="sf-list-block">
                                                    <div className="sf-list-header">Reviews</div>
                                                    <div className="sf-list-body">
                                                        {
                                                            this.state._sidenav.map(nav => {
                                                                return  <li key={KEY()} className={nav.active ? 'sf-list-active' : null}>
                                                                    <Link to={'/user/' + nav.name}
                                                                          onClick={event => this.setActiveNav(event, nav.name)}
                                                                          id={`NAV_${nav.name.toUpperCase()}`}>
                                                                        <Textbox icon={nav.icon} size="17">
                                                                            <span>{nav.name}</span>
                                                                        </Textbox>
                                                                    </Link>
                                                                </li>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </List>
                                        </div>
                                    </Wrap>
                                :   null
                            }
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

export default connect(mapStateToProps)(Sidenav);