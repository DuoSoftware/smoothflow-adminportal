import React, { Component } from 'react';
import './preloader.scss';

class Preloader extends Component {
    getPreloaderBody = (type) => {
        switch (type) {
            case 'SHELL:SIDENAV' :
                return (
                    <div className="sf-preloader-sidenav">
                        <div className="elem-1"></div>
                        <div className="elem-2">
                            <div className="elem-2_">
                                <span className="elem-2__"></span>
                                <div className="elem-2__"></div>
                            </div>
                            <div className="elem-2_">
                                <span className="elem-2__"></span>
                                <div className="elem-2__"></div>
                            </div>
                        </div>
                        <div className="elem-3">
                            <div className="elem-3_"></div>
                            <div className="elem-3_"></div>
                            <div className="elem-3_"></div>
                            <div className="elem-3_"></div>
                            <div className="elem-3_"></div>
                        </div>
                    </div>
                )

            case 'SHELL:TOPBAR' :
                return (
                    <div className="sf-preloader-topbar">
                        <span className="elem-1_"></span>
                        <span className="elem-1_"></span>
                        <span className="elem-1_"></span>
                        <span className="elem-2_"></span>
                    </div>
                )

            case 'BODY' : 
                return (
                    <span className="sf-preloader-outer">
                        <span className="sf-preloader-inner"></span>
                    </span>
                )
            
            default : return
        }
    }
    render() {
        return (
            <div className="sf-preloader">
                {
                    this.getPreloaderBody(this.props.type)
                }
            </div>
        )
    }
}

export { Preloader }