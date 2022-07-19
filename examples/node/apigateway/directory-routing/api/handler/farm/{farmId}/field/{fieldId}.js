exports.requirements = {
    put: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
   },
    delete: {
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
