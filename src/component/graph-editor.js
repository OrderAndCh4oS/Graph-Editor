import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import { Scrollbars } from 'react-custom-scrollbars';
import SeedNode from '../graph/seed-node';
import EquationNode from '../graph/equation-node';

export default class GraphEditor extends Component {

    makeSeedNode = () => {
        // Todo: use UUIDs for this
        console.log('Add SeedNode');
        const uuid = Math.random().toString();
        const node = new SeedNode(uuid);
        console.log('SdN: ', node);
        this.addNode(uuid, node);
    };

    makeEquationNode = () => {
        console.log('Add EquationNode');
        const uuid = Math.random().toString();
        const node = new EquationNode(uuid);
        console.log('EqN: ', node);
        this.addNode(uuid, node);
    };

    addNode(uuid, node) {
        console.log('Add Node');
        const {graph, updateGraph} = this.props;
        graph.addNode(node);
        updateGraph();
    }

    displayEditNodePanels = () => {
        const {graph, updateNodeKey} = this.props;
        return graph.edges.map(
            node => {
                console.log('Looped Node: ', node);
                console.log('UUID Key: ', node.node.uuid);
                return <EditNodePanel
                    key={node.node.uuid}
                    node={node.node}
                    updateNode={updateNodeKey}
                />;
            },
        );
    };

    render() {
        const {buildGraph} = this.props;
        return (
            <div>
                <div className={'row'}>
                    <button onClick={() => buildGraph()}>
                        Build Graph
                    </button>
                </div>
                <div className={'row'}>
                    <Scrollbars style={{height: 500}}>
                        <div className={'graph-editor'}>
                            {this.displayEditNodePanels()}
                            <button onClick={this.makeSeedNode}>
                                Add Seed Node
                            </button>
                            <button onClick={this.makeEquationNode}>
                                Add Equation Node
                            </button>
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}
