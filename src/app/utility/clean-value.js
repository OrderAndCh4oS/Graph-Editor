export default function cleanValue(value) {
    return (
        value.toString()[0] === '0' &&
        value.toString()[1] !== '.'
            ? 0
            : parseFloat(value)
    );
}