exports.get = async (request, response) => {
    response.body = {get: true};
    return response;
};
