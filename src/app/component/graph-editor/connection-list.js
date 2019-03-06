import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import ConnectionView from './connection-view';
import cleanValue from '../../utility/clean-value';
import { debounce } from 'lodash';

class ConnectionList extends Component {

    updateNodeValue = debounce((uuid, value) => {
        const {graph} = this.props;

        const node = graph.getNodeByUuid(uuid);
        value = cleanValue(value);
        if(isNaN(value)) {
            return;
        }
        node.value = value === 0 ? 0 : value / node.conv;
        if(!isNaN(node.value)) {
            graph.calculateEquations();
        }

        this.props.updateData(graph);
    }, 180);

    displayConnections() {
        const {graph} = this.props;
        return graph.edges.map(source =>
            source.edges.map(
                destination =>
                    <ConnectionView
                        key={source.node.id + '->' + destination.id}
                        source={source.node}
                        destination={destination}
                        updateNode={this.updateNodeValue}
                    />,
            ),
        );
    }

    render() {
        return (
            <Scrollbars style={{height: 500}} className={'panel'}>
                <div className={'connection-view'}>
                    {this.displayConnections()}
                </div>
            </Scrollbars>
        );
    }
}

export default ConnectionList;
