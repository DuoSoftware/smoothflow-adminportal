import React, { Component } from 'react';
import './topbar.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { createHashHistory  } from 'history'
import {Block, Button, List, Preloader, Textbox} from '../components/common';
import { UIHelper} from "../_base/services";
import URLs from "../_base/_urls";
import Auth from '../_base/_auth.redirect';
import Wrap from "../_base/_wrap";
import {Dropdown} from "../components/common/Dropdown/dropdown.component";
import {OpenNotifications} from "../_base/actions";

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userctrl : {
                togglePanel: false
            }
        }
    };

    localSignIn = () => {
        // LOCAL dev authentication ---------------------------//
        localStorage.setItem('satellizer_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrYXN1bi53QGR1b3NvZnR3YXJlLmNvbSIsImp0aSI6IjVhOTQ3MmNmLWIwZmItNDllYi1iOTJmLTQ5MWE5Mjc3NGUxOCIsInN1YiI6IkFjY2VzcyBjbGllbnQiLCJleHAiOjE1NTE0MzM4ODcsInRlbmFudCI6MSwiY29tcGFueSI6NDEsImNvbXBhbnlOYW1lIjoia2FzdW4iLCJjb250ZXh0Ijp7fSwic2NvcGUiOlt7InJlc291cmNlIjoibXlOYXZpZ2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZ3JvdXAiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2V0YXNrYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2siLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicHJvZHVjdGl2aXR5IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6IlNoYXJlZCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YXNraW5mbyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3JlcXVlc3QiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicXVldWUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdHNlcnZlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzaXB1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ3YWxsZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTU1MDgyOTA4N30.6VRbwhS1c_wYTu9HG8X50d76221euSZnCm3Dbsc66ZQ');
        // END - LOCAL dev authentication ---------------------//
        return <Auth url={URLs.auth.signup} _rollback_point={window.location.href} />
    };
    signUp = () => {
        window.location.replace(URLs.auth.signup + '?r=' + window.location.href);
    };
    signIn = () => {
        window.location.replace(URLs.auth.signin + '?r=' + window.location.href);
    };

    toggleUserCtrlPanel = (task, e) => {
        switch (task) {
            case 'TOGGLE' :
                this.setState(state => ({
                    ...state,
                    userctrl : {
                        ...state.userctrl,
                        togglePanel : !this.state.userctrl.togglePanel
                    }
                }));
                break;

            case 'LOGOUT' :
                window.localStorage.removeItem('satellizer_token');
                window.location.replace(URLs.auth.signin);
                break;

            default :
                return;
        }
    };

    openNotifications = (e) => {
        debugger
        const isopen = this.props.notifications.notifications_open;
        if (isopen) {
            this.props.dispatch(OpenNotifications(false));
        } else {
            this.props.dispatch(OpenNotifications(true));

        }
    };

    // if ($rootScope.isNullOrEmptyOrUndefined($scope.dashboardData.settings.defaultImage)) {
    //     var image = $scope.profileImageOptions[1];
    //     delete image.$$hashKey;
    //     $rootScope.settings.defaultImage = image;
    //     $rootScope.SessionDetails.UserProfileImage = $scope.getUserImage($rootScope.SessionDetails.emails[0]);
    // } else {
    //     $rootScope.settings.defaultImage = $scope.dashboardData.settings.defaultImage;
    //     $rootScope.SessionDetails.UserProfileImage = $scope.getUserImage($rootScope.SessionDetails.emails[0]);
    //     console.log($rootScope.SessionDetails.UserProfileImage);
    // }

    render() {
        return (
            <div className="sf-tf-topbar">
                <div className="sf-tf-topbar-brand">
                    <div className="sf-tf-topbar-logo">
                        <img src="https://smoothflow.io/images/logo-smoothflow-beta-purple.svg" alt=""/> <span
                        className="sf-tf-topbar-logo-text">Admin Portal</span>
                    </div>
                </div>
                <div className="sf-topbar-btngrp-wrap">

                </div>
                <div className="sf-tf-topbar-tools">
                    {
                        this.props.uihelper._preload_shell_
                            ?   <Preloader type={'SHELL:TOPBAR'}/>
                            :   <Wrap>
                                {
                                    this.props.user.is_logged_in
                                        ?   <Wrap>
                                                <button className={`sf-tf-topbar-tool sf-button sf-button-circle${this.props.notifications.notifications_open ? ' sf-tf-topbar-tool-selected' : ''}`} onClick={ (e)=> this.openNotifications(e) }>
                                                    { this.props.notifications.notifications.length ? <span className="sf-notif-indecator"></span> : null }
                                                    <span className="sf-icon icon-sf_ico_notification"></span>
                                                </button>
                                                <div className="sf-tf-topbar-tool sf-topbar-textimg" onClick={this.toggleUserCtrlPanel.bind(null, 'TOGGLE')}>
                                                    <span>{ this.props.user.sesuser.given_name.split('')[0] }</span>
                                                </div>
                                            </Wrap>
                                        :   <div>
                                                <Button
                                                    className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"
                                                    style={{'marginRight': '10px'}}
                                                    onClick={(e) => this.localSignIn(e)}
                                                >Sign In</Button>
                                                <Button
                                                    className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"
                                                    onClick={(e) => this.signUp(e)}
                                                >Sign Up</Button>
                                            </div>
                                }
                            </Wrap>
                    }
                </div>
                {
                    this.props.user.is_logged_in
                        ?   <Dropdown toggle={this.state.userctrl.togglePanel} openPos={55} closedPos={40} height={'auto'}>
                            <List>
                                <li onClick={this.toggleUserCtrlPanel.bind(null, 'LOGOUT')}>
                                    <Textbox icon={'home'}>Log out</Textbox>
                                </li>
                            </List>
                        </Dropdown>
                        :   null
                }
            </div>
        );
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    user: state.user,
    notifications: state.notifications,
    uihelper: state.uihelper
});

export default connect(mapStateToProps) (Topbar);
