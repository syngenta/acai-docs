---
title: Router Set Up
description: How to use the ALC Router
---

## Set Up

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

#### Routing Mode: Directory [Best]

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
            event: event,
            routingMode: 'directory',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerPath: 'api/v1/handler'
        });
        return router.route();
    };
    ```

#### Routing Mode: Pattern (non-strict) [Better]

???+ info
    You can use any [glob](https://en.wikipedia.org/wiki/Glob_(programming)) pattern you like; common patterns are:

    * `/**/*.controller.js`

    * `/**/handler.*.js`

    * `/**/endpoint.js`

=== "file structure"

    ```
    ~~ Pattern ~~                               ~~ Route ~~
    ================================================================================
    📦api/v1/                                       |
    │---📂handler                                   |
        │---📜router.js                             |
        │---📂login                                 |
            │---📜grower.controller.js              | /v1/login
            │---📜grower.model.js                   |
            │---📜grower.factory.js                 |
            │---📜grower.logic.js                   |
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
                    │---📜{fieldID}.controller.js   | /v1/farm/{farmId}/field/{fieldId}
                    │---📜field.logic.js            |
                    │---📜field.model.js            |
    ```

=== "router.js"

    ```js
    const {Router} = require('@syngenta-digital/alc').apigateway;

    exports.route = async (event) => {
        const router = new Router({
            event: event,
            routingMode: 'pattern',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerPattern: 'api/v1/**/*.controller.js'
        });
        return router.route();
    };
    ```

#### Routing Mode: List [Good]

???+ info
    It may be more maintainable to store your routes list in a separate file, this example does not have that for brevity

???+ warning
    Even though you are matching your files to your routes, the handler files must have functions that match HTTP method (see endpoint examples here)

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
            event: event,
            routingMode: 'list',
            basePath: 'api/v1', // for use with custom apigateway domain
            handlerList: {
                'GET::grower': 'api/v1/routes/grower.js',
                'POST::farm': 'api/v1/routes/farm.js',
                'PUT:farm/{farmId}/field/{fieldId}': 'api/v1/routes/farm-field.js'
            }
        });
        return router.route();
    };
    ```
