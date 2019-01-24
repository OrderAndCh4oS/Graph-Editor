import React, { Component } from 'react';
import * as Papa from 'papaparse';

import Graph from '../graph/graph';
import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import Edge from '../graph/edge';
import cleanValue from '../utility/clean-value';
import getProperty from '../utility/get-property';
import { saveAs } from 'file-saver';

// Todo: move this function

class BuildGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {graph: new Graph()};
    }

    buildGraph = () => {
        const g = this.state.graph;

        const edges = this.findEdges(g);
        if(edges.length) {
            try {
                g.addEdges(edges);
            } catch(e) {

                alert(e.message);
                return;
            }
        }

        g.populateNodesWithEquationData();
        g.calculateEquations();
        this.setState(() => ({
            graph: g,
        }));
    };

    findEdges = (graph) => {
        const edges = [];
        for(let node of graph.edges) {

            const n = node.node;
            if(n instanceof EquationNode) {
                const joins = n.equn.match(/{(.*?)}/g);

                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    edges.push([id, n.id]);
                }
            }
        }
        return edges;
    };

    updateGraph = () => {

        // Todo: The graph should be immutable.
        const g = this.state.graph;
        g._hydrated = false;
        this.setState(() => ({
            graph: g,
        }));
    };

    updateNodeValue = (uuid, value) => {

        const node = this.state.graph.getNodeByUuid(uuid);
        value = cleanValue(value);
        if(isNaN(value)) {
            return;
        }
        node.value = value === 0 ? 0 : value / node.conv;
        if(!isNaN(node.value)) {

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

        node[key] = value;
        this.updateGraph();
    };

    createGraph = (data) => {
        const g = new Graph();
        const connections = [];
        data.data.pop();
        for(let nodeData of data.data) {
            let node;
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

    handleCSVExport = () => {
        const data = this.state.graph.edges.map(n => {

            return {
                id: n.node.id,
                label: n.node.label,
                title: n.node.title,
                prefix: n.node.prefix,
                value: n.node.value,
                suffix: n.node.suffix,
                conv: n.node.conv,
                equn: getProperty(n.node.equn),
                min: n.node.min,
                max: n.node.max,
                step: n.node.step,
                color: n.node.color,
            };
        });

        const blob = new Blob([Papa.unparse(data)],
            {type: 'text/plain;charset=utf-8'});

        saveAs(blob, 'data.csv');
    };

    render() {
        return (
            <div className="app">
                <div className="top-tool-bar row">
                    <div className={'tool-bar-item import-csv'}>
                        <label>
                            <span>Import CSV</span>
                            <input
                                type='file' onChange={this.handleCSVImport}
                            />
                        </label>
                    </div>
                    <div className={'tool-bar-item export-csv'}>
                        <button
                            className={'button'} onClick={this.handleCSVExport}
                        >
                            Export CSV
                        </button>
                    </div>
                </div>
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
