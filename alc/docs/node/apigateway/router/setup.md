---
title: Set Up
description: How to use the ALC Router
---

## Router Set Up

???+ tip
    View our full project examples here, to have a broader context of what is going on.


### 1. Configure the Lambda

=== "Serverless Framework"

```yaml
functions:
    v1-apigateway-handler:
        handler: api/v1/handler/router.route
        events:
            - http:
                path: /v1/
                method: ANY
            - http:
                path: /v1/{proxy+}
                method: ANY    
```

### 2. Configure the Router

There are three routing modes: `directory`, `pattern` and `list`; `directory` and `pattern` routing mode requires your project files to be placed in a particular way; `list` does not require any structure, as you define every route and it's corresponding file. There is also a an option to use `strictRouting` mode with `directory` or `pattern` which will use dynamic file names. Below are the three ways configure your router:

#### Routing Mode: Directory

???+ info
    If you are using route params, you will need use dynamic file names which follow this pattern: `{some-variable-name}.js`.

=== "file structure"

    ```
    ~~ Directory ~~                     ~~ Route ~~
    ===================================================================
    📦api/v1/                           |          
    │---📂handler                       |           
        │---📜router.js                 |
        │---📜login.js                  | /v1/login    
        │---📂grower                    |
            │---📜index.js              | /v1/grower
            │---📜{growerId}.js         | /v1/grower/{growerId}
        │---📂farm                      |
            │---📜index.js              | /v1/farm
            │---📂{farmId}              |
                │---📜index.js          | /v1/farm/{farmId}
                │---📂field             |
                    │---📜index.js      | /v1/farm/{farmId}/field
                    │---📜{fieldId}.js  | /v1/farm/{farmId}/field/{fieldId}
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/alc').apigateway;

    exports.route = async (event) => {
        const router = new Router({
            routingMode: 'directory',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerPath: 'api/v1/handler'
        });
        return router.route(event);
    };
    ```

#### Routing Mode: Pattern

???+ info
    You can use any [glob](https://en.wikipedia.org/wiki/Glob_(programming)) pattern you like; common patterns are:

    * `/**/*.controller.js`

    * `/**/handler.*.js`

    * `/**/endpoint.js`

=== "file structure"

    ```
    ~~ Pattern ~~                                   ~~ Route ~~
    ================================================================================
    📦api/v1/                                       |
    │---📂handler                                   |
        │---📜router.js                             |
        │---📂login                                 |
            │---📜login.controller.js               | /v1/login
            │---📜login.model.js                    |
            │---📜login.factory.js                  |
            │---📜login.logic.js                    |
        │---📂grower                                |
            │---📜grower.controller.js              | /v1/grower
            │---📜{growerId}.controller.js          | /v1/grower/{growerId}
            │---📜grower.model.js                   |
            │---📜grower.factory.js                 |
            │---📜grower.logic.js                   |
        │---📂farm                                  |
            │---📜farm.controller.js                | /v1/farm
            │---📜farm.logic.js                     |
            │---📜farm.model.js                     |
            │---📂{farmId}                          |
                │---📜{farmId}.controller.js        | /v1/farm/{farmId}
                │---📂field                         |
                    │---📜field.controller.js       | /v1/farm/{farmId}/field
                    │---📜{fieldId}.controller.js   | /v1/farm/{farmId}/field/{fieldId}
                    │---📜field.logic.js            |
                    │---📜field.model.js            |
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/alc').apigateway;

    exports.route = async (event) => {
        const router = new Router({
            routingMode: 'pattern',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerPattern: 'api/v1/**/*.controller.js'
        });
        return router.route(event);
    };
    ```

#### Routing Mode: List

???+ info
    It may be more maintainable to store your routes list in a separate file, this example does not have that for brevity

???+ warning
    Even though you are matching your files to your routes, the handler files must have functions that match HTTP method (see endpoint examples here)

???+ danger
    This is not the preferred routing mode to use; this can lead to a sloppy, unpredictable project architecture which will be hard to maintain and extend. This is *NOT RECOMMENDED*.

=== "file structure"

    ```
    File structure doesn't matter
    ======================================================
    📦api/v1/
    │---📂handler
        │---📜router.js
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/alc').apigateway;

    exports.route = async (event) => {
        const router = new Router({
            routingMode: 'list',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerList: {
                'GET::grower': 'api/v1/routes/grower.js',
                'POST::farm': 'api/v1/routes/farm.js',
                'PUT:farm/{farmId}/field/{fieldId}': 'api/v1/routes/farm-field.js'
            }
        });
        return router.route(event);
    };
    ```


### 3. Configure the Endpoint File

Every endpoint file should contain a function with matches an [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) in lower case. Most common are `post`, `get`, `put`, `patch`, `delete`, but this library does support custom methods, if you so choose. As long as the method of the request matches the function name, it will work.

```js
exports.post = async (request, response) => {
    response.body = {post: true};
    return response;
};

exports.get = async (request, response) => {
    response.body = {get: true};
    return response;
};

exports.patch = async (request, response) => {
    response.body = {patch: true};
    return response;
};

exports.put = async (request, response) => {
    response.body = {put: true};
    return response;
};

exports.delete = async (request, response) => {
    response.body = {delete: true};
    return response;
};

// this is non-compliant, custom http method; this will work.
exports.query = async (request, response) => {
    response.body = [{query: true}];
    return response;
};
```
