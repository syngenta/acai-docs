const Grower = require('../../logic/grower');
const Validator = require('../../logic/validator');

exports.requirements = {
    get: {
       availableQuery: ['first', 'last'],
   },
   post: {
       requiredBody: 'post-grower-request',
       before: Validator.isUniqueGrower
   }
}

exports.get = async (request, response) => {
    let growers = await Grower.getAll();
    if (request.queryParams.first) {
        growers = growers.filter(grower => grower.first.startsWith(request.queryParams.first.toLowerCase()));
    }
    if (request.queryParams.last) {
        growers = growers.filter(grower => grower.last.startsWith(request.queryParams.last.toLowerCase()));
    }
    response.compress = true;
    response.body = {'growers': growers.map(grower => grower.export())};
    return response;
};

exports.post = async (request, response) => {
    try {
        const grower = await Grower.convertFromRequest(request.body);
        await grower.create();
        response.body = grower.export();
    } catch(error){
        response.setError('request', error.message);
    }
    return response;
};
