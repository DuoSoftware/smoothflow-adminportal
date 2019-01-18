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
        localStorage.setItem('satellizer_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrYXN1bi53QGR1b3NvZnR3YXJlLmNvbSIsImp0aSI6IjJjNDc5ZTk1LWRmMzYtNDM1OS04ZTIyLWY4YTQzYTYxNTY3OSIsInN1YiI6IkFjY2VzcyBjbGllbnQiLCJleHAiOjE1NDgzOTIwNTUsInRlbmFudCI6MSwiY29tcGFueSI6NDEsImNvbXBhbnlOYW1lIjoia2FzdW4iLCJjb250ZXh0Ijp7fSwic2NvcGUiOlt7InJlc291cmNlIjoibXlOYXZpZ2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJteVVzZXJQcm9maWxlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJhdHRyaWJ1dGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiZ3JvdXAiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2V0YXNrYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InRhc2siLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicHJvZHVjdGl2aXR5IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6IlNoYXJlZCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YXNraW5mbyIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJhcmRzcmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3JlcXVlc3QiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdG1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicXVldWUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoicmVxdWVzdHNlcnZlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJzaXB1c2VyIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlclByb2ZpbGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoib3JnYW5pc2F0aW9uIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJwYWNrYWdlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJjb25zb2xlIiwiYWN0aW9ucyI6WyJyZWFkIl19LHsicmVzb3VyY2UiOiJ1c2VyU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InVzZXJBcHBNZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudCIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJjbGllbnRTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ3YWxsZXQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfV0sImlhdCI6MTU0Nzc4NzI1NX0.9W-j6px2MP2dB3bjQpLiIspgtP_UGCPSXRWcbvNBWMQ');
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
                    userctrl: {
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
            <div className="sf-topbar">
                <Block style={{padding: '10px 15px'}}>
                    <div className="sf-flexbox-row">
                        <div className="sf-logo sf-flex-1">
                            <div className="sf-flexbox-row">
                                <Link to={'/'}>
                                    <img src="https://dev.smoothflow.io/images/logo-smoothflow-beta-purple.svg" alt="Smoothflow Marketplace"/> <span className="sf-logo-subtext">Admin Portal</span>
                                </Link>
                            </div>
                        </div>
                        <div className="sf-flexbox-row sf-flex-center" style={{position: 'relative'}}>
                            {
                                this.props.uihelper._preload_shell_
                                ?   <Preloader type={'SHELL:TOPBAR'} />
                                :   <Wrap>
                                        {
                                            this.props.user.is_logged_in
                                            ?   <Wrap>
                                                    <span>{ this.props.user.username }</span>
                                                    <Button
                                                        className="sf-button sf-button-clear sf-button-circle"
                                                        onClick={this.toggleUserCtrlPanel.bind(null, 'TOGGLE')}><span
                                                        className={`sf-icon icon-sf_ico_${this.state.userctrl.togglePanel ? 'chevron_up' : 'chevron_down'}`}></span>
                                                    </Button>
                                                    <Dropdown toggle={this.state.userctrl.togglePanel} openPos={50} closedPos={50} height={'auto'}>
                                                        <List>
                                                            {/*<li onClick={ (e)=>this.toggleUserCtrlPanel(e, 'MYPROFILE')}>*/}
                                                                {/*<Textbox icon={'home'}>My Profile</Textbox>*/}
                                                            {/*</li>*/}
                                                            {/*<li>*/}
                                                                {/*<hr style={{opacity: 0.2}}/>*/}
                                                            {/*</li>*/}
                                                            <li onClick={ this.toggleUserCtrlPanel.bind(null, 'LOGOUT')}>
                                                                <Textbox icon={'home'}>Log out</Textbox>
                                                            </li>
                                                        </List>
                                                    </Dropdown>
                                                </Wrap>
                                            :   <div>
                                                    <Button
                                                        className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"
                                                        style={{'marginRight':'10px'}}
                                                        onClick={()=> this.localSignIn()}
                                                    >Sign In</Button>
                                                    {/*<Button*/}
                                                        {/*className="sf-button sf-button-secondary sf-button-small sf-button-clear sf-button-caps"*/}
                                                        {/*onClick={()=> this.signUp()}*/}
                                                    {/*>Sign Up</Button>*/}
                                                </div>
                                        }
                                    </Wrap>
                            }
                        </div>
                    </div>
                </Block>
            </div>
        );
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});

export default connect(mapStateToProps) (Topbar);
