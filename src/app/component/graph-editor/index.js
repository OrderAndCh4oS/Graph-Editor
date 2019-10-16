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
        if (previousState.model.id != match.params.id && !match.params.id) {
            this.state.savePrompt = true;
        }
        if(match.params.hasOwnProperty('id') && match.params.id && previousState.model.id != match.params.id) {
            this.loadModel(match.params.id);
        } else if (match.params.id === undefined && previousState.model.id != match.params.id) {
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
                activeNode: null
            })
        }
    }


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
            savePrompt: false
        })
    }

    render() {
        const {message} = this.props;
        var i;
        if (this.state.savePrompt) {
            i = <div>
                <p>Would you like to save your work?</p>
                <button>Yes</button>
                <button onClick={() => this.clearPrompt()}>No</button>
            </div>
        } else {
            i = <Fragment>
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
                        />
                    </Column>
                </Row>
            </Container>
        </Fragment>
        }
        return ( i
        );
    }
}

GraphEditor.contextType = AuthContext;
GraphEditor = withMessage(GraphEditor);

export default GraphEditor;
