import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ConnectionView from './connection-view';

class ConnectionList extends Component {

    displayConnections() {
        const {graph, updateNodeValue} = this.props;
        return graph.edges.map(source =>
            source.edges.map(
                destination =>
                    <ConnectionView
                        key={source.node.id + '->' + destination.id}
                        source={source.node}
                        destination={destination}
                        updateNode={updateNodeValue}
                    />,
            ),
        );
    }

    render() {
        return (
            <Scrollbars style={{height: 500}}>
                <div className={'connection-view'}>
                    {this.displayConnections()}
                </div>
            </Scrollbars>
        );
    }
}

export default ConnectionList;
