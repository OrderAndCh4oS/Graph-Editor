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
        // Todo: if this._orderOfUpdates is not empty use that.
        // Todo: this should only organise the data for find the equations.
        const nodesToUpdateLater = [];
        for(let node of this.edges) {
            const n = node.node;
            if(!(n instanceof EquationNode)) {
                continue;
            }
            let nodes = [];
            let equation = n.equn;
            const edges = n.equn.match(/{(.*?)}/g);
            let canCalculate = true;
            for(let edge of edges) {
                const id = edge.replace(/^[{]|[}]+$/g, '');
                const node = this.getNode(id);
                nodes.push(node);
                if(node.value !== null) {
                    equation = equation.replace(/{(.*?)}/, node.value);
                } else {
                    canCalculate = false;
                }
            }
            if(canCalculate) {
                n.setValue(eval(equation));
                this._orderOfUpdates.push({node: n, otherNodes: nodes});
            } else {
                nodesToUpdateLater.push({node: n, otherNodes: nodes});
            }
        }
        this.calculateMissingEquations(nodesToUpdateLater);
    }

    calculateMissingEquations(nodesToUpdateLater) {
        // Todo: use this for all calculations.
        while(nodesToUpdateLater.length) {
            const nodeToUpdate = nodesToUpdateLater.pop();
            let canCalculate = true;
            let equation = nodeToUpdate.node.equn;
            for(const node of nodeToUpdate.otherNodes) {
                if(node.value === null) {
                    nodesToUpdateLater.unshift(nodeToUpdate);
                    canCalculate = false;
                    break;
                }
                equation = equation.replace(/{(.*?)}/, node.value);
            }
            if(canCalculate) {
                nodeToUpdate.node.setValue(eval(equation));
                this._orderOfUpdates.push(nodeToUpdate);
            }
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