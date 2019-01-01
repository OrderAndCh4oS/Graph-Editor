
export default class Node {

    constructor(id, value, label, title, color, conv, equn) {
        this._id = id;
        this._value = value;
        this._label = label;
        this._title = title;
        this._equn = equn;
        this._color = color || 'blue';
        this._conv = conv || 1;
    }

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

    get equn() {
        return this._equn;
    }
}