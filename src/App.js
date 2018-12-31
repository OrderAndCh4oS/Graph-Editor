import React, { Component } from 'react';
import './App.css';
import Graph from './graph/graph';
import Node from './graph/node';
import Edge from './graph/edge';

class App extends Component {

    constructor(props) {
        super(props);
        const g = new Graph();
        for(let name of [
            'Boston',
            'Providence',
            'New York',
            'Chicago',
            'Denver',
            'Phoenix',
            'Los Angeles'
        ]) {
            g.add_node(new Node(name));
        }

        g.add_edge(new Edge(g.get_node('Boston'), g.get_node('Providence')));
        g.add_edge(new Edge(g.get_node('Boston'), g.get_node('New York')));
        g.add_edge(new Edge(g.get_node('Providence'), g.get_node('Boston')));
        g.add_edge(new Edge(g.get_node('Providence'), g.get_node('New York')));
        g.add_edge(new Edge(g.get_node('New York'), g.get_node('Chicago')));
        g.add_edge(new Edge(g.get_node('Chicago'), g.get_node('Denver')));
        g.add_edge(new Edge(g.get_node('Denver'), g.get_node('Phoenix')));
        g.add_edge(new Edge(g.get_node('Denver'), g.get_node('New York')));
        g.add_edge(new Edge(g.get_node('Chicago'), g.get_node('Phoenix')));
        g.add_edge(new Edge(g.get_node('Los Angeles'), g.get_node('Boston')));

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
