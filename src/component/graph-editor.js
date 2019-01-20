import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import { Scrollbars } from 'react-custom-scrollbars';
import SeedNode from '../graph/seed-node';
import EquationNode from '../graph/equation-node';

export default class GraphEditor extends Component {
    state = {
        nodePanels: [],
    };

    addSeedNode = () => {
        // Todo: use UUIDs for this
        const uuid = Math.random().toString();
        const node = new SeedNode(uuid);
        this.addNode(uuid, node);
    };

    addEquationNode = () => {
        const uuid = Math.random().toString();
        const node = new EquationNode(uuid);
        this.addNode(uuid, node);
    };

    addNode(uuid, node) {
        const {graph, updateNodeKey} = this.props;
        graph.addNode(node);
        this.setState(prevState => ({
            nodePanels: [
                ...prevState.nodePanels,
                <EditNodePanel
                    key={uuid}
                    uuid={uuid}
                    node={node}
                    updateNode={updateNodeKey}
                />,
            ],
        }));
    }

    render() {
        const {buildGraph} = this.props;
        return (
            <div>
                <div className={'row'}>
                    <button onClick={() => buildGraph(this.state.nodes)}>
                        Build Graph
                    </button>
                </div>
                <div className={'row'}>
                    <Scrollbars style={{height: 500}}>
                        <div className={'graph-editor'}>
                            {this.state.nodePanels.map(panel => panel)}
                            <button onClick={this.addSeedNode}>
                                Add Seed Node
                            </button>
                            <button onClick={this.addEquationNode}>
                                Add Equation Node
                            </button>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}
