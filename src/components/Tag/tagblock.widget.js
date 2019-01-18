import React, { Component } from 'react';
import Tag from './tag.widget';
import './tag.scss'

class TagBlock extends Component {
    getItemTags(tags) {
        let _tags;
        _tags = tags.map((tag, index) =>
            <Tag key={'tagblk'+index} text={tag.name} />
        )
        return _tags;
    }

    render() {
        return (
            <div className="sf-tag-block">
                { this.getItemTags(this.props.tags) }
            </div>
        )
    }
}

export default TagBlock;