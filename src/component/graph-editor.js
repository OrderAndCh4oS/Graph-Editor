import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import SeedNode from '../graph/seed-node';

export default class GraphEditor extends Component {
    state = {
        graph: {},
        nodePanels: [],
    };

    createNode = () => {
        const node = {};
        this.setState(prevState => ({
            nodePanels: [
                ...prevState.nodePanels,
                <EditNodePanel node={node} saveNode={this.saveNode}/>,
            ],
        }));
    };

    saveNode = (nodeData) => {
        console.log(nodeData);
        const node = new SeedNode(
            nodeData.id,
            nodeData.value,
            nodeData.label,
            nodeData.title,
            nodeData.color,
            nodeData.conv,
            nodeData.prefix,
            nodeData.suffix,
            nodeData.min,
            nodeData.max,
            nodeData.step,
        );
        this.setState(prevState => ({
            graph: {
                ...prevState.graph,
                [node.id]: node,
            },
        }));
    };

    render() {
        return (
            <div className={'graph-editor'}>
                {this.state.nodePanels.map(p => p)}
                <button onClick={this.createNode}>Add Node</button>
            </div>
        );
    }
}
