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
        const edges = this.findEdgesFromEquationNodes(graph.edges);
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

    addNode = (node) => {
        const graph = this.state.graph;
        try {
            graph.addNode(node);
        } catch(e) {
            alert(e.message);
        }
        this.updateState(graph);
    };

    removeNode = (uuid) => () => {
        // Todo: fix errors this causes with graph-view
        const graph = this.state.graph;
        graph.removeNodeWithUuid(uuid);
        this.updateState(graph);
    };

    findEdgesFromEquationNodes = (edges) => {
        let connections = [];
        for(let node of edges) {
            if(node.node instanceof EquationNode) {
                connections = [
                    ...connections,
                    ...this.generateEdges(node.node)];
            }
        }

        return connections;
    };

    updateNodeValue = (uuid, value) => {
        const graph = this.state.graph;

        const node = graph.getNodeByUuid(uuid);
        value = cleanValue(value);
        if(isNaN(value)) {
            return;
        }
        node.value = value === 0 ? 0 : value / node.conv;
        if(!isNaN(node.value)) {
            graph.calculateEquations();
        }

        this.updateState(graph);
    };

    updateState(graph) {
        const data = transformGraphToGraphView(graph);
        this.setState({graph, data});
    }

    updateNodeKey = (uuid) => (key, value) => {
        const graph = this.state.graph;
        const node = graph.getNodeByUuid(uuid);
        node[key] = value;
        this.updateState(graph);
    };

    createGraphFromCsvNodes = (nodes) => {
        const graph = this.processEdges(this.processNodes(nodes));

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        this.updateState(graph);
    };

    processNodes(data) {
        const graph = new Digraph();

        // Todo: find out why data is coming in with an extra row of empty data.
        data.data.pop();
        let edges = [];
        for(let nodeData of data.data) {
            const node = this.createNode(nodeData);
            if(node instanceof EquationNode) {
                edges = [...edges, ...this.generateEdges(node)];
            }
            graph.addNode(node);
        }
        return {graph, edges};
    }

    createNode(nodeData) {
        if(nodeData.equn) {
            return new EquationNode(nodeData);
        } else {
            return new SeedNode(nodeData);
        }
    }

    * generateEdges(node) {
        const joins = node.equn.match(/{(.*?)}/g);
        for(let join of joins) {
            const id = join.replace(/^[{]|[}]+$/g, '');
            yield [id, node.id];
        }
    }

    processEdges({edges, graph}) {
        for(let edge of edges) {
            graph.addEdge(
                new Edge(
                    graph.getNodeById(edge[0]),
                    graph.getNodeById(edge[1]),
                ),
            );
        }
        return graph;
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
                    addNode={this.addNode}
                    removeNode={this.removeNode}
                    updateNodeKey={this.updateNodeKey}
                />
            </div>
        );
    }
}

export default BuildGraph;
