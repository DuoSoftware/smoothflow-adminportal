import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PageHeader } from "../components/common";
import {ComingSoon} from "../components/common/ComingSoon/coming.soon.component";

class Reviews extends Component {
    componentDidMount () {

    }

    getActivityComments

    render() {
        return (
            <div className="sf-route-content">
                <PageHeader title={'Reviews'}></PageHeader>
                <ComingSoon/>
            </div>
        )
    }
}

const mapStateToProps = (state => ({
    uihelper : state.uihelper
}));

export default connect(mapStateToProps)(Reviews);