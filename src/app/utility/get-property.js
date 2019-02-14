export default function getProperty(property, defaultValue = null) {
    return property ? property : defaultValue;
}