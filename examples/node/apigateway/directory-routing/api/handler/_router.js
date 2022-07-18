const {Router} = require('@syngenta-digital/alc').apigateway;

exports.route = async (event) => {
    const router = new Router({
        routingMode: 'directory',
        basePath: 'directory-example',
        handlerPath: 'api/handler'
    });
    return router.route(event);
};
