export default class Node {

    get id() {
        return this._id;
    }

    constructor(nodeData) {
        if(nodeData) {
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
            this._nodeData = nodeData;
        }
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

    set id(value) {
        this._id = value;
    }

    get title() {
        return this._title;
    }

    set label(value) {
        this._label = value;
    }

    get min() {
        return this._min;
    }

    set title(value) {
        this._title = value;
    }

    get max() {
        return this._max;
    }

    set min(value) {
        this._min = value;
    }

    set max(value) {
        this._max = value;
    }

    get step() {
        return this._step;
    }

    get color() {
        return this._color;
    }

    set step(value) {
        this._step = value;
    }

    get conv() {
        return this._conv;
    }

    set color(value) {
        this._color = value;
    }

    set conv(value) {
        this._conv = value;
    }

    get prefix() {
        return this._prefix;
    }

    set prefix(value) {
        this._prefix = value;
    }

    get suffix() {
        return this._suffix;
    }

    set suffix(value) {
        this._suffix = value;
    }
}