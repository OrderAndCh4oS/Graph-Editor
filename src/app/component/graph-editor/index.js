import React, { Component, Fragment } from 'react';

import GraphView from './graph-view';
import ConnectionList from './connection-list';
import GraphBuilderWrapped from './graph-builder';
import Digraph from '../../graph/digraph';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';
import { Column, Container, Row } from '../../elements/structure';
import { getModel, postNode } from '../../api';
import TransformJsonToGraph from '../../transform/transform-json-to-graph';
import ResponseType from '../../api/response-type';
import CsvRow from '../csv/csv-row';
import SaveGraphRow from './save-graph-row';
import transformGraphToGraphView
    from '../../transform/transform-graph-to-graph-view';
import withMessage from '../../context/message/with-message';
import MessageType from '../../context/message/message-type';
import { AuthContext } from '../../authentication';

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

    updateModel = (model) => {
        this.setState({model});
    };

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
        try {
            graph.populateNodesWithEquationData();
            graph.calculateEquations();
        } catch(e) {
            this.props.setMessage('Error Creating Graph: ' + e.message);
            this.props.showMessage();
        }
        this.updateData(graph);
    };

    saveNodes = () => {
        const data = transformGraphNodesToJson(this.state.graph);
        data.forEach(d => {
            postNode(d, {modelId: this.state.model.id})
                .then(result => {
                    switch(result.type) {
                        case ResponseType.SUCCESS:
                            // Todo: handle validation
                            this.props.setMessage(
                                'Nodes saved',
                                MessageType.SUCCESS);
                            this.props.showMessage();
                            break;
                        case ResponseType.INVALID:
                            // Todo: handle marking form errors
                            this.props.setMessage(
                                'Invalid node data',
                                MessageType.ERROR);
                            this.props.showMessage();
                            break;
                        case ResponseType.AUTHENTICATION_FAILURE:
                            this.context.logout();
                            this.props.history.push('/login');
                            break;
                        default:
                            this.props.setMessage(
                                'Failed to save nodes',
                                MessageType.ERROR);
                            this.props.showMessage();

                    }
                });
        });
    };

    render() {
        const {message} = this.props;
        return (
            <Fragment>
                {message()}
                <Container>
                    <CsvRow
                        graph={this.state.graph}
                        createGraphFromJson={this.createGraphFromJson}
                    />
                    <SaveGraphRow
                        model={this.state.model} updateModel={this.updateModel}
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
                            <GraphBuilderWrapped
                                id={this.state.id}
                                graph={this.state.graph}
                                saveNodes={this.saveNodes}
                                updateGraph={this.updateGraph}
                                updateData={this.updateData}
                            />
                        </Column>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

GraphEditor.contextType = AuthContext;
GraphEditor = withMessage(GraphEditor);

export default GraphEditor;
