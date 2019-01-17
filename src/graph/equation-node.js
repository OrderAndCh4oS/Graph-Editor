import Node from './node';

export default class EquationNode extends Node {
    constructor(id, label, title, color, conv, unit, equn) {
        super(id, null, label, title, color, conv, unit);
        this._equn = equn;
    }

    get equn() {
        return this._equn;
    }

    setValue(value) {
        this._value = value;
    }
}