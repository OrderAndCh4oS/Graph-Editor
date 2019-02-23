const request = (request, params, values) => {
    return request({params, values}).then(
        response => {
            switch(response.status) {
                case 200:
                case 304:
                case 204:
                    return handleSuccessfulResponse(response);
                case 401:
                    return handleAuthenticationErrorResponse(response);
                case 403:
                    return handleUnauthorisedResponse(response);
                case 404:
                    return handleNotFoundResponse(response);
                case 400:
                    return handleInvalidDataResponse(response);
                case 500:
                    return handleErrorResponse(response);
                default:
                    return response;
            }
        },
        error => {
            return error;
        });
};

const handleSuccessfulResponse = (response) => response.json()
    .then(data => data.data);

const handleAuthenticationErrorResponse = (response) => response.json()
    .then(data => data);

const handleUnauthorisedResponse = (response) => response.json()
    .then(data => data);

const handleNotFoundResponse = (response) => response.json()
    .then(data => data);

const handleInvalidDataResponse = (response) => response.json()
    .then(data => data.errors);

const handleErrorResponse = (response) => response.json()
    .then(data => data);

export default request;
