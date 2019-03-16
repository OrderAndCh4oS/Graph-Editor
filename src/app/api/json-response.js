import ResponseType from './response-type';

export default class JsonResponse {
    handleResponse = response => {
        switch(response.status) {
            case 200:
            case 304:
            case 204:
                return this.handleSuccessful(response);
            case 401:
                return this.handleAuthenticationError(response);
            case 403:
                return this.handleUnauthorised(response);
            case 404:
                return this.handleNotFound(response);
            case 400:
                return this.handleInvalidData(response);
            case 500:
                return this.handleError(response);
            default:
                return response;
        }
    };

    handleErrorResponse = error => {
        error.json();
    };

    handleSuccessful = response => response.json()
        .then(json => ({
            type: ResponseType.SUCCESS,
            data: json.data,
        }));

    handleAuthenticationError = response => response.json()
        .then(json => {
            localStorage.setItem('authenticated', 'false');
            return {
                type: ResponseType.AUTHENTICATION_FAILURE,
                message: json,
            };
        });

    handleUnauthorised = response => response.json()
        .then(json => ({
            type: ResponseType.UNAUTHORIZED,
            message: json.message,
        }));

    handleNotFound = response => response.json()
        .then(json => ({
            type: ResponseType.NOT_FOUND,
            message: json,
        }));

    handleInvalidData = response => response.json()
        .then(json => ({
            type: ResponseType.INVALID,
            errors: json.errors,
        }));

    handleError = response => response.json()
        .then(json => ({
            type: ResponseType.ERROR,
            errors: json,
        }));
}