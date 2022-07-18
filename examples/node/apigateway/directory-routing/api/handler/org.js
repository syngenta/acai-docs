exports.get = async (request, response) => {
    response.body = {'org': true};
    return response;
};
