import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch  } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import ReduxToastr from 'react-redux-toastr'
import {KEY, UIHelper, UserService} from "./_base/services";
import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import ItemView from './body/itemview.container';
import Reviews from './body/reviews.container';
import PrivateRoute from './_base/_private.route';
import URLs from "./_base/_urls";
import {User, PreloadShell, SignIn, Tokens, InjectNotification} from './_base/actions';
import {MyReviews} from "./_base/actions/reviews.actions";
import IoTClient from './core/lib/iot-client';
import AWS from 'aws-sdk'
import config from './config'
import { CognitoUserPool, CookieStorage } from 'amazon-cognito-identity-js'
import {Preloader, Notification} from "./components/common";
import {Message} from "./components/common/Message/message";


class App extends Component {
    constructor(props) {
        super(props)
    };
    componentDidMount() {
        const _token = localStorage.getItem('satellizer_token');
        if(_token) {
            this.props.dispatch(SignIn(true));
            this.props.dispatch(PreloadShell(true));
            UserService.getUserProfile()
                .then(profile => {
                    if(profile.data.IsSuccess){
                        const _tokenParsed = UIHelper.parseJWT(localStorage.getItem('satellizer_token'));
                        const company = _tokenParsed.companyName;
                        const host = 'dev.smoothflow.io';//window.location.host;
                        UserService.getUserSettings(URLs.auth.getUserSettings(host, company))
                            .then((settings) => {
                                profile.data.Result.settings = settings.data.Result;
                                this.props.dispatch(PreloadShell(false));
                                this.props.dispatch(User(profile.data.Result));
                            })
                            .catch(_errorRes => {
                                console.log(_errorRes)
                                this.props.dispatch(PreloadShell(false));
                                this.props.dispatch(User(profile.data.Result));
                            });
                    }
                })
                .catch(errorRes => {
                    console.log(errorRes)
                    this.props.dispatch(PreloadShell(false));
                });
        }

        /* AWS - IoT
        ================================================================== */
        const tokens = AWS.config.credentials;
        const _self = this;

        // cognito-idp.us-east-1.amazonaws.com/us-east-1_J98Pa2dIT
        function attachPrincipalPolicy(policyName, principal) {
            new AWS.Iot().attachPrincipalPolicy({ policyName: policyName, principal: principal }, function (err, data) {
                if (err) {
                    console.error(err); // an error occurred
                }
            });
        }

        //Generate loginKey
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.awsCognitoUserPoolId,
            ClientId: config.cognito.awsCognitoUserPoolAppClientId,
            Storage: new CookieStorage({
                secure: false,
                domain: "localhost"
            })
        });
        function getLoginKey() {
            debugger
            const session = null;
            if(userPool) {
                const currentUser = userPool.getCurrentUser();
                if(currentUser) {
                    return currentUser.getSession(function(err, session) {
                        return session.getIdToken().getJwtToken();
                    });
                }
            }
        }

        let login = {};
        AWS.config.region = config.awsRegion;

        const session = getLoginKey();
        debugger
        const loginKey = `cognito-idp.${config.awsRegion}.amazonaws.com/${config.cognito.awsCognitoUserPoolId}`;
        login[loginKey] = session;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.cognito.awsCognitoIdentityPoolId,
            Logins: login
        });
        debugger

        AWS.config.credentials.refresh((error) => {
            if (error) {
                console.error(error);
            } else {
                attachPrincipalPolicy("Server", AWS.config.credentials.identityId);
                // debugger
                let options = {
                    accessKeyId: AWS.config.credentials.accessKeyId,
                    secretKey: AWS.config.credentials.secretAccessKey,
                    sessionToken: AWS.config.credentials.sessionToken
                };
                _self.props.dispatch(Tokens(options));
                // debugger;
                let iotClient = new IoTClient(options);

                // Globally exposing the connection to use inside the entire app
                // this.props.dispatch(OpenGlobalNotifConnection(iotClient));

                // Retrieve global connection
                // const gIotClient = this.props.notifications.global_notif_connection;

                iotClient.onConnect(function () {
                    debugger;
                    console.log('connected.');
                    iotClient.subscribe('forms/5c33520cd07f814355190371');
                    // iotClient.publish('other/bina', "{'message':'Formss'}");
                });
                iotClient.onConnectionError(function () {
                    // debugger;
                });
                iotClient.onMessageReceived(function(topic, message) {
                    debugger
                    console.log(topic, message);
                    _self.props.dispatch(InjectNotification(message));
                });
                /* --------------------------------------------------------------- */
            }
        });
        /* -------------------------------------------------------------- */
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Topbar/>
                    <div className="sf-body-container">
                        <div className={`sf-notifications ${this.props.notifications.notifications_open ? 'sf-notifications-opened' : ''}`}>
                            {
                                this.props.notifications.notifications_open
                                    ?   this.props.uihelper._preload_notif_
                                    ?   <Preloader type={'BODY'} />
                                    :   this.props.notifications.notifications.length
                                        ?   this.props.notifications.notifications.map(task =>
                                            <Notification key={KEY()} item={task}/>
                                        )
                                        :   <Message>No notification has been found</Message>
                                    :   null
                            }
                        </div>
                        <Sidenav/>
                        <Route render={({ location }) => (
                            <div className="sf-body sf-custom-scroll">
                                <TransitionGroup>
                                    <CSSTransition
                                        key={location.key}
                                        timeout={300}
                                        classNames='sf-fade'>
                                        <Switch location={location}>
                                            <Route exact path="/" component={Home} />
                                            <Route exact path="/user/all_reviews" component={Reviews} />
                                            <Route path="/user/activity/:id" component={ItemView} />
\                                            <PrivateRoute exact path="/user/reviews" is_logged_in={this.props.user.is_logged_in} component={MyReviews} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            </div>
                        )}/>
                    </div>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        closeOnToastrClick/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper,
    notifications: state.notifications
});

export default connect(mapStateToProps) (App);
