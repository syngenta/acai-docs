const Field = require('./field');

exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
    },
    put: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
    },
    delete: {
       requiredPath: '/farm/{farmId}/field/{fieldId}'
   }
}

exports.get = async (request, response) => {
    const field = await Field.getByID(request.pathParams.farmId, request.pathParams.fieldId);
    response.body = field.export();
    return response;
};

exports.put = async (request, response) => {
    const field = await Field.getByID(request.pathParams.farmId, request.pathParams.fieldId);
    field.merge(request.body);
    await field.update();
    response.body = field.export();
    return response;
};

exports.delete = async (request, response) => {
    const field = await Field.getByID(request.pathParams.farmId, request.pathParams.fieldId);
    await field.delete();
    return response;
};
