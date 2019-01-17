
export default class Node {

    _value;

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

    get color() {
        return this._color;
    }

    get conv() {
        return this._conv;
    }

    constructor(id, value, label, title, color, conv, unit) {
        this._id = id;
        this._value = value;
        this._label = label;
        this._title = title;
        this._color = color || 'blue';
        this._conv = conv || 1;
        this._unit = unit;
    }

    get unit() {
        return this._unit;
    }
}