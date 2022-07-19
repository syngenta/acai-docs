exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field'
    }
}

exports.get = async (request, response) => {
    response.body = {'get-field': true}
    return response;
};
