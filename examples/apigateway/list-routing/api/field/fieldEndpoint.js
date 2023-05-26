const Field = require('./field');

exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}/field'
    }
}

exports.get = async (request, response) => {
    const fields = await Field.getAll(request.pathParams.farmId);
    response.compress = true;
    response.body = {fields: fields.map(field => field.export())}
    return response;
};
