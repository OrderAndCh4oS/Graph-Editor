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
import transformCsvImportToGraphData
    from '../transform/transform-csv-import-to-graph-data';
import transformGraphToCsvExport
    from '../transform/transform-graph-to-csv-export';
import { Column, Container, Row } from '../elements/structure';

class BuildGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: new Digraph(),
            data: {
                nodes: [],
                edges: [],
            },
            activeNode: null,
        };
    }

    buildGraph = () => {
        const graph = this.state.graph;

        this.addEdges(graph);
        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        this.updateState(graph);
    };

    addEdges = (graph) => {
        for(let node of graph.edges) {
            if(node.node instanceof EquationNode) {
                try {
                    graph.addEdges(this.generateEdges(node.node));
                } catch(e) {
                    alert(e.message);
                }
            }
        }
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
        const graph = this.state.graph;
        graph.removeNodeWithUuid(uuid);
        this.updateState(graph);
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

    updateState = (graph) => {
        // Todo: see if transform can be moved to graph view only
        this.setState({graph});
    };

    displayActiveNodeData = (edge) => {
        this.setState({activeNode: edge.node});
    };

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
            <Container>
                <Row>
                    <Column span={3}>
                        <CsvImport
                            complete={this.createGraphFromCsvNodes}
                            transform={transformCsvImportToGraphData}
                        />
                    </Column>
                    <Column span={3}>
                        <CsvExport
                            data={this.state.graph}
                            transform={transformGraphToCsvExport}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column span={9} mSpan={8} sSpan={6}>
                        <GraphView
                            graph={this.state.graph}
                            displayActiveNodeData={this.displayActiveNodeData}
                        />
                    </Column>
                    <Column span={3} mSpan={4} sSpan={6}>
                        <ConnectionList
                            graph={this.state.graph}
                            updateNodeValue={this.updateNodeValue}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <p className={'font-minus-one no-padding'}>
                            {this.state.activeNode
                                ? this.state.activeNode.title
                                : 'No node highlighted.'}
                        </p>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <GraphEditor
                            graph={this.state.graph}
                            buildGraph={this.buildGraph}
                            addNode={this.addNode}
                            removeNode={this.removeNode}
                            updateNodeKey={this.updateNodeKey}
                        />
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default BuildGraph;
