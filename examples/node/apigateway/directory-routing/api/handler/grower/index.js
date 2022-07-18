const Grower = require('../../logic/grower');

exports.requirements = {
    get: {
       availableQuery: ['first', 'last'],
   }
}

exports.get = async (request, response) => {
    let growers = await Grower.getAll();
    if (request.queryParams.first) {
        growers = growers.filter(grower => grower.first.startsWith(request.queryParams.first.toLowerCase()));
    } else if (request.queryParams.last) {
        growers = growers.filter(grower => grower.last.startsWith(request.queryParams.last.toLowerCase()));
    }
    response.body = {'growers': growers.map(grower => grower.export())};
    return response;
};
