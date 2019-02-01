import React from 'react'
import './notification.scss'
import {ActiveForm, LoadedForms, OpenTasks} from "../../../_base/actions";
import { connect } from 'react-redux';

const Notification = (props) => {
    return (
        <div className="sf-notification">
            <div className="sf-notification-prefix">
                <span>N</span>
            </div>
            <div className="sf-notification-body">
                <div className="sf-notification-title">{ props.item.task_name }</div>
                <div className="sf-notification-desc">
                    <p>{ props.item.description }</p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    form: state.form
});

const PageHederToExport = connect(mapStateToProps) (Notification);

export { PageHederToExport as Notification }