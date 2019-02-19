/* eslint-disable indent */

// const baseURL = 'https://devthree.orderandchaoscreative.com';
const baseURL = 'http://localhost:4000';

export const postRegister = ({values: {username, password}}) => {
    return postFetch(makeUrl('/register'), {username, password});
};

export const postLogin = ({values: {username, password}}) => {
    return postFetch(makeUrl('/login'), {username, password});
};

export const getLogout = () => {
    return getFetch(makeUrl('/logout'));
};

export const getUser = () => {
    return getFetch(makeUrl('/user'));
};

export const putUser = ({values}) => {
    return putFetch(makeUrl('/user', values));
};

export const deleteUser = () => {
    return deleteFetch(makeUrl('/user'));
};

export const getModel = () => {
    return getFetch(makeUrl('/model'));
};

export const putModel = ({params, values}) => {
    return putFetch(makeUrl('/model/' + params.id, values));
};

export const deleteModel = ({params}) => {
    return deleteFetch(makeUrl('/model/' + params.id));
};

export const getNodes = ({params}) => {
    const id = params.id;
    delete params.id;
    return getFetch(makeUrl('/model/' + id + '/node', params));
};

export const getNode = ({params}) => {
    return getFetch(makeUrl('/node/' + params.id));
};

export const postNode = ({params, values}) => {
    return postFetch(makeUrl('/model/' + params.id + '/node'), values);
};

export const putNode = ({params, values}) => {
    return putFetch(makeUrl('/node/' + params.id), values);
};

export const deleteNode = ({params}) => {
    return deleteFetch(makeUrl('/node/' + params.id));
};

export const makeUrl = (endpoint, params = false, withBase = true) => {
    const url = withBase ? baseURL : '';
    params = params ? '?' + createParams(params) : '';
    return url + endpoint + params;
};

const listValues = (params, key) =>
    Array.isArray(params[key]) ? params[key].join(',') : params[key];

const createParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + listValues(params, key))
        .join('&');

const getFetch = function(url) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
    });
};

const deleteFetch = function(url) {
    return fetch(url, {
        method: 'delete',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
        },
    });
};

const postFetch = function(url, data) {
    return fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};

const putFetch = function(url, data) {
    return fetch(url, {
        method: 'put',
        credentials: 'include',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
};
