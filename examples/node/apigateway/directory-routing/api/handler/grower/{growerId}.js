const Grower = require('../../logic/grower');
const Validator = require('../../logic/validator');

exports.requirements = {
    patch: {
       requiredPath: '/grower/{growerId}',
       requiredBody: 'patch-grower-request',
       before: Validator.growerExists
   },
   delete: {
       requiredPath: '/grower/{growerId}',
       before: Validator.growerExists
   }
}

exports.patch = async (request, response) => {
    const grower = await Grower.getByID(request.pathParams.growerId);
    grower.merge(request.body);
    await grower.update();
    response.body = grower.export();
    return response;
};

exports.delete = async (request, response) => {
    const grower = await Grower.getByID(request.pathParams.growerId);
    await grower.delete();
    return response;
};
