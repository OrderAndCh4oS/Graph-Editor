import React, { Component, Fragment } from 'react';

import ConnectionList from './connection-list';
import GraphBuilderWrapped from './graph-builder';
import Digraph from '../../graph/digraph';
import { Column, Container, Row } from '../../elements/structure';
import { getModel } from '../../api';
import TransformJsonToGraph from '../../transform/transform-json-to-graph';
import ResponseType from '../../api/response-type';
import CsvRow from '../csv/csv-row';
import SaveGraphRow from './save-graph-row';
import withMessage from '../../context/message/with-message';
import { AuthContext } from '../../authentication';
import transformGraphToGraphViewVis
    from '../../transform/transform-graph-to-graph-view-vis';
import GraphViewVis from './graph-view-vis';
import getProperty from '../../utility/get-property';
import EquationNode from '../../graph/equation-node';

// ToDo: Reset Graph Button
// ToDo: Clone Graph Button
class GraphEditor extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(localStorage.getItem('user')) || {};
        this.state = {
            model: {
                id: null,
                title: '',
                description: '',
                userId: null,
            },
            graph: new Digraph(),
            data: {
                nodes: [],
                edges: [],
            },
            clearedNodes: [],
            selectedEdge: null,
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
                                        userId: model.userId,
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

    reset = () => {
        this.setState(prevState => ({
            graph: new Digraph(),
            data: {
                nodes: [],
                edges: [],
            },
            clearedNodes: prevState.graph.edges.map(edge => edge.node.uuid),
        }));
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
                            <GraphViewVis
                                data={this.state.data}
                                displaySelectedNode={this.displaySelectedNode}
                            />
                            <p className={'selected-node'}>
                                <span>{
                                    this.state.selectedEdge
                                        ? this.state.selectedEdge.node.label
                                        : 'No Node Selected'
                                }</span>
                                <br/>
                                {
                                    this.state.selectedEdge &&
                                    this.state.selectedEdge.node instanceof
                                    EquationNode
                                        ? this.state.selectedEdge.node.equn
                                        : null
                                }
                            </p>
                        </Column>
                        <Column span={3} mSpan={4} sSpan={6}>
                            <ConnectionList
                                graph={this.state.graph}
                                updateGraph={this.updateGraph}
                                updateData={this.updateData}
                            />
                        </Column>
                    </Row>
                    {this.showEditor() ? this.graphEditorRow() : null}
                </Container>
            </Fragment>
        );
    }

    showEditor() {
        const userId = getProperty(this.user.id, null);
        const modelUserId = this.state.model.userId;
        return (
            (userId && !modelUserId)
            ||
            (userId === modelUserId)
        );
    }

    displaySelectedNode = (uuid) => {
        this.setState(prevState => ({
            selectedEdge: this.findNodeByUuid(prevState.graph, uuid),
        }));
    };

    findNodeByUuid(graph, uuid) {
        return graph.edges.find(edge => edge.node.uuid === uuid) || null;
    }

// Todo: move to component
    graphEditorRow = () =>
        <Row>
            <Column>
                <GraphBuilderWrapped
                    id={this.state.id}
                    graph={this.state.graph}
                    model={this.state.model}
                    clearedNodes={this.state.clearedNodes}
                    updateGraph={this.updateGraph}
                    updateData={this.updateData}
                    reset={this.reset}
                />
            </Column>
        </Row>;
}

GraphEditor.contextType = AuthContext;
GraphEditor = withMessage(GraphEditor);

export default GraphEditor;
