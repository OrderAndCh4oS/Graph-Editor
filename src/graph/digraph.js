/* eslint no-eval: 0 */

import React from 'react';
import ConnectionView from '../component/connection-view';
import EquationNode from './equation-node';

export default class Digraph {
    edges = [];
    _orderOfUpdates = [];

    addNode(node) {
        if(this.edges.includes(node)) {
            throw Error('Duplicate node');
        }
        this.edges.push({node, edges: []});
    }

    addEdge(edge) {
        const source = edge.source;
        const destination = edge.destination;
        const sourceNode = this.edges.find(
            n => n.node.id === source.id);
        const destinationNode = this.edges.find(
            n => n.node.id === destination.id);
        if(!(sourceNode && destinationNode)) {
            throw Error('Node not in graph');
        }

        sourceNode.edges.push(destination);
    }

    childrenOf(node) {
        return this.edges[node];
    }

    hasNode(node) {
        return this.edges.includes(node);
    }

    getNode(name) {
        for(let n of this.edges) {
            if(n.node.id === name) {
                return n.node;
            }
        }

        throw Error('Name not found: ' + name);
    }

    updateValues() {
        const nodesToUpdateLater = [];
        let finished = false;
        while(!finished) {
            for(let node of this.edges) {
                const n = node.node;
                if(!(n instanceof EquationNode)) {
                    continue;
                }
                console.log(n.equn);
                let nodes = [];
                let equation = n.equn;
                const joins = n.equn.match(/{(.*?)}/g);
                let canCalculate = true;
                for(let join of joins) {
                    const id = join.replace(/^[{]|[}]+$/g, '');
                    const node = this.getNode(id);
                    nodes.push(node);
                    if(node.value !== null) {
                        equation = equation.replace(/{(.*?)}/, node.value);
                        console.log('E1: ', equation);
                    } else {
                        canCalculate = false;
                    }
                    console.log('E2: ', equation);

                }
                if(canCalculate) {
                    // Todo: {equation: '{a}*{b}', values: []}
                    n.setValue(eval(equation));
                    console.log('V1: ', eval(equation));
                } else {
                    // Todo: loop through until all values are updated
                    nodesToUpdateLater.push({node: n, otherNodes: nodes});
                }

                console.log(nodes);
            }
            finished = true;
        }
    }

    display() {
        return this.edges.map(source =>
            source.edges.map(
                destination =>
                    <ConnectionView
                        key={source.node.id + '->' + destination.id}
                        source={source.node}
                        destination={destination}
                    />,
            ),
        );
    }

}