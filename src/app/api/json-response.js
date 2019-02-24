export default class JsonResponse {
    parse = response => {
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

    handleSuccessful = response => response.json()
        .then(data => data.data);

    handleAuthenticationError = response => response.json()
        .then(data => data);

    handleUnauthorised = response => response.json()
        .then(data => data);

    handleNotFound = response => response.json()
        .then(data => data);

    handleInvalidData = response => response.json()
        .then(data => data.errors);

    handleError = response => response.json()
        .then(data => data);
}