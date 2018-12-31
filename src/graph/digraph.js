import React from 'react';
import ConnectionView from '../component/connection-view';

export default class Digraph {
    edges = [];

    add_node(node) {
        if(this.edges.includes(node)) {
            throw Error('Duplicate node');
        }
        this.edges.push({node, edges: []});
    }

    add_edge(edge) {
        const source = edge.source;
        const destination = edge.destination;
        const sourceNode = this.edges.find(
            n => n.node.get_name() === source.get_name());
        const destinationNode = this.edges.find(
            n => n.node.get_name() === destination.get_name());
        if(!(sourceNode && destinationNode)) {
            throw Error('Node not in graph');
        }

        sourceNode.edges.push(destination);
    }

    children_of(node) {
        return this.edges[node];
    }

    has_node(node) {
        return this.edges.includes(node);
    }

    get_node(name) {
        for(let n of this.edges) {
            if(n.node.get_name() === name) {
                return n.node;
            }
        }

        throw Error('Name not found: ' + name);
    }

    display() {
        return this.edges.map(source =>
            source.edges.map(
                destination =>
                    <ConnectionView source={source.node} destination={destination}/>,
            ),
        );
    }

}