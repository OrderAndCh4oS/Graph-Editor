import Digraph from './digraph';
import Edge from './edge';

export default class Graph extends Digraph {
    addEdge(edge){
        super.addEdge(edge);
        const reverse = new Edge(edge.destination, edge.source);
        super.addEdge(reverse)
    }
}