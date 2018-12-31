
export default class Node {

    name;
    value;

    constructor(name, value) {
        this.name = name;
        this.value = value
    }

    get_name() {
        return this.name
    }

    get_value() {
        return this.value
    }

}