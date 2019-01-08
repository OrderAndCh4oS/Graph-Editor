import React, { Component } from 'react';
import './App.css';
import Graph from './graph/graph';
import Edge from './graph/edge';
import trainFares from './data/train-fares-model';
import EquationNode from './graph/equation-node';
import SeedNode from './graph/seed-node';

class App extends Component {
    constructor(props) {
        super(props);
        const g = new Graph();
        const connections = [];
        for(let data of trainFares) {
            let node;
            if(data.equn !== '') {
                const joins = data.equn.match(/{(.*?)}/g);
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    connections.push([id, data.id]);
                }
                node = new EquationNode(
                    data.id,
                    data.label,
                    data.title,
                    data.color,
                    data.conv,
                    data.equn,
                );
            } else {
                node = new SeedNode(
                    data.id,
                    data.val,
                    data.label,
                    data.title,
                    data.color,
                    data.conv,
                );
            }
            g.addNode(node);
        }

        for(let connection of connections) {
            g.addEdge(
                new Edge(g.getNodeById(connection[0]),
                    g.getNodeById(connection[1])));
        }

        g.populateNodesWithEquationData();
        g.calculateEquations();

        this.state = {graph: g};
    }

    render() {
        return (
            <div className="app">
                {this.state.graph.display()}
            </div>
        );
    }
}

export default App;
