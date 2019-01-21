import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch  } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import ReduxToastr from 'react-redux-toastr'
import {UIHelper, UserService} from "./_base/services";
import Sidenav from './sidenav/sidenav.component';
import Topbar from './topbar/topbar.component';
import Home from './body/home.container';
import ItemView from './body/itemview.container';
import Reviews from './body/reviews.container';
import PrivateRoute from './_base/_private.route';
import URLs from "./_base/_urls";
import {User, PreloadShell, SignIn} from './_base/actions';
import {MyReviews} from "./_base/actions/reviews.actions";

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
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Topbar/>
                    <div className="sf-body-container">
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
    user: state.user
});

export default connect(mapStateToProps) (App);
