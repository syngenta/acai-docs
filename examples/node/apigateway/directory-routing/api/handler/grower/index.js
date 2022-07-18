const Grower = require('../../logic/grower');

exports.get = async (request, response) => {
    const growers = await Grower.getAll();
    response.body = {'growers': growers.map(grower => grower.export())};
    return response;
};
