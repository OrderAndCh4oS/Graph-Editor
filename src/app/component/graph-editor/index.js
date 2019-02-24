import React, { Component } from 'react';

import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphBuilder from './graph-builder';
import EquationNode from '../../graph/equation-node';
import cleanValue from '../../utility/clean-value';
import CsvImport from '../csv/csv-import';
import CsvExport from '../csv/csv-export';
import Digraph from '../../graph/digraph';
import transformCsvImportToGraphData
    from '../../transform/transform-csv-import-to-graph-data';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';
import { Column, Container, Row } from '../../elements/structure';
import { getModel, postNode } from '../../api';
import { AuthConsumer } from '../../authentication';
import TransformJsonToGraph from '../../transform/transform-json-to-graph';
import generateEdges from '../../utility/generate-edges';
import SaveButton from './save-button';
import ModelForm from './model-form';
import ResponseType from '../../api/response-type';

class GraphEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                id: null,
                title: '',
                description: '',
            },
            graph: new Digraph(),
            data: {
                nodes: [],
                edges: [],
            },
            activeNode: null,
        };
    }

    componentDidMount() {
        const {match} = this.props;
        if(match.params.hasOwnProperty('id') && match.params.id) {
            this.setState({model: {id: match.params.id}});
            getModel({scope: 'withNodes', id: match.params.id})
                .then((result) => {
                    switch(result.type) {
                        case ResponseType.SUCCESS:
                            const model = result.data;
                            this.setState({
                                model: {
                                    id: model.id,
                                    title: model.title,
                                    description: model.description,
                                },
                            });
                            this.createGraphFromJson(model.nodes);
                            break;
                        default:
                            console.log('Unhandled error');
                    }

                    },
                );
        }
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
                    graph.addEdges(generateEdges(node.node));
                } catch(e) {
                    alert('Message: ' + e.message);
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
        this.setState({graph});
    };

    updateNodeKey = (uuid) => (key, value) => {
        const graph = this.state.graph;
        const node = graph.getNodeByUuid(uuid);
        node[key] = value;
        this.updateState(graph);
    };

    createGraphFromJson = (data) => {
        const graph = (new TransformJsonToGraph()).process(data);

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        this.updateState(graph);
    };

    saveGraphButtons = ({isAuth}) => isAuth
        ? <SaveButton handleSave={this.saveNodes}>Save Nodes</SaveButton>
        : null;

    saveNodes = () => {
        const data = transformGraphNodesToJson(this.state.graph);
        postNode(data, {modelId: this.state.model.id})
            .then(result => {
                switch(result.type) {
                    case ResponseType.SUCCESS:
                        // Todo: handle invalid error
                        console.log('Unhandled Success');
                        break;
                    case ResponseType.INVALID:
                        // Todo: handle invalid error
                        console.log('Unhandled Invalid Error');
                        break;
                    default:
                        // Todo: handle error
                        console.log('Unhandled Error');

                }
            });
    };

    render() {
        return (
            <Container>
                <Row>
                    <Column span={3}>
                        <CsvImport
                            complete={this.createGraphFromJson}
                            transform={transformCsvImportToGraphData}
                        />
                    </Column>
                    <Column span={3}>
                        <CsvExport
                            data={this.state.graph}
                            transform={transformGraphNodesToJson}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column span={8}>
                        <ModelForm model={this.state.model}/>
                    </Column>
                    <Column span={4} className={'align-right'}>
                        <AuthConsumer>
                            {this.saveGraphButtons}
                        </AuthConsumer>
                    </Column>
                </Row>
                <Row>
                    <Column span={9} mSpan={8} sSpan={6}>
                        <GraphView graph={this.state.graph}/>
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
                        <GraphBuilder
                            id={this.state.id}
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

export default GraphEditor;
