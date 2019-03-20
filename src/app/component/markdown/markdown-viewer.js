import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

export default class MarkdownViewer extends Component {
    render() {
        return (
            <div className={'markdown-viewer'}>
                <ReactMarkdown
                    source={this.props.markdown}
                />
            </div>
        );
    }
}
