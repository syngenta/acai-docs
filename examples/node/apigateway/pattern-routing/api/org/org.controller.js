const Org = require('./org.logic');
const Validator = require('../common/validator.logic');

exports.requirements = {
    get: {
        requiredHeaders: ['x-org-id'],
        before: Validator.orgExists,
        after: Validator.filterOrgProperties
   },
   post: {
       requiredBody: 'post-org-request',
   },
   patch: {
       requiredHeaders: ['x-org-id'],
       requiredBody: 'patch-org-request'
   }
}

exports.get = async (request, response) => {
    const org = await Org.getByID(request.headers['x-org-id']);
    response.body = org.export();
    return response;
};

exports.post = async (request, response) => {
    try {
        const org = await Org.convertFromRequest(request.body);
        await org.create();
        response.body = org.export();
    } catch(error){
        response.setError('request', error.message);
    }
    return response;
};
