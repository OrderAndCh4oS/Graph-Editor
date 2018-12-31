import Digraph from './digraph';
import Edge from './edge';

export default class Graph extends Digraph {
    add_edge(edge){
        super.add_edge(edge);
        const reverse = new Edge(edge.destination, edge.source);
        super.add_edge(reverse)
    }
}