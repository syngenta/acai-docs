const Field = require('./field.logic');

exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field'
    }
}

exports.get = async (request, response) => {
    const fields = await Field.getAll(request.pathParams.farmId);
    response.body = {fields: fields.map(field => field.export())}
    return response;
};
