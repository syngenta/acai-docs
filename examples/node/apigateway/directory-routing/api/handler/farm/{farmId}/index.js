exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}'
    },
    patch: {
       requiredPath: '/farm/{farmId}'
    },
    delete: {
       requiredPath: '/farm/{farmId}'
   }
}

exports.get = async (request, response) => {
    response.body = {'get-farm': true}
    return response;
};

exports.patch = async (request, response) => {
    response.body = {'patch-farm': true}
    return response;
};

exports.delete = async (request, response) => {
    response.body = {'delete-farm': true}
    return response;
};
