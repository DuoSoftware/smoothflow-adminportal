import React, { Component } from 'react'
import { connect } from 'react-redux'
import './pageheader.scss'
import Wrap from "../../../_base/_wrap";

const PageHeader = (props) => {
    return (
        <div className="sf-page-header">
            <div className="sf-flex-1">
                <div className="sf-page-header-title">
                    <div className="sf-page-header-title-prefix">{ props.title.substring(0,2) }</div>
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

const mapStateToProps = state => ({
    user: state.user
});

const PageHederToExport = connect(mapStateToProps) (PageHeader);

export { PageHederToExport as PageHeader};