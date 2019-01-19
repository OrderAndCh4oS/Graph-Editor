export default class Node {

    get id() {
        return this._id;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get label() {
        return this._label;
    }

    get title() {
        return this._title;
    }

    get min() {
        return this._min;
    }

    get max() {
        return this._max;
    }

    get color() {
        return this._color;
    }

    get conv() {
        return this._conv;
    }

    get step() {
        return this._step;
    }

    constructor(nodeData) {
        this._id = nodeData.id;
        this._value = nodeData.value;
        this._label = nodeData.label;
        this._title = nodeData.title;
        this._min = nodeData.min;
        this._max = nodeData.max;
        this._step = nodeData.step;
        this._color = nodeData.color || 'blue';
        this._conv = nodeData.conv || 1;
        this._prefix = nodeData.prefix;
        this._suffix = nodeData.suffix;
    }

    get prefix() {
        return this._prefix;
    }

    get suffix() {
        return this._suffix;
    }
}