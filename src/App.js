import React, { Component } from 'react';
import './App.css';
import Node from './graph/node';
import Edge from './graph/edge';
import Digraph from './graph/digraph';
import trainFares from './data/train-fares-model';

class App extends Component {

    constructor(props) {
        super(props);
        const g = new Digraph();
        const connections = [];
        trainFares.map(data => {
                g.addNode(
                    new Node(
                        data.id,
                        data.val,
                        data.color,
                        data.conv
                    )
                );
                if(data.equn !== '') {
                    const joins = data.equn.match(/{(.*?)}/g);
                    for(let join of joins) {
                        const id = join.replace(/^[{]|[}]+$/g, '');
                        connections.push([id, data.id]);
                    }
                }
                return data;
            },
        );

        for (let connection of connections) {
            g.addEdge(new Edge(g.getNode(connection[0]), g.getNode(connection[1])));
        }

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
