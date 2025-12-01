const create = (status, message) => {
    const err = new Error(message);
    err.status = status;
    err.isApiError = true;
    return err;
};

export const badRequest = (msg = 'Bad Request') => create(400,msg);
export const notFound = (msg = 'Not Found') => create(404, msg);
export const unauthorized = (msg = 'Unauthorized') => create(401, msg);
export const serverError = (msg = 'Internal Server Error') => create(500, msg);