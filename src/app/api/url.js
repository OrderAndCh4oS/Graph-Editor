import { baseUrl } from '../constants';
import extractKey from '../utility/extract-key';

export function makeRoute(endpoint, params = false, key = 'id') {
    return makeUrl(
        makeEndpoint(endpoint, params, key),
        makeParams(params),
    );
}

export function makeUrl(endpoint, params) {
    return baseUrl + endpoint + params;
}

export function makeEndpoint(endpoint, params, key = 'id') {
    const item = extractKey(params, key);
    return item ? endpoint + '/' + item : endpoint;
}

export function makeParams(params) {
    return params
        ? '?' + Object.keys(params)
        .map(key => key + '=' + listValues(params, key))
        .join('&')
        : '';
}

function listValues(params, key) {
    return Array.isArray(params[key])
        ? params[key].join(',')
        : params[key];
}
