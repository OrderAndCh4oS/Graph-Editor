export default function extractKey(object, key) {
    if(object && object.hasOwnProperty(key)) {
        const value = object[key];
        delete object[key];
        return value;
    }
    return false;
}