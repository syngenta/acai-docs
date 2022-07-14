---
title: Configurations
description: The different options available to configure the router
---

## Router Configurations

As mentioned previously, the router is highly configurable to each project needs and desires. The point of the router is to enforce predictable thus making the API more extensible. Below is a table of all the configuration options available:

### Configuration Options

| option                  | type  | required                            | description                                                                       |
|-------------------------|-------|-------------------------------------|-----------------------------------------------------------------------------------|
| **`event`**             | object| yes                                 | the event object from the handler must be passed in here                          |
| **`basePath`**          | str   | yes                                 | the base path of the API Gateway instance this is running on                      |
| **`routingMode`**       | enum  | yes; directory or pattern or list   | determines how to route requests to the right files; 3 modes                      |
| **`handlerPath`**       | str   | yes, if `routingMode` == directory  | file path pointing to the directory where the endpoints are                       |
| **`handlerPattern`**    | str   | yes, if `routingMode` == pattern    | glob pattern to be able to find the endpoint files                                |
| **`handlerList`**       | object| yes, if `routingMode` == list       | object key, value pair to be able to map routes to files                          |
| **`schemaPath`**        | str   | yes, if `autoValidate`              | file path pointing to the location of the openapi.yml file                        |
| **`autoValidate`**      | bool  | no; requires `schemaPath`           | will automatically validate request against openapi.yml                           |
| **`strictValidation`**  | bool  | no                                  | will validate data formats of request against openapi                             |
| **`globalLogger`**      | bool  | no                                  | will assign the ALC logger to the global variable `globalLogger`                  |
| **`beforeAll`**         | func  | no                                  | will call this function before EVERY request to the API                           |
| **`afterAll`**          | func  | no                                  | will call this function after EVERY request to the API                            |
| **`withAuth`**          | func  | no                                  | will call this function when `requirements` have `requiredAuth` set to `true`     |
| **`onError`**           | func  | no                                  | will call this function on every unhandled error; not including validation errors |
| **`loggerCallback`**    | func  | no                                  | will call this function on every call to `global.logger`                           |

### Example: Router Config with Directory Routing

```js

const {Router} = require('@syngenta-digital/alc').apigateway;
const MiddlewareUtils = require('api/v1/logic/utils/middleware');
const Authenticator = require('api/v1/logic/authenticator');

exports.route = async (event) => {
    const router = new Router({
        event: event,
        basePath: 'api/v1',
        routingMode: 'directory',
        handlerPath: 'api/v1/handler',
        schemaPath: 'api/openapi.yml',
        strictValidation: true,
        autoValidate: true,
        globalLogger: true,
        beforeAll: MiddlewareUtils.beforeAll,
        afterAll: MiddlewareUtils.afterAll,
        onError: MiddlewareUtils.onError,
        withAuth: Authenticator.authenticate,
        loggerCallback: MiddlewareUtils.loggerCallback,
    });
    return router.route();
};
```

### Example: Router Config with Pattern Routing

```js

const {Router} = require('@syngenta-digital/alc').apigateway;
const MiddlewareUtils = require('api/v1/logic/utils/middleware');
const Authenticator = require('api/v1/logic/authenticator');

exports.route = async (event) => {
    const router = new Router({
        event: event,
        basePath: 'api/v1',
        routingMode: 'pattern',
        handlerPattern: 'api/v1/**/*.controller.js'
        schemaPath: 'api/openapi.yml',
        strictValidation: true,
        autoValidate: true,
        globalLogger: true,
        beforeAll: MiddlewareUtils.beforeAll,
        afterAll: MiddlewareUtils.afterAll,
        onError: MiddlewareUtils.onError,
        withAuth: Authenticator.authenticate,
        loggerCallback: MiddlewareUtils.loggerCallback,
    });
    return router.route();
};
```

### Example: Router Config with List Routing

```js

const {Router} = require('@syngenta-digital/alc').apigateway;
const MiddlewareUtils = require('api/v1/logic/utils/middleware');
const Authenticator = require('api/v1/logic/authenticator');

const routes = {
    'GET::grower': 'api/v1/routes/grower.js',
    'POST::farm': 'api/v1/routes/farm.js',
    'PUT:farm/{farmId}/field/{fieldId}': 'api/v1/routes/farm-field.js'
}

exports.route = async (event) => {
    const router = new Router({
        event: event,
        basePath: 'api/v1',
        routingMode: 'list',
        handlerList: routes,
        schemaPath: 'api/openapi.yml',
        strictValidation: true,
        autoValidate: true,
        globalLogger: true,
        beforeAll: MiddlewareUtils.beforeAll,
        afterAll: MiddlewareUtils.afterAll,
        onError: MiddlewareUtils.onError,
        withAuth: Authenticator.authenticate,
        loggerCallback: MiddlewareUtils.loggerCallback
    });
    return router.route();
};
```
