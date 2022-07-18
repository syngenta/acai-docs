exports.get = async (request, response) => {
    response.body = {'grower': true};
    return response;
};
