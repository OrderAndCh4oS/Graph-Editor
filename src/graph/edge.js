
export default class Edge {

    source;
    destination;

    constructor(source, destination) {
        this.source = source;
        this.destination = destination;
    }

    display() {
        return this.source.get_name() + '->' + this.destination.get_name();
    }

    get_source() {
        return this.source;
    }

    get_destination() {
        return this.destination;
    }
}