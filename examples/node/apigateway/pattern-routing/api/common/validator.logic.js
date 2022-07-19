const GrowerModel = require('../grower/grower.model');
const OrgModel = require('../org/org.model');

class Validator {

    static async isUniqueGrower(request, response){
        const growerModel = new GrowerModel();
        if (await growerModel.emailExists(request.body.email)){
            response.setError('email', `grower already exists with email ${request.body.email}`);
        }
    }

    static async growerExists(request, response){
        const growerModel = new GrowerModel();
        if (!await growerModel.idExists(request.pathParams.growerId)){
            response.setError('id', `no grower found wth  id ${request.pathParams.growerId}`);
        }
    }

    static async orgExists(request, response){
        const growerModel = new OrgModel();
        if (!await growerModel.idExists(request.headers['x-org-id'])){
            response.setError('id', `no organization found wth  id ${request.headers['x-org-id']}`);
        }
    }

    static async filterOrgProperties(request, response){
        if (request.headers['x-org-id'].startsWith('del')){
            const org = response.rawBody;
            delete org.revenue;
            delete org.profit;
            response.body = org;
        }
        return response;
    }
}

module.exports = Validator;
