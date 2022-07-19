exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field'
   },
    post: {
       requiredPath: '/farm/{farmId}/field'
   }
}

exports.post = async (request, response) => {
    response.body = {'put-field': true}
    return response;
};

exports.get = async (request, response) => {
    response.body = {'delete-field': true}
    return response;
};
