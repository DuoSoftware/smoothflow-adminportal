import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './_base/reducers';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import URLs from './_base/_urls';
import {UIHelper} from "./_base/services";
import Amplify from 'aws-amplify/lib/index'
import ampconfig from './core/lib/AWS_COG_CONFIG_COMMON__';
import ampconfigprod from './core/lib/AWS_COG_CONFIG_COMMON__PROD';

let _w, _t, _p = null;
const store = createStore(rootReducer);
const _scopes = localStorage.getItem('scopes');
let awsc = null;

if (_scopes) {
    _w = UIHelper.parseJWT(_scopes).tenant;
    _p = UIHelper.parseJWT(_scopes).company;
}
if (window.location.hostname == "localhost" ||
    window.location.hostname == "dev.smoothflow.io" ||
    window.location.hostname == "smoothflow-dev.s3-website-us-east-1.amazonaws.com" ||
    window.location.hostname == "d35ie0dhlww2mo.cloudfront.net") {
    awsc = ampconfig;
} else if (window.location.hostname == "smoothflow.io" ||
    window.location.hostname == "prod.smoothflow.io" ||
    window.location.hostname == "d3ored5mvntnxi.cloudfront.net") {
    awsc = ampconfigprod;
}
// const awsweb_parsed = JSON.parse(ampconfig);
Amplify.configure(awsc);

function fetchSession() {
    return Amplify.Auth.currentSession();
}

// HTTP config ----------------------------------------------------//
fetchSession().then(function (value) {
    _t = value.idToken.jwtToken;
    axios.defaults.baseURL = URLs.base;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + _t;
    axios.defaults.headers.common['companyInfo'] = _w + ':' + _p;
    bootstrapApp();
}, function (reason) {
    bootstrapApp();
});

const bootstrapApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
}
// END - HTTP config ----------------------------------------------//
registerServiceWorker();
