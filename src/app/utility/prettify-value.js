export default function prettifyValue(value, conv, prefix, suffix) {
    let prettyValue = value * conv;
    if(prettyValue % 1 !== 0) {
        prettyValue = prettyValue.toFixed(2);
    }
    if(prefix) {
        prettyValue = prefix + prettyValue;
    }
    if(suffix) {
        prettyValue += suffix;
    }
    return prettyValue;
}