import React, { Component } from 'react';
import EditNodePanel from './edit-node-panel';
import { Scrollbars } from 'react-custom-scrollbars';
import SeedNode from '../graph/seed-node';
import EquationNode from '../graph/equation-node';
import { Button } from '../elements/button';

export default class GraphEditor extends Component {

    makeSeedNode = () => {
        this.props.addNode(new SeedNode());
    };

    makeEquationNode = () => {
        this.props.addNode(new EquationNode());
    };

    displayEditNodePanels = () => {
        const {graph, updateNodeKey} = this.props;
        return graph.edges.map(
            node => {
                return <EditNodePanel
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
            <div>
                <div className={'row'}>
                    <p>
                        <Button
                            type={'affirmative'} onClick={buildGraph}
                        >
                            Build Graph
                        </Button>
                    </p>
                </div>
                <div className={'row'}>
                    <div>
                        <p>
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
                        </p>
                    </div>
                </div>
                <div className={'row'}>
                    <Scrollbars style={{height: 500}}>
                        <div className={'graph-editor'}>
                            {this.displayEditNodePanels()}
                        </div>
                    </Scrollbars>
                </div>
            </div>
        );
    }
}
