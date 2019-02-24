export default class Fetch {

    constructor(headers, options) {
        this._headers = headers || {
            'Accept': 'application/json; charset=utf-8',
        };
        this._options = options || {
            credentials: 'include',
        };
    }

    get(url, headers, options) {
        return fetch(url, {
            method: 'get',
            headers: {
                ...this._headers,
                ...headers,
            },
            ...this._options,
            ...options,
        });
    }

    delete(url, headers, options) {
        return fetch(url, {
            method: 'delete',
            headers: {
                ...this._headers,
                ...headers,
            },
            ...this._options,
            ...options,
        });
    }

    post(url, data, headers, options) {
        return fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers,
                ...headers,
            },
            body: JSON.stringify(data),
            ...this._options,
            ...options,
        });
    }

    put(url, data, headers, options) {
        return fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                ...this._headers,
                ...headers,
            },
            body: JSON.stringify(data),
            ...this._options,
            ...options,
        });
    }
}
