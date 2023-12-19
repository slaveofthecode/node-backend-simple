const conflictError = ( message, code = 'CONFLICT' ) => getError(message, code, 409);
const notFoundError = ( message, code = 'NOT_FOUND' ) => getError(message, code, 404);
const unauthorizedError = ( message, code = 'UNAUTHORIZED' ) => getError(message, code, 401);
const badRequestError = ( message, code = 'BAD_REQUEST' ) => getError(message, code, 400);
const internalServerError = ( message, code = 'INTERNAL_SERVER_ERROR' ) => getError(message, code, 500);
const forbiddenError = ( message, code = 'FORBIDDEN' ) => getError(message, code, 403);
const sendEmailError = ( message, code = 'SEND_EMAIL_ERROR' ) => getError(message, code, 500);
const schemaValidationError = ( message, code = 'SCHEMA_VALIDATION_ERROR' ) => getError(message, code, 400);

function getError(message, code, status) {
    let error = new Error();
    console.log('getError', message, code, status);
    error = {
        ...error,
        message,
        code,
        status,
    };
    
    throw error;
}

export default {
    conflictError,
    notFoundError,
    unauthorizedError,
    badRequestError,
    internalServerError,
    forbiddenError,
    sendEmailError,
    schemaValidationError
}