import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './accordion.scss';

class AccordionItem extends Component {
    static propTypes = {
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'TITLE'
    };

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.mounted = true;
    }

    handleDocumentClick = event => {
        if (
            this.mounted &&
            !ReactDOM.findDOMNode(this).contains(event.target) &&
            this.state.isOpen
        ) {
            this.setState({ isOpen: false });
        }
    };

    componentDidMount() {
        if (this.props.atomic) {
            document.addEventListener('click', this.handleDocumentClick, false);
            document.addEventListener('touchend', this.handleDocumentClick, false);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener('click', this.handleDocumentClick, false);
        document.removeEventListener('touchend', this.handleDocumentClick, false);
    }

    onClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        const accordionItemClassNames = classNames([
            'sf-accordion-item',
            {
                active: this.state.isOpen
            }
        ]);

        return (
            <div className={accordionItemClassNames}>
                <button className="sf-accordion-title" onClick={this.onClick}>
                    <span className="sf-accordion-index">{ this.props.index }</span>{ this.props.title }
                </button>
                <div className="sf-accordion-panel">{ this.props.children }</div>
            </div>
        );
    }
}

export default AccordionItem;
