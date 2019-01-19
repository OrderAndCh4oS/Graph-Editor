import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import SeedNode from '../graph/seed-node';
import EquationNode from '../graph/equation-node';
import { Scrollbars } from 'react-custom-scrollbars';

export default class GraphEditor extends Component {
    state = {
        nodes: {},
        nodePanels: [],
    };

    createNode = () => {
        const node = {};
        this.setState(prevState => ({
            nodePanels: [
                ...prevState.nodePanels,
                (key) => <EditNodePanel
                    key={key} node={node} saveNode={this.saveNode}
                />,
            ],
        }));
    };

    saveNode = (nodeData) => {
        const node = nodeData.equn
            ? new EquationNode(nodeData)
            : new SeedNode(nodeData);
        this.setState(prevState => ({
            nodes: {
                ...prevState.nodes,
                [node.id]: node,
            },
        }));
    };

    render() {
        const {buildGraph} = this.props;
        return (
            <Scrollbars style={{height: 500}}>
                <div className={'graph-editor'}>
                    {this.state.nodePanels.map((p, i) => p(i))}
                    <button onClick={this.createNode}>Add Node</button>
                </div>
                <button onClick={() => buildGraph(this.state.nodes)}>Build
                                                                     Graph
                </button>
            </Scrollbars>
        );
    }
}
