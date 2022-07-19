const GrowerModel = require('../model/grower');

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
}


module.exports = Validator;
