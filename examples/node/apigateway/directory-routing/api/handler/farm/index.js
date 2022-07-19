exports.post = async (request, response) => {
    response.body = {'post-farm': true}
    return response;
};

exports.get = async (request, response) => {
    response.body = {'get-farm': true}
    return response;
};
