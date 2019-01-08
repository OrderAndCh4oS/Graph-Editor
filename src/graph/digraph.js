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

    getNodeById(id) {
        for(let n of this.edges) {
            if(n.node.id === id) {
                return n.node;
            }
        }

        throw Error('Name not found: ' + id);
    }

    makeEquationDataForEachNode() {
        // Todo: if this._orderOfUpdates is not empty use that instead.
        const nodesWithEquationData = [];
        for(let node of this.edges) {
            const n = node.node;
            if(!(n instanceof EquationNode)) {
                continue;
            }
            let nodes = [];
            // Todo: consider whether or not we need to find the edges again.
            const edges = n.equn.match(/{(.*?)}/g);
            for(let edge of edges) {
                const nodeId = edge.replace(/^[{]|[}]+$/g, '');
                nodes.push(this.getNodeById(nodeId));
            }
            nodesWithEquationData.push({node: n, equationNodes: nodes});
        }
        return nodesWithEquationData;
    }

    calculateEquations(nodesToUpdateLater) {
        if(this._orderOfUpdates.length) {
            for(const nodeToUpdate of this._orderOfUpdates) {
                let equation = nodeToUpdate.node.equn;
                for(const node of nodeToUpdate.equationNodes) {
                    equation = equation.replace(/{(.*?)}/, node.value);
                }
                nodeToUpdate.node.setValue(eval(equation));
                this._orderOfUpdates.push(nodeToUpdate);
            }
        }
        while(nodesToUpdateLater.length) {
            const nodeToUpdate = nodesToUpdateLater.pop();
            let canCalculate = true;
            let equation = nodeToUpdate.node.equn;
            for(const node of nodeToUpdate.equationNodes) {
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