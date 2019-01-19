import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import { Scrollbars } from 'react-custom-scrollbars';
import SeedNode from '../graph/seed-node';
import EquationNode from '../graph/equation-node';

export default class GraphEditor extends Component {
    state = {
        nodes: {},
        nodePanels: [],
    };

    addSeedNode = () => {
        const node = new SeedNode();
        // Todo: use UUIDs for this
        // Todo: Could probably manage removal with the key attribute
        const uid = Math.random().toString() + Math.random().toString();
        this.setState(prevState => ({
            nodes: {
                ...prevState.nodes,
                [uid]: node,
            },
            nodePanels: [
                ...prevState.nodePanels,
                <EditNodePanel
                    key={uid} uid={uid} node={node} updateNode={this.updateNode}
                />,
            ],
        }));
    };

    addEquationNode = () => {
        const node = new EquationNode();
        const uid = Math.random().toString() + Math.random().toString();
        this.setState(prevState => ({
            nodes: {
                ...prevState.nodes,
                [uid]: node,
            },
            nodePanels: [
                ...prevState.nodePanels,
                <EditNodePanel
                    key={uid} uid={uid} node={node} updateNode={this.updateNode}
                />,
            ],
        }));
    };

    updateNode = (uid, key, value) => {
        const node = this.state.nodes[uid];
        node[key] = value;
        this.setState(prevState => ({
            nodes: {
                ...prevState.nodes,
                [uid]: node,
            },
        }));
    };

    render() {
        const {buildGraph} = this.props;
        return (
            <Scrollbars style={{height: 500}}>
                <div className={'graph-editor'}>
                    {this.state.nodePanels.map(panel => panel)}
                    <button onClick={this.addSeedNode}>
                        Add Seed Node
                    </button>
                    <button onClick={this.addEquationNode}>
                        Add Equation Node
                    </button>
                    <button onClick={() => buildGraph(this.state.nodes)}>Build
                                                                         Graph
                    </button>
                </div>
            </Scrollbars>

        );
    }
}
