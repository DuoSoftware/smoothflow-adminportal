import React, { component } from 'react';
import './dialog.scss';
import {Block, Button, Preloader} from "..";
import {connect} from "react-redux";
import {InitPublishPRIVATE, PreloadBody, PreloadDialog} from "../../../_base/actions";

const Dialog = (props) => {
    return  <div className={`sf-dialog sf-flexbox-column ${ props.type === 'GUIDE' ? 'sf-dialog-guide' : null }`} {...props}>
                <div className="sf-dialog-body sf-custom-scroll">
                    {
                        props.uihelper._preload_dialog_
                        ?   <Preloader type={'BODY'}/>
                        :   <div>
                                { props.children }
                            </div>
                    }
                </div>
            </div>
};

const mapStateToProps = state => ({
    uihelper: state.uihelper
});
const PageHederToExport = connect(mapStateToProps) (Dialog);

export { PageHederToExport as Dialog }