export default class Node {

    constructor(uuid, nodeData) {
        this._uuid = uuid;
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

    get uuid() {
        return this._uuid;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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

    set label(value) {
        this._label = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
    }

    get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
    }

    get step() {
        return this._step;
    }

    set step(value) {
        this._step = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get conv() {
        return this._conv;
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