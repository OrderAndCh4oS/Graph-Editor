/* eslint-disable indent */

import { makeEndpoint, makeRoute, makeUrl } from './make-url';
import { deleteFetch, getFetch, postFetch, putFetch } from './fetch';

export function postRegister({values}) {
    return postFetch(makeRoute('/register'), values);
}

export function postLogin({values: {username, password}}) {
    return postFetch(makeRoute('/login'), {username, password});
}

export function getLogout() {
    return getFetch(makeRoute('/logout'));
}

export function getUser({params}) {
    return getFetch(makeRoute('/user', params));
}

export function putUser({params, values}) {
    return putFetch(makeRoute('/user', params));
}

export function deleteUser({params}) {
    return deleteFetch(makeRoute('/user', params));
}

export function getModel({params}) {
    return getFetch(makeRoute('/model', params));
}

export function postModel({values}) {
    return postFetch(makeRoute('/model'), values);
}

export function putModel({params, values}) {
    return putFetch(makeRoute('/model', params), values);
}

export function deleteModel({params}) {
    return deleteFetch(makeRoute('/model', params));
}

export function getNodes({params}) {
    return getFetch(makeUrl(makeEndpoint('/model', params) + '/node'));
}

export function getNode({params}) {
    return getFetch(makeRoute('/model', params));
}

export function postNode({params, values}) {
    return postFetch(makeUrl(makeEndpoint('/model', params) + '/node'), values);
}

export function putNode({params, values}) {
    return putFetch(makeRoute('/node/', params), values);
}

export function deleteNode({params}) {
    return deleteFetch(makeRoute('/node/', params));
}

