const Farm = require('./farm');

exports.requirements = {
    get: {
       requiredPath: '/farm/{farmId}'
    },
    patch: {
       requiredPath: '/farm/{farmId}',
       requiredBody: 'patch-farm-request',
       dataClass: Farm
    },
    delete: {
       requiredPath: '/farm/{farmId}'
   }
}

exports.get = async (request, response) => {
    const farm = await Farm.getByID(request.pathParams.farmId);
    response.body = farm.export();
    return response;
};

exports.patch = async (farm, response) => {
    await farm.update();
    response.body = farm.export();
    return response;
};

exports.delete = async (request, response) => {
    const farm = await Farm.getByID(request.pathParams.farmId);
    await farm.delete();
    return response;
};
