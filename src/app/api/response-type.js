const ResponseType = Object.freeze({
    SUCCESS: Symbol('success'),
    ERROR: Symbol('error'),
    INVALID: Symbol('invalid'),
    AUTHENTICATION_FAILURE: Symbol('authentication-failure'),
    UNAUTHORIZED: Symbol('unauthorized'),
    NOT_FOUND: Symbol('not-found'),
});

export default ResponseType;
