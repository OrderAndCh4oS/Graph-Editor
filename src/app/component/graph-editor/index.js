import React, { Component, Fragment } from 'react';

import ConnectionList from './connection-list';
import GraphBuilderWrapped from './graph-builder';
import Digraph from '../../graph/digraph';
import { Column, Container, Row } from '../../elements/structure';
import { getModel, postNode } from '../../api';
import { Button } from '../../elements/button'
import TransformJsonToGraph from '../../transform/transform-json-to-graph';
import ResponseType from '../../api/response-type';
import CsvRow from '../csv/csv-row';
import SaveGraphRow from './save-graph-row';
import withMessage from '../../context/message/with-message';
import { AuthContext } from '../../authentication';
import transformGraphToGraphViewVis
    from '../../transform/transform-graph-to-graph-view-vis';
import GraphViewVis from './graph-view-vis';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';
import MessageType from '../../context/message/message-type';


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
            savePrompt: false
        };
    }

    componentDidMount() {
        const {match} = this.props;
        if(match.params.hasOwnProperty('id') && match.params.id) {
            this.loadModel(match.params.id);
        }
    }

    componentDidUpdate(previousProps, previousState) {
        const {match} = this.props;
        if (previousState.model.id != match.params.id) {
            if (match.params.id === undefined && previousState.model.id !== null && !this.state.savePrompt && !previousState.savePrompt) {
                this.setState({
                    savePrompt: true
                })
            } else {
                if(match.params.hasOwnProperty('id') && match.params.id) {
                    this.loadModel(match.params.id);
                } 
            }
        }
    }

    saveNodes = () => {
        const {graph, model} = this.state;
        const data = transformGraphNodesToJson(graph);
        data.forEach(d => {
            postNode(d, {modelId: model.id})
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

    loadModel = (id) => {
        this.setState({model: {id: id}});
        getModel({scope: 'withNodes', id: id})
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
    };

    updateModel = (model) => {
        this.setState({model});
    };

    updateGraph = (graph) => {
        this.setState({graph});
    };

    updateData = (graph) => {
        const data = transformGraphToGraphViewVis(graph);
        this.setState({graph, data});
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

    clearPrompt() {
        this.setState({
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
            savePrompt: false
        })
    }

    render() {
        const {message} = this.props;
        const i = this.state.savePrompt ? <Row>
                                            <p>Would you like to save your work?</p>
                                            <Button onClick={() => { this.saveNodes(); this.clearPrompt(); }}>Yes</Button>
                                            <Button onClick={() => this.clearPrompt()}>No</Button>
                                        </Row> :
            <Fragment>
                {message()}
                <Container>
                    <CsvRow
                        graph={this.state.graph}
                        createGraphFromJson={this.createGraphFromJson}
                    />
                    <SaveGraphRow
                        model={this.state.model}
                        updateModel={this.updateModel}
                    />
                    <Row>
                        <Column span={9} mSpan={8} sSpan={6}>
                            <GraphViewVis data={this.state.data}/>
                        </Column>
                        <Column span={3} mSpan={4} sSpan={6}>
                            <ConnectionList
                                graph={this.state.graph}
                                updateGraph={this.updateGraph}
                                updateData={this.updateData}
                            />
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <GraphBuilderWrapped
                                id={this.state.id}
                                graph={this.state.graph}
                                model={this.state.model}
                                updateGraph={this.updateGraph}
                                updateData={this.updateData}
                                saveNodes={() => this.saveNodes()}
                            />
                        </Column>
                    </Row>
                </Container>
            </Fragment>;
        return i;
    }
}

GraphEditor.contextType = AuthContext;
GraphEditor = withMessage(GraphEditor);

export default GraphEditor;
