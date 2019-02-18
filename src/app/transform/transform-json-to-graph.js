import Digraph from '../graph/digraph';
import EquationNode from '../graph/equation-node';
import SeedNode from '../graph/seed-node';
import Edge from '../graph/edge';
import generateEdges from '../utility/generate-edges';

export default class transformJsonToGraph {
    process(data) {
        return this.processEdges(this.processNodes(data));
    }

    processNodes(data) {
        const graph = new Digraph();

        let edges = [];
        for(let nodeData of data) {
            const node = this.createNode(nodeData);
            if(node instanceof EquationNode) {
                edges = [...edges, ...generateEdges(node)];
            }
            graph.addNode(node);
        }
        return {graph, edges};
    }

    createNode(nodeData) {
        if(nodeData.equn) {
            return new EquationNode(nodeData);
        } else {
            return new SeedNode(nodeData);
        }
    }

    processEdges({edges, graph}) {
        for(let edge of edges) {
            graph.addEdge(
                new Edge(
                    graph.getNodeById(edge[0]),
                    graph.getNodeById(edge[1]),
                ),
            );
        }
        return graph;
    }
}
