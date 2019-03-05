const uuidv4 = require('uuid/v4');


export default class Node {

    constructor(nodeData) {
        if(nodeData) {
            this._uuid = nodeData.uuid || uuidv4();
            this._id = nodeData.id;
            this._value = nodeData.value;
            this._label = nodeData.label;
            this._title = nodeData.title;
            this._min = nodeData.min;
            this._max = nodeData.max;
            this._step = nodeData.step;
            this._color = nodeData.color;
            this._conv = nodeData.conv;
            this._prefix = nodeData.prefix;
            this._suffix = nodeData.suffix;
        } else {
            this._uuid = uuidv4();
        }
    }

    get uuid() {
        return this._uuid;
    }

    set uuid(value) {
        this._uuid = value;
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