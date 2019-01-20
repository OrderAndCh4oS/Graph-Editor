import React, { Component } from 'react';
import Graph from '../graph/graph';
import Edge from '../graph/edge';
import trainFares from '../data/train-fares-model';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import GraphView from './graph-view';
import ConnectionList from './connection-list';

class PreloadedGraph extends Component {
    constructor(props) {
        super(props);
        const g = new Graph();
        const connections = [];
        for(let nodeData of trainFares) {
            let node;
            if(nodeData.equn !== '') {
                const joins = nodeData.equn.match(/{(.*?)}/g);
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    connections.push([id, nodeData.id]);
                }
                node = new EquationNode(nodeData);
            } else {
                node = new SeedNode(nodeData);
            }
            g.addNode(node);
        }

        for(let connection of connections) {
            g.addEdge(
                new Edge(g.getNodeById(connection[0]),
                    g.getNodeById(connection[1])));
        }

        g.populateNodesWithEquationData();
        g.calculateEquations();

        this.state = {graph: g};
    }

    updateNode = (node, event) => {
        let value =
            event.target.value.toString()[0] === '0' &&
            event.target.value.toString()[1] !== '.'
                ? 0
                : parseFloat(event.target.value);
        if(isNaN(value)) {
            return;
        }
        node.value = value === 0 ? 0 : value / node.conv;
        if(!isNaN(node.value)) {
            this.state.graph.calculateEquations();
            this.setState(() => ({
                graph: this.state.graph,
            }));
        }
    };

    render() {
        return (
            <div className="app">
                <div className="row">
                    <GraphView graph={this.state.graph}/>
                    <ConnectionList
                        graph={this.state.graph} updateNode={this.updateNode}
                    />
                </div>
            </div>
        );
    }
}

export default PreloadedGraph;
