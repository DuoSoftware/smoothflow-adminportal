import React, { Component } from 'react'
import { connect } from 'react-redux'
import './pageheader.scss'
import { createHashHistory  } from 'history'
import Wrap from "../../../_base/_wrap";
import {Button} from "..";
import Redirect from "../../../_base/_auth.redirect";

const PageHeader = (props) => {
    const goBack = () => {
        <Redirect to={props.uihelper._go_back}/>
    };

    return (
        <div className="sf-page-header">
            <div className="sf-flex-1">
                <div className="sf-page-header-title">
                    {/*<Button className="sf-button sf-button-clear sf-button-circle" style={{marginRight: '5px'}} onClick={ goBack.bind() }><i className="material-icons" style={ {fontSize: '20px',height: '20px',width: '20px'} }>arrow_back_ios</i></Button>*/}
                    <div className="sf-page-header-title-prefix">{ props.user.username.substring(0,2) }</div>
                    <h2>{ props.title }</h2>
                </div>
                <div className="sf-page-header-subtitle">{ props.subtitle }</div>
            </div>
            <Wrap>
                { props.children }
            </Wrap>
        </div>
    )
};

const history = createHashHistory();
const mapStateToProps = state => ({
    user: state.user,
    uihelper: state.uihelper
});
const PageHederToExport = connect(mapStateToProps) (PageHeader);
export { PageHederToExport as PageHeader};