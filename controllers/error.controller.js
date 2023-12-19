const main = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    // res.status(statusCode).json({
    //     message
    // });

    res.status(error.httpStatus || 500).send(error);

    // res.send(error);

};

export default main;