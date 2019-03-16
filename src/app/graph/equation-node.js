import Node from './node';

export default class EquationNode extends Node {

    constructor(nodeData) {
        if(nodeData) {
            const {equn, ...rest} = nodeData;
            super(rest);
            this._equn = equn;
        } else {
            super();
        }
    }

    get equn() {
        return this._equn;
    }

    set equn(value) {
        this._equn = value;
    }

    setValue(value) {
        this._value = value;
    }
}