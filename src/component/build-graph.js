import React, { Component } from 'react';
import Graph from '../graph/graph';
import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';

// Todo: move this function
function cleanValue(value) {
    return (
        value.toString()[0] === '0' &&
        value.toString()[1] !== '.'
            ? 0
            : parseFloat(value)
    );
}

class BuildGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {graph: new Graph()};
    }

    buildGraph = () => {
        const g = this.state.graph;
        console.log('G: ', g);
        const edges = this.findEdges(g);
        if(edges.length) {
            try {
                g.addEdges(edges);
            } catch(e) {
                console.log(e);
                alert(e.message);
                return;
            }
        }
        console.log('Edges: ', edges);
        g.populateNodesWithEquationData();
        g.calculateEquations();
        this.setState(() => ({
            graph: g,
        }));
    };

    findEdges = (graph) => {
        const edges = [];
        for(let node of graph.edges) {
            console.log('N: ', node);
            const n = node.node;
            if(n instanceof EquationNode) {
                const joins = n.equn.match(/{(.*?)}/g);
                console.log('joins: ', joins);
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    edges.push([id, n.id]);
                }
            }
        }
        return edges;
    };

    updateGraph = () => {
        console.log('Update Graph');
        // Todo: The graph should be immutable.
        const g = this.state.graph;
        g._hydrated = false;
        this.setState(() => ({
            graph: g,
        }));
    };

    updateNodeValue = (uuid, value) => {
        console.log('unv UUID', uuid);
        const node = this.state.graph.getNodeByUuid(uuid);
        value = cleanValue(value);
        if(isNaN(value)) {
            return;
        }
        node.value = value === 0 ? 0 : value / node.conv;
        if(!isNaN(node.value)) {
            console.log('>>>> ', node.value);
            this.state.graph.calculateEquations();
        }
        const g = this.state.graph;
        this.setState(() => ({
            graph: g,
        }));
        // this.updateGraph();
    };

    updateNodeKey = (uuid) => (key, value) => {
        const node = this.state.graph.getNodeByUuid(uuid);
        console.log('Update Node Key Value: ', node);
        node[key] = value;
        this.updateGraph();
    };

    render() {
        return (
            <div className="app">
                <div className="row">
                    <GraphView graph={this.state.graph}/>
                    <ConnectionList
                        graph={this.state.graph}
                        updateNodeValue={this.updateNodeValue}
                    />
                </div>
                <GraphEditor
                    graph={this.state.graph}
                    buildGraph={this.buildGraph}
                    updateGraph={this.updateGraph}
                    updateNodeKey={this.updateNodeKey}
                />
            </div>
        );
    }
}

export default BuildGraph;
