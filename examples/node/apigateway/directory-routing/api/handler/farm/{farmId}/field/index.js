exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field'
   },
    post: {
       requiredPath: '/farm/{farmId}/field'
   }
}

exports.post = async (request, response) => {
    response.body = {'post-field': true}
    return response;
};

exports.get = async (request, response) => {
    response.body = {'get-field': true}
    return response;
};
