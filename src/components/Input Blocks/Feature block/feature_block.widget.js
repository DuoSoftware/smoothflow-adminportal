import React, { Component } from 'react';
import './feature_block.scss';
import TextblockI from '../../Text blocks/textblock_iconed.widget'

class FeatureBlock extends Component {
    state = {
        features : []
    };
    feature = {
        title: '',
        text: ''
    };
    addFeature = () => {
        let _fts = [...this.state.features];
        const _ft = {
            ...this.feature
        };
        _fts.push(_ft);
        this.setState({ features: _fts });
        this.feature = {
            title: '',
            text: ''
        };
        document.getElementById('featureTitle').value = "";
        document.getElementById('featureDesc').value = "";
        document.getElementById('featureTitle').focus();
    };
    createFeature(e) {
        e.target.id === 'featureTitle' ? this.feature.title = e.target.value : this.feature.text = e.target.value;
    };
    render() {
        return (
            <div>
                <div className="sf-features" style={ {'clear' : 'both'} }>
                    {
                        this.state.features.map((feature) =>
                            <div className="" style={ {'width' : '50%'} }>
                                <div className="sf-flex-1">
                                    <div className="sf-txtblock sf-txtblock-iconed">
                                        <div className="sf-txtblock-icon">
                                            <span className={`sf-icon icon-sf_ico_${ this.props.icon }`}></span>
                                        </div>
                                        <div className="sf-txtblock-text">
                                            <div className="sf-txtblock-txt-title">{ this.props.title }</div>
                                            <div className="sf-txtblock-txt-text">{ this.props.text }</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button className="sf-btn sf-btn-circle">X</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="sf-feature-block">
                    <div className="sf-feature-entry">
                        <div className="sf-input-block">
                            <input type="text" placeholder="Feature title" id="featureTitle" onChange={ (event) => this.createFeature(event) } />
                        </div>
                        <div className="sf-input-block">
                            <textarea placeholder="Feature description" id="featureDesc" cols="30" rows="2" onChange={ (event) => this.createFeature(event) } />
                        </div>
                    </div>
                    <div className="sf-feature-add">
                        <button type="button" className="sf-btn sf-btn-primary sf-btn-primary-light" onClick={ this.addFeature }>+</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeatureBlock;