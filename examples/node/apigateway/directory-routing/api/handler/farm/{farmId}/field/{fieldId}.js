exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
   },
    post: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
   }
}

exports.put = async (request, response) => {
    response.body = {'put-field': true}
    return response;
};

exports.delete = async (request, response) => {
    response.body = {'delete-field': true}
    return response;
};
