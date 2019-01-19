import Node from './node';

export default class EquationNode extends Node {
    constructor({equn, ...rest}) {
        super(rest);
        this._equn = equn;
    }

    get equn() {
        return this._equn;
    }

    setValue(value) {
        this._value = value;
    }
}