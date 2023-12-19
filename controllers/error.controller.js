const main = (error, req, res, next) => {
    const statusCode = error.httpStatus || 500;
    const message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        ...error,
        message
    });

};

export default main;