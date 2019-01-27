import React, { Component } from 'react';

import Graph from '../graph/graph';
import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import Edge from '../graph/edge';
import cleanValue from '../utility/clean-value';
import getProperty from '../utility/get-property';
import prettifyValue from '../utility/prettify-value';
import CsvImport from './csv-import';
import CsvExport from './csv-export';

class BuildGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Graph(),
            data: {
                nodes: [],
                edges: [],
            },
        };
    }

    buildGraph = () => {
        const graph = this.state.graph;
        const edges = this.findEdges(graph);
        if(edges.length) {
            try {
                graph.addEdges(edges);
            } catch(e) {
                alert(e.message);
                return;
            }
        }

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        const data = this.transformForGraphView(graph);
        this.setState({graph, data});
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
        const graph = this.state.graph;
        graph.populateNodesWithEquationData();
        graph.calculateEquations();
        const data = this.transformForGraphView(graph);
        this.setState({graph, data});
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

        const graph = this.state.graph;
        const data = this.transformForGraphView(graph);
        this.setState({graph, data});
    };

    updateNodeKey = (uuid) => (key, value) => {
        const node = this.state.graph.getNodeByUuid(uuid);

        node[key] = value;
        this.updateGraph();
    };

    createGraph = (nodes) => {
        const graph = new Graph();
        const connections = [];

        this.processNodes(nodes, connections, graph);
        this.processConnections(connections, graph);

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        const data = this.transformForGraphView(graph);

        this.setState({graph, data});
    };

    processConnections(connections, graph) {
        for(let connection of connections) {
            graph.addEdge(
                new Edge(graph.getNodeById(connection[0]),
                    graph.getNodeById(connection[1])));
        }
    }

    processNodes(data, connections, graph) {
        // Todo: find out why data is coming in with an extra row of empty data.
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
            graph.addNode(node);
        }
    }

    transformForGraphView = (graph) => {
        const data = {nodes: [], links: []};
        for(const edge of graph.edges) {
            data.nodes.push({
                id: edge.node.uuid,
                label: edge.node.id || '',
                color: edge.node.color,
                value: prettifyValue(
                    edge.node.value,
                    edge.node.conv,
                    edge.node.prefix,
                    edge.node.suffix,
                ) || '',
            });
            data.links = [
                ...data.links,
                ...edge.edges.map(node => ({
                        source: edge.node.uuid,
                        target: node.uuid,
                    }),
                )];
        }
        return data;
    };

    transformCsvImportData = (value, header) => {
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
    };

    transformCsvExportData = (graph) =>
        graph.edges.map(n => {
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

    render() {
        return (
            <div className="app">
                <div className="top-tool-bar row">
                    <CsvImport
                        complete={this.createGraph}
                        transform={this.transformCsvImportData}
                    />
                    <CsvExport
                        data={this.state.graph}
                        transform={this.transformCsvExportData}
                    />
                </div>
                <div className="row">
                    <GraphView data={this.state.data}/>
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
