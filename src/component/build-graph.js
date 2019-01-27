import React, { Component } from 'react';

import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphEditor from './graph-editor';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import Edge from '../graph/edge';
import cleanValue from '../utility/clean-value';
import CsvImport from './csv-import';
import CsvExport from './csv-export';
import Digraph from '../graph/digraph';
import transformGraphToGraphView
    from '../transform/transform-graph-to-graph-view';
import transformCsvImportToGraphData
    from '../transform/transform-csv-import-to-graph-data';
import transformGraphToCsvExport
    from '../transform/transform-graph-to-csv-export';

class BuildGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Digraph(),
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

        this.updateState(graph);
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
        graph.calculateEquations();
        this.setState({graph});
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
        this.updateState(graph);
    };

    updateState(graph) {
        const data = transformGraphToGraphView(graph);
        this.setState({graph, data});
    }

    updateNodeKey = (uuid) => (key, value) => {
        const node = this.state.graph.getNodeByUuid(uuid);
        node[key] = value;
        this.updateGraph();
    };

    createGraphFromCsvNodes = (nodes) => {
        const graph = new Digraph();
        const connections = [];

        this.processNodes(nodes, connections, graph);
        this.processConnections(connections, graph);

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        this.updateState(graph);
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
                node = new EquationNode(nodeData);
            } else {
                node = new SeedNode(nodeData);
            }
            graph.addNode(node);
        }
    }

    render() {
        return (
            <div className="app">
                <div className="top-tool-bar row">
                    <CsvImport
                        complete={this.createGraphFromCsvNodes}
                        transform={transformCsvImportToGraphData}
                    />
                    <CsvExport
                        data={this.state.graph}
                        transform={transformGraphToCsvExport}
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
