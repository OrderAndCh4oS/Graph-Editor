/* eslint no-eval: 0 */

import React from 'react';
import ConnectionView from '../component/connection-view';
import EquationNode from './equation-node';

export default class Digraph {
    edges = [];
    _nodesWithEquationData = [];
    _orderedNodeEquation = [];

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

    /**
     * Loop through all the nodes an populate them with the equation ids in the
     * order they occur in the equation.
     * I thought it could be possible to use the nodes existing edges but
     * each edge nodes value could appear multiple times in the equation.
     */
    populateNodesWithEquationData() {
        for(let edge of this.edges) {
            const node = edge.node;
            if(!(node instanceof EquationNode)) {
                continue;
            }
            let edges = [];
            for(let id of this.findEquationNodeIds(node.equn)) {
                edges.push(this.getNodeById(id));
            }
            this._nodesWithEquationData.push({node, edges});
        }
    }

    /**
     * Checks to see if this._orderedNodeEquation has been populated with data.
     * If it has the equations can be run in order with out the need to look them up.
     */
    calculateEquations() {
        this._orderedNodeEquation.length
            ? this.updateEquations()
            : this.hydrateEquations();
    }

    /**
     * This will try to perform the calculations with the available data
     * until all values have been populated.
     * When it is able to perform an equation the node is pushed onto the
     * this._orderedNodeEquation array.
     * If this array is populated the equations can be run in the correct order.
     */
    hydrateEquations() {
        while(this._nodesWithEquationData.length) {
            const nodeToUpdate = this._nodesWithEquationData.pop();
            let canCalculate = true;
            let equation = nodeToUpdate.node.equn;
            for(const node of nodeToUpdate.edges) {
                if(node.value === null) {
                    this._nodesWithEquationData.unshift(nodeToUpdate);
                    canCalculate = false;
                    break;
                }
                equation = equation.replace(/{(.*?)}/, node.value);
            }
            if(canCalculate) {
                nodeToUpdate.node.setValue(eval(equation));
                this._orderedNodeEquation.push(nodeToUpdate);
            }
        }
    }

    /**
     * If all the equations have been populated we can
     * loop straight through them in right order and update their values
     */
    updateEquations() {
        for(const nodeToUpdate of this._orderedNodeEquation) {
            let equation = nodeToUpdate.node.equn;
            for(const node of nodeToUpdate.edges) {
                equation = equation.replace(/{(.*?)}/, node.value);
            }
            nodeToUpdate.node.setValue(eval(equation));
            this._orderedNodeEquation.push(nodeToUpdate);
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

    findEquationNodeIds(str) {
        const re = /(?:{)(.*?)(?:})/g;
        const ids = [];
        let m;
        while((m = re.exec(str)) !== null) {
            ids.push(m[1]);
        }
        return ids;
    }
}