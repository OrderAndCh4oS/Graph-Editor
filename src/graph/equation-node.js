import Node from './node';

export default class EquationNode extends Node {

    constructor(uuid, nodeData) {
        if(nodeData) {
            const {equn, ...rest} = nodeData;
            super(uuid, rest);
            this._equn = equn;
        }
        super(uuid);
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