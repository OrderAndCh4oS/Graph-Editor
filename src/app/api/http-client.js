import { makeRoute } from './url';
import Fetch from './fetch';
import JsonResponse from './json-response';

export default class HttpClient {
    constructor(response = null, fetch = null) {
        this._response = response || new JsonResponse();
        this._fetch = fetch || new Fetch();
    }

    request(fetch, params = null, values = null) {
        return fetch({params, values}).then(
            this._response.parse,
            error => {
                return error;
            });
    };

    get(endpoint, params = null) {
        return this._fetch.get(makeRoute(endpoint, params)).then(
            this._response.parse,
            error => {
                return error;
            });
    }

    post(endpoint, values, params = null) {
        return this._fetch.post(makeRoute(endpoint, params), values)
            .then(
                this._response.parse,
                error => {
                    return error;
                });
    }

    put(endpoint, values, params = null) {
        return this._fetch.put(makeRoute(endpoint, params), values)
            .then(
                this._response.parse,
                error => {
                    return error;
                });
    }

    delete(endpoint, params = null) {
        return this._fetch.delete(makeRoute(endpoint, params))
            .then(
                this._response.parse,
                error => {
                    return error;
                });
    }
}
