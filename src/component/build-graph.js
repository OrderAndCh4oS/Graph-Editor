import React, { Component } from 'react';
import * as Papa from 'papaparse';

import Graph from '../graph/graph';
import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import Edge from '../graph/edge';

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
                <div className="row">
                    <label>
                        <span>Import CSV</span>
                        <input type='file' onChange={this.handleCSVImport}/>
                    </label>
                </div>
            </div>
        );
    }

    createGraph = (data) => {
        const g = new Graph();
        const connections = [];
        console.log(data);
        data.data.pop();
        for(let nodeData of data.data) {
            let node;
            console.log('=========================');
            console.log(nodeData);
            if(nodeData.equn !== null) {
                const joins = nodeData.equn.match(/{(.*?)}/g);
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    connections.push([id, nodeData.id]);
                }
                node = new EquationNode(Math.random().toString(), nodeData);
            } else {
                node = new SeedNode(Math.random().toString(), nodeData);
            }
            g.addNode(node);
            console.log('Added Node');
        }

        for(let connection of connections) {
            g.addEdge(
                new Edge(g.getNodeById(connection[0]),
                    g.getNodeById(connection[1])));
        }

        g.populateNodesWithEquationData();
        g.calculateEquations();

        this.setState(() => ({graph: g}));
    };

    handleCSVImport = (event) => {
        console.log(event.target.files);
        Papa.parse(event.target.files[0], {
            header: true,
            complete: this.createGraph,
            transform: (value, header) => {
                switch(header) {
                    case 'value':
                    case 'conv':
                    case 'min':
                    case 'max':
                    case 'step':
                        return value !== '' ? parseFloat(value) : null;
                    default:
                        return value !== '' ? value : null;
                }
            },
        });
    };
}

export default BuildGraph;
