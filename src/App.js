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
                g.add_node(new Node(data.id, data.val));
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
            g.add_edge(new Edge(g.get_node(connection[0]), g.get_node(connection[1])));
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
