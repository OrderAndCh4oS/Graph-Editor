import React, { Component, Fragment } from 'react';
import EditEquationNodePanel from './edit-equation-node-panel';
import SeedNode from '../../graph/seed-node';
import EquationNode from '../../graph/equation-node';
import { Button } from '../../elements/button';
import EditSeedNodePanel from './edit-seed-node-panel';
import { Column, Panel, Row } from '../../elements/structure';
import { AuthConsumer } from '../../authentication';

export default class GraphBuilder extends Component {

    makeSeedNode = () => {
        this.props.addNode(new SeedNode());
    };

    makeEquationNode = () => {
        this.props.addNode(new EquationNode());
    };

    displayEditNodePanels = () => {
        const {graph, updateNodeKey} = this.props;
        if(!graph.edges.length) {
            return <p className={'font-minus-one italic'}>Add nodes or import a
                                                          csv to begin.</p>;
        }
        return graph.edges.map(
            node => {
                return node.node instanceof SeedNode
                    ? <EditSeedNodePanel
                        key={node.node.uuid}
                        node={node.node}
                        updateNode={updateNodeKey(node.node.uuid)}
                        removeNode={this.props.removeNode(node.node.uuid)}
                    />
                    : <EditEquationNodePanel
                        key={node.node.uuid}
                        node={node.node}
                        updateNode={updateNodeKey(node.node.uuid)}
                        removeNode={this.props.removeNode(node.node.uuid)}
                    />;
            },
        );
    };

    render() {
        const {buildGraph} = this.props;
        return (
            <Fragment>
                <Row>
                    <Column span={6} sSpan={6}>
                        <Button
                            onClick={this.makeSeedNode}
                        >
                            Add Seed Node
                        </Button>
                        {' '}
                        <Button
                            onClick={this.makeEquationNode}
                        >
                            Add Equation Node
                        </Button>
                    </Column>
                    <Column span={6} sSpan={6} className={'align-right'}>
                        <Button
                            type={'affirmative'} onClick={buildGraph}
                        >
                            Build Graph
                        </Button>
                        <AuthConsumer>
                            {(isAuth) => isAuth
                                ? <Button
                                    type={'affirmative'}
                                    onClick={this.saveGraph}
                                >
                                    Save Graph
                                </Button>
                                : null}
                        </AuthConsumer>
                    </Column>
                </Row>
                <Row>
                    <Column>
                        <Panel className={'graph-editor'}>
                            {this.displayEditNodePanels()}
                        </Panel>
                    </Column>
                </Row>
            </Fragment>
        );
    }

    saveGraph = () => {
        console.log('Saved');
    };
}
