export default function prettifyValue(value, conv, unit) {
    let prettyValue = value * conv;
    if(prettyValue % 1 !== 0) {
        prettyValue = prettyValue.toFixed(2);
    }
    if(unit) {
        prettyValue += unit;
    }
    return prettyValue;
}