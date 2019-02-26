import React, { Component } from 'react';

import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphBuilder from './graph-builder';
import Digraph from '../../graph/digraph';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';
import { Column, Container, Row } from '../../elements/structure';
import { getModel, postNode } from '../../api';
import TransformJsonToGraph from '../../transform/transform-json-to-graph';
import ResponseType from '../../api/response-type';
import CsvRow from '../csv/csv-row';
import SaveGraphRow from './SaveGraphRow';
import transformGraphToGraphView
    from '../../transform/transform-graph-to-graph-view';

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
                links: [],
                hash: false,
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

    updateGraph = (graph) => {
        this.setState({graph});
    };

    updateData = (graph) => {
        const data = transformGraphToGraphView(graph);
        if(this.state.data.hash !== data.hash) {
            this.setState({graph, data});
        }
    };

    createGraphFromJson = (data) => {
        const graph = (new TransformJsonToGraph()).process(data);

        graph.populateNodesWithEquationData();
        graph.calculateEquations();

        this.updateData(graph);
    };

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
                <CsvRow
                    graph={this.state.graph}
                    createGraphFromJson={this.createGraphFromJson}
                />
                <SaveGraphRow
                    model={this.state.model}
                />
                <Row>
                    <Column span={9} mSpan={8} sSpan={6}>
                        <GraphView data={this.state.data}/>
                    </Column>
                    <Column span={3} mSpan={4} sSpan={6}>
                        <ConnectionList
                            graph={this.state.graph}
                            updateGraph={this.updateGraph}
                        />
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <GraphBuilder
                            id={this.state.id}
                            graph={this.state.graph}
                            updateGraph={this.updateGraph}
                            updateData={this.updateData}
                        />
                    </Column>
                </Row>
            </Container>
        );
    }
}

export default GraphEditor;
