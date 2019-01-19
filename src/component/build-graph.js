import React, { Component } from 'react';
import Graph from '../graph/graph';
import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';

class BuildGraph extends Component {
    constructor(props) {
        super(props);

        this.state = {graph: new Graph()};
    }

    buildGraph = (nodes) => {
        const g = new Graph();
        const edges = this.findEdges(nodes, g);
        if(edges.length) {
            g.addEdges(edges);
        }
        g.populateNodesWithEquationData();
        g.calculateEquations();

        this.setState(() => ({
            graph: g,
        }));
    };

    findEdges = (nodes, g) => {
        const edges = [];
        for(let node of Object.values(nodes)) {
            if(node instanceof EquationNode) {
                const joins = node.equn.match(/{(.*?)}/g);
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    edges.push([id, node.id]);
                }
            }
            g.addNode(node);
        }
        return edges;
    };

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
                <div className="row">
                    <GraphEditor buildGraph={this.buildGraph}/>
                </div>
            </div>
        );
    }
}

export default BuildGraph;
