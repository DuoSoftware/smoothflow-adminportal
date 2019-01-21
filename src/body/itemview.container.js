import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import TableTwoCol from '../components/Table - Two Col/table_two_col.widget';
import UMInfo from '../components/User Messages/UM - Info/info.user.message';
import { createHashHistory  } from 'history'
import TagBlock from '../components/Tag/tagblock.widget';
import Tab from '../components/Tab/tab.widget';
import Tabs from '../components/Tab/tabs.widget';
import TextBlockI from '../components/Text blocks/textblock_iconed.widget';
import Carousel from '../components/Carousel/carousel.widget';
import PriceBlock from "../components/Price block/priceblock.widget";
import Accordion from '../components/Accordion/accordion.widget';
import AccordionItem from '../components/Accordion/accordion_item.widget';
import {PageHeader, Block, Button, Preloader} from '../components/common';
import {Dialog} from "../components/common/Dialog/dialog.component";
import Input from "../components/Input/input.widget";
import Error from "../components/Error/error.widget";
import ListI from "../components/List/list_iconed.widget";
import Wrap from "../_base/_wrap";
import {toastr} from 'react-redux-toastr';
import {KEY} from "../_base/services";

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.self = this;
        this.state = {}
    };

    render() {
        if (!this.props.location.activity) {
            return <Redirect to={'/user/activities'} /> ;
        }
        return(
            <Wrap>
                {
                    this.props.uihelper._preload_body_
                    ?   <Preloader type={'BODY'}/>
                    :   <div className="sf-route-content">
                            <PageHeader title={this.props.location.activity.name}>
                                {
                                    this.props.location.activity.state === 'private'
                                        ?   <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-iconed" icon="cloud_upload" mat="true" style={{marginRight: '10px'}} onClick={ (e) => this.init_publish(e) }>Publish</Button>
                                        :   null
                                }
                                <Link
                                    to={{
                                        pathname: this.props.location.activity.type === 'activity' ? '/user/activities/create' : '/user/integrations/create',
                                        candidate: {...this.props.location.activity}
                                    }}>
                                    <Button className="sf-button sf-button-circle"><span className="sf-icon icon-sf_ico_edit"></span></Button>
                                </Link>
                                {
                                    this.props.location.activity.type === 'integration'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteInit.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   this.props.location.activity.type === 'activity' && this.props.location.activity.state === 'private'
                                    ?   <Button className="sf-button sf-button-circle" onClick={ this.deleteInit.bind() }><span className="sf-icon icon-sf_ico_delete"></span></Button>
                                    :   null
                                }
                            </PageHeader>
                            {
                                this.props.uihelper._init_publish
                                    ?   <div className="sf-dialog-backdrop">
                                            <Dialog title={'Publish'}>
                                                <Block>
                                                    <div className="sf-flexbox-row">
                                                        <h2 className="sf-flex-1">{ 'Publish Activity' }</h2>
                                                        <Button className="sf-button sf-button-clear" onClick={ this.closeDialog.bind() }>Cancel</Button>
                                                        <Button className="sf-button sf-button-primary sf-button-primary-p sf-button-caps" type="submit" onClick={ (e) => this.publishActivityPRIVATE(e) }> Publish </Button>
                                                    </div>
                                                    <div>
                                                        <div className="sf-flexbox-row">
                                                            <div className="sf-p-p-h" style={{'width':'150px'}}>
                                                                <label> Language </label>
                                                                <div className="sf-p-p-h">
                                                                    <div className="sf-input-block">
                                                                        <Input type="radio" name="publishLang" className="sf-radiobox" id="languageNode" label="Node JS" value="nodeJs" onChange={(event) => this.addInfo(event)} checked />
                                                                    </div>
                                                                    <div className="sf-input-block">
                                                                        <Input type="radio" name="publishLang" className="sf-radiobox" id="languageGo" label="GO" value="GO" onChange={(event) => this.addInfo(event)} disabled />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {
                                                                this.state.temp_selected_langs.node
                                                                    ?   <Wrap>
                                                                        <div className="sf-flex-1 sf-flexbox-column">
                                                                            <div className="sf-flex-1 sf-p-p sf-flexbox-column">
                                                                                <label> File </label>
                                                                                <div className="sf-card sf-card-block sf-flexbox-column sf-flex-1" style={{padding: '15px 0px'}}>
                                                                                    <div className="sf-card-content sf-card-bordered sf-flex-1 sf-flexbox-column">
                                                                                        <div className="sf-flex-1">
                                                                                            {
                                                                                                this.state.publish_content.node.file
                                                                                                    ?   <div className="sf-card">
                                                                                                        <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                                                            <div className="sf-flex-1">
                                                                                                                <ListI list={ this.state.publish_content.node.info }/>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    :   null
                                                                                            }
                                                                                        </div>
                                                                                        <input type="file" id="publishNode" onChange={ (event) => this.updatePublishContent(event)}/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Wrap>
                                                                    :   null
                                                            }
                                                        </div>
                                                        {
                                                            this.props.location.activity.variables.length === 0
                                                                ?   <div className="sf-flexbox-row sf-p-p-v">
                                                                    <div  style={{'width':'150px'}}></div>
                                                                    <div className="sf-feature-block sf-flex-1">
                                                                        <div className="sf-feature-entry">
                                                                            <div className="sf-flexbox-row">
                                                                                <div className="sf-flex-1 sf-guide-holder">
                                                                                    <div className="sf-input-block sf-flexbox-row" style={{marginBottom: '10px'}}>
                                                                                        <Input type="checkbox" id="varIsAdvanced" value={this.state.newActivity.advance} onChange={(event) => this.createVariable(event)}/>
                                                                                        <span>Advance</span> <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:ADVANCE') }>help</i>
                                                                                    </div>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:ADVANCE'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>This implies whether the Variable is an <b>Advanced</b> variable or a <b>Basic</b> variable.
                                                                                                        <p>If you create a Variable with this value selected, the Variable will not be visible on initial( Basic) variables list at the designer environment.</p>
                                                                                                    </Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-flex-1"></div>
                                                                            </div>
                                                                            <div className="sf-input-block sf-flexbox-row">
                                                                                <div className="sf-custom-input sf-flex-1">
                                                                                    <label className="sf-flexbox-row">Key <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:KEY') }>help</i></label>
                                                                                    <input type="text" id="varKey" onChange={ (event) => this.createVariable(event) } />
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:KEY'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>Variable Key</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-custom-input sf-flex-1">
                                                                                    <label className="sf-flexbox-row">Display Name <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DISPLAY_NAME') }>help</i></label>
                                                                                    <input type="text" id="varDisplayName" onChange={ (event) => this.createVariable(event) } />
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:DISPLAY_NAME'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>Display name of the Variable</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-input-block sf-flexbox-row">
                                                                                <div className="sf-flex-1 sf-custom-input sf-custom-select">
                                                                                    <label className="sf-flexbox-row">Control <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:CONTROL') }>help</i></label>
                                                                                    <select name="varPriority" id="varControls" defaultValue={'_'} onChange={(event) => this.createVariable(event)} value={ !this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api ? 'Textbox' : this.state.newActivity.control }>
                                                                                        {/*<option value="_" disabled>Control</option>*/}
                                                                                        <option value="Textbox">Textbox</option>
                                                                                        <option value="Dropdown">Dropdown</option>
                                                                                        <option value="APIControl">API Control</option>
                                                                                    </select>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:CONTROL'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>This implies the behaviour of the variable when it is in use. If <b>Textbox</b> is selected, a text field will be displayed as the input component. <b>Dropdown</b> will display as a dropdown with multiple choices.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-custom-input sf-flex-1">
                                                                                    <label className="sf-flexbox-row">{ this.state.temp_variable.is_val_api ? 'API Method' : 'Value' } <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:API_METHOD') }>help</i></label>
                                                                                    <input className="sf-flex-1" type="text" id="varValue" disabled={ this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api } onChange={ (event) => this.createVariable(event) } />
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:API_METHOD'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>{
                                                                                                        this.state.temp_variable.is_val_api
                                                                                                            ?   <span>Add the URL for the API here.</span>
                                                                                                            :   <span><b>Textbox</b> value to access text input.</span>
                                                                                                    }</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                this.state.temp_variable.is_val_dropdown && !this.state.temp_variable.is_val_api
                                                                                ?   <div className="sf-input-block sf-flexbox-row" style={{alignItems: 'flex-end', margin: '20px 0'}}>
                                                                                    <div className="sf-flex-1">
                                                                                        <div className="sf-fill-width">
                                                                                            <label className="sf-flexbox-row">Value List <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:VALUE_LIST') }>help</i></label>
                                                                                            <div className="sf-clearfix">
                                                                                                {
                                                                                                    this.state.temp_variable.temp_variable_vals.map((keyval, index) =>
                                                                                                        <div className="sf-card" key={KEY()}>
                                                                                                            <div className="sf-card-content sf-card-bordered sf-card-centered-row">
                                                                                                                <div className="sf-flex-1" style={{'paddingRight': '15px'}}>
                                                                                                                    <div className="sf-txtblock-text">
                                                                                                                        <div className="sf-txtblock-txt-title"><span className="sf-text-semibold">Key : </span>{keyval.key}</div>
                                                                                                                        <div className="sf-txtblock-txt-title"><span className="sf-text-semibold">Value : </span>{keyval.value}</div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="sf-card-row-end">
                                                                                                                    <button type="button" className="sf-button sf-button-primary-light sf-button-primary sf-button-circle" id="removeVarKeyVal" onClick={(event) => this.createVariable(event, index)}>x</button>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )
                                                                                                }
                                                                                            </div>
                                                                                            {
                                                                                                this.props.uihelper._init_help && this.state.active_guide === 'VAR:VALUE_LIST'
                                                                                                    ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                        <div className="sf-dg-header">
                                                                                                            <h3>What to do here?</h3>
                                                                                                            <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                        </div>
                                                                                                        <div>
                                                                                                            <Block>You can add the values here that come under the type(Dropdown) you selected in Control section.</Block>
                                                                                                        </div>
                                                                                                    </Dialog>
                                                                                                    :   null
                                                                                            }
                                                                                            <div className="sf-feature-block">
                                                                                                <div className="sf-feature-entry">
                                                                                                    <div className="sf-input-block sf-flexbox-row">
                                                                                                        <input type="text" placeholder="Key" id="varValListKey" onChange={(event) => this.var_key_val.key = event.target.value} />
                                                                                                        <input type="text" placeholder="Value" id="varValListValue" onChange={(event) => this.var_key_val.value = event.target.value} />
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="sf-feature-add">
                                                                                                    <button type="button" id="addVarKeyVal" className="sf-button sf-button-primary sf-button-primary-light" onClick={(event) => this.createVariable(event)}>+</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                :   null
                                                                            }
                                                                            <div className="sf-flexbox-row">
                                                                                <div className="sf-custom-input sf-flex-1">
                                                                                    <label className="sf-flexbox-row">Default <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DEFAULT') }>help</i></label>
                                                                                    <input className="sf-flex-1" type="text" placeholder="Group" value="Default" id="varGroup" onChange={ (event) => this.createVariable(event) } style={ {marginBottom: '10px'} }/>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:DEFAULT'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>This implies whether the Variable is an <b>Advanced</b> variable or a <b>Basic</b> variable.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                    <label className="sf-flexbox-row">Type <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:TYPE') }>help</i></label>
                                                                                    <select name="varType" id="varType" value={!this.state.temp_variable.is_val_dropdown ? 'hardcoded' : ''} onChange={(event) => this.createVariable(event)}>
                                                                                        {/*<option value="_" disabled>Type</option>*/}
                                                                                        <option value="dynamic">Dynamic</option>
                                                                                        <option value="hardcoded">Hardcoded</option>
                                                                                    </select>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:TYPE'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>This implies whether the value is hardcoded or not. This will be vary depending on the <b>Control</b> type you select.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-flexbox-row">
                                                                                <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                    <label className="sf-flexbox-row">Category <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:CATEGORY') }>help</i></label>
                                                                                    <select name="varCategory" id="varCategory" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                        {/*<option value="_" disabled>Category</option>*/}
                                                                                        <option value="InArgument">In Argument</option>
                                                                                        <option value="OutArgument">Out Argument</option>
                                                                                    </select>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:CATEGORY'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>This implies whether the variable works as an IN argument or an OUT argument.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                    <label className="sf-flexbox-row">Data type <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:DATA_TYPE') }>help</i></label>
                                                                                    <select name="varDataTYpe" id="varDataType" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                        {/*<option value="_" disabled>Data Type</option>*/}
                                                                                        <option value="string">String</option>
                                                                                        <option value="int">Int</option>
                                                                                    </select>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:DATA_TYPE'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>Data type of the variable.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="sf-flexbox-row">
                                                                                <div className="sf-input-block sf-flex-1 sf-custom-input sf-custom-select">
                                                                                    <label className="sf-flexbox-row">Priority <i className="material-icons sf-icon-guide" onClick={ (e) => this.initHelp(e, 'VAR:PRIORITY') }>help</i></label>
                                                                                    <select name="varPriority" id="varPriority" defaultValue={'_'} onChange={(event) => this.createVariable(event)}>
                                                                                        {/*<option value="_" disabled>Priority</option>*/}
                                                                                        <option value="Mandatory">Mandatory</option>
                                                                                        <option value="NotMandatory">Not Mandatory</option>
                                                                                    </select>
                                                                                    {
                                                                                        this.props.uihelper._init_help && this.state.active_guide === 'VAR:PRIORITY'
                                                                                            ?   <Dialog type={'GUIDE'} title="publish">
                                                                                                <div className="sf-dg-header">
                                                                                                    <h3>What to do here?</h3>
                                                                                                    <i className="material-icons sf-dg-header-close" onClick={ this.closeHelp.bind() }>close</i>
                                                                                                </div>
                                                                                                <div>
                                                                                                    <Block>Whether the variable is mandatory or not.</Block>
                                                                                                </div>
                                                                                            </Dialog>
                                                                                            :   null
                                                                                    }
                                                                                </div>
                                                                                <div className="sf-spacer-p"></div>
                                                                                <div className="sf-input-block sf-flex-1"></div>
                                                                            </div>
                                                                            <div className="sf-flexbox-row">
                                                                                <div className="sf-flex-1"></div>
                                                                                <button type="button" className="sf-button sf-button-primary sf-button-primary-p" onClick={ this.addVariable }>ADD</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                :   null
                                                        }
                                                    </div>
                                                </Block>
                                            </Dialog>
                                        </div>
                                    :   null
                            }
                            <div className="sf-flexbox-row">
                                <div className="sf-flex-1">
                                    <div className="sf-header-bordered">
                                        <h3 className="sf-txt-c-p">{ this.props.location.activity.name }</h3>
                                    </div>
                                    <div className="sf-text-sub">
                                        <p>{ this.props.location.activity.description }</p>
                                    </div>
                                    {/*<div style={ {'maxWidth':'400px'} }>*/}
                                        {/*<TableTwoCol tabledata={ this.props.location.activity.pricings } />*/}
                                    {/*</div>*/}
                                    <div className="sf-p-p-h">
                                        {/* <UMInfo text="Free for customers viewing and creating tickets" /> */}
                                    </div>
                                    <div className="sf-flexbox-row" style={{alignItems: 'center'}}>
                                        {
                                            // this.props.location.advanced
                                            //     ?   <Block className="sf-flex-1">
                                            //         <button className="sf-button sf-button-primary sf-button-primary-p sf-button-block">30 Days Trial</button>
                                            //     </Block>
                                            //     :   null
                                        }
                                        <div>
                                            <TagBlock tags={ this.props.location.activity.tags } />
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-flex-1 sf-flex-center sf-m-p sf-shadow-box sf-border-radius" style={{display: 'flex'}}>
                                    <img src={this.props.location.activity.image} alt="" style={{maxWidth: '300px'}}/>
                                </div>
                            </div>
                            <div className="sf-hr"></div>

                            {
                                this.props.location.advanced
                                    ?   <div>
                                        <Tabs>
                                            <Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Features'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    { this.getFeatures( this.props.location.activity.features) }
                                                </div>
                                            </Tab>
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'What you get'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    <Carousel slides={ this.props.location.activity.what_you_get } />
                                                </div>
                                            </Tab>
                                            {/*<Tab iconClassName={'icon-class-0'} linkClassName={'link-class-0'} title={'Pricing'}>*/}
                                                {/*<div className="sf-p-ex sf-auto-fix">*/}
                                                    {/*<div style={ {'display' : 'flex','justify-content' : 'center'}}>*/}
                                                        {/*{ this.getPricing( this.props.location.activity.pricings ) }*/}
                                                    {/*</div>*/}
                                                {/*</div>*/}
                                            {/*</Tab>*/}
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'FAQ'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    <Accordion atomic={true}>
                                                        { this.getFAQ(this.props.location.activity.faq) }
                                                    </Accordion>
                                                </div>
                                            </Tab>
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Developer'}>
                                                <div className="sf-p-ex sf-auto-fix">

                                                </div>
                                            </Tab>
                                            <Tab iconClassName={'icon-class-1'} linkClassName={'link-class-1'} title={'Reviews'}>
                                                <div className="sf-p-ex sf-auto-fix">
                                                    {
                                                        this.props.location.activity.reviews.map(review => {
                                                            <div className="sf-block">
                                                                <h4>{ review.reviewer }</h4>
                                                                <p>{ review.comment }</p>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                    :   null
                            }
                        </div>
                }
            </Wrap>
        )
    }
}

const history = createHashHistory();
const mapStateToProps = state => ({
    uihelper : state.uihelper,
    user : state.user
});

export default connect(mapStateToProps)(ItemView);