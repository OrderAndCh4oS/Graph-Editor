
export default class Edge {

    source;
    destination;

    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }

    display() {
        return this.source.id + '->' + this.destination.id;
    }

    getSource() {
        return this.source;
    }

    getDestination() {
        return this.destination;
    }
}