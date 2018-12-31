
export default class Node {

    id;
    value;
    label;
    title;
    color = 'blue';
    conv = 1;

    constructor(id, value, color, conv) {
        this.id = id;
        this.value = value;
        this.color = color;
        this.conv = conv;
    }

    getId() {
        return this.id
    }

    getValue() {
        return this.value
    }

}