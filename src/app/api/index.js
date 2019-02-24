/* eslint-disable indent */

import { makeEndpoint } from './url';
import Request from './request';

const request = new Request();

export function postRegister(values) {
    return request.post('/register', values);
}

export function postLogin(username, password) {
    return request.post('/login', {username, password});
}

export function getLogout() {
    return request.get('/logout');
}

export function getUser(params = null) {
    return request.get('/user', params);
}

export function putUser(values, params = null) {
    return request.put('/user', values, params);
}

export function deleteUser(params = null) {
    return request.delete('/user', params);
}

export function getModel(params = null) {
    return request.get('/model', params);
}

export function postModel(values, params = null) {
    return request.post('/model', values, params);
}

export function putModel(values, params = null) {
    return request.put('/model', values, params);
}

export function deleteModel(params = null) {
    return request.delete('/model', params);
}

export function getNodes(params = null) {
    const modelEndpoint = makeEndpoint('/model', params, 'modelId');
    return request.get(modelEndpoint + '/node');
}

export function getNode(params = null) {
    return request.get('/node', params);
}

export function postNode(values, params = null) {
    const modelEndpoint = makeEndpoint('/model', params, 'modelId');
    return request.post(modelEndpoint + '/node', values);
}

export function putNode(values, params = null) {
    return request.put('/node', values, params);
}

export function deleteNode(params = null) {
    return request.delete('/node', params);
}

