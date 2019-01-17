
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

    constructor(id, value, label, title, color, conv, unit, min, max, step) {
        this._id = id;
        this._value = value;
        this._label = label;
        this._title = title;
        this._min = min;
        this._max = max;
        this._step = step;
        this._color = color || 'blue';
        this._conv = conv || 1;
        this._unit = unit;
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

    get unit() {
        return this._unit;
    }
}