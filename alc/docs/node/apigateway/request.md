---
title: Request
description: ALC Request Object
---

## Request Object

By default, every endpoint function will receive an instance of the `RequestClient` class (aka `request`) as the first argument of their function. This `request` has a lot properties which will do things common things automatically, but still allows the developer to override those operations if they deem necessary. Below is a list and examples of all the properties of the `request`:

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Request Properties

| property                                                          | type  | mutable | description                                                   |
|-------------------------------------------------------------------|-------|---------|---------------------------------------------------------------|
| [`method`]({{web.url}}/node/apigateway/request/#method)           | str   | no      | the http method of the request                                |
| [`resource`]({{web.url}}/node/apigateway/request/#resource)       | str   | no      | the AWS resource being invoked                                |
| [`authorizer`]({{web.url}}/node/apigateway/request/#authorizer)   | object| no      | if using a customized authorizer, the authorizer object       |
| [`headers`]({{web.url}}/node/apigateway/request/#headers)         | object| no      | the headers of the request                                    |
| [`params`]({{web.url}}/node/apigateway/request/#params)           | object| no      | combination of query string and path params in one object     |
| [`queryParams`]({{web.url}}/node/apigateway/request/#queryParams) | object| no      | query string parameters from the request                      |
| [`pathParams`]({{web.url}}/node/apigateway/request/#pathParams)   | object| no      | the path parameters of the request                            |
| [`route`]({{web.url}}/node/apigateway/request/#route)             | str   | no      | the requested route with placeholders of params               |
| [`path`]({{web.url}}/node/apigateway/request/#path)               | str   | no      | the raw requested path with actual param values               |
| [`json`]({{web.url}}/node/apigateway/request/#json)               | object| no      | the body of the request, converted from json string in object |
| [`xml`]({{web.url}}/node/apigateway/request/#xml)                 | object| no      | the body of the request, converted from xml string in object  |
| [`graphql`]({{web.url}}/node/apigateway/request/#graphql)         | str   | no      | the body of the graphql request as a string                   |
| [`body`]({{web.url}}/node/apigateway/request/#body)               | any   | no      | the body of the request, converted to based on data type      |
| [`raw`]({{web.url}}/node/apigateway/request/#raw)                 | any   | no      | the raw body of the request no conversion                     |
| [`context`]({{web.url}}/node/apigateway/request/#context)         | object| yes     | mutable request context to assigned and pass around           |
| [`event`]({{web.url}}/node/apigateway/request/#event)             | object| no      | the full event originally coming from the lamdba              |

#### `request.method`

```javascript
console.log(request.method);

// example output:
'get'
```

#### `request.resource`

```js

console.log(request.resource);

// example output:
'/{proxy+}'

```

#### `request.authorizer`

???+ tip
    This is only useful if you are using an external authorizer with your lambda.

```js

console.log(request.authorizer);

// example output:
{
    apiKey: 'SOME KEY',
    userId: 'x-1-3-4',
    correlationId: 'abc12312',
    principalId: '9de3f415a97e410386dbef146e88744e',
    integrationLatency: 572
}

```

#### `request.headers`

```js

console.log(request.headers);

// example output:
{
    'x-api-key': 'SOME-KEY',
    'content-type': 'application/json'
}
```

#### `request.params`

???+ info
    This combines both path parameters and query string parameters, nested in one object.

```js

console.log(request.params);

// example output:
{
    query: {
        name: 'me'
    },
    path: {
        id: 1
    }
}
```

#### `request.queryParams`

```js

console.log(request.queryParams);

// example output:
{
     name: 'me'
}
```

#### `request.pathParams`

```js

console.log(request.pathParams);

// example output:
{
     id: 1
}
```

#### `request.route`

???+ info
    This will provide the route with the path param variables included

```js

console.log(request.route);

// example output:
'v1/grower/{id}'
```

#### `request.path`

???+ info
    This will provide the route with the path param values replacing the variables

```js

console.log(request.path);

// example output:
'v1/grower/1'
```

#### `request.json`

???+ warning
    This will raise an unhandled exception if the body is not json compatible

```js

console.log(request.json);

// example output:
{
    someJsonKey: 'someJsonValue'
}
```

#### `request.xml`

???+ warning
    This will raise an unhandled exception if the body is not xml compatible

```js

console.log(request.xml);

// example output:
{
    someXMLKey: 'someXMLValue'
}
```


#### `request.graphql`

???+ info
    This is graphql string since there is no object equivalent; you can pass this directly to your graphql resolver

```js

console.log(request.graphql);

// example output:
'{
    players {
        name
    }
}'
```

#### `request.body`

???+ tip
    This is the safest way to get the body of the request. It will use the headers to determine the data type using `content-type` header and convert it; if the data can't be converted for whatever reason it will catch the error and return the raw body provided.

```js

console.log(request.body);

// example output:
{
    someXMLKey: 'someXMLValue'
}
```


#### `request.raw`

```js

console.log(request.raw);

// example output: whatever the raw data of the body is; string, json string, xml, binary, etc
```


#### `request.context`

???+ tip
    This is the only mutable property of the request, to be used by any of the `before` or `beforeAll` middleware options

```js

request.context = {application_assignable: true}
console.log(request.context);

// example output:
{
    application_assignable: true
}
```

#### `request.event`

???+ warning
    This is the original full request. Not advisable to use this as defeats the purpose of the entire ALC :smile:. In addition, you don't want to mutate this object and potentially mess up the entire router.

```js

console.log(request.event);

// example output:
{
    "version": "2.0",
    "routeKey": "$default",
    "rawPath": "/my/path",
    "rawQueryString": "parameter1=value1&parameter1=value2&parameter2=value",
    "cookies": [
        "cookie1",
        "cookie2"
    ],
    "headers": {
        "header1": "value1",
        "header2": "value1,value2"
    },
    "queryStringParameters": {
        "parameter1": "value1,value2",
        "parameter2": "value"
    },
    "requestContext": {
        "accountId": "123456789012",
        "apiId": "api-id",
        "authentication": {
            "clientCert": {
                "clientCertPem": "CERT_CONTENT",
                "subjectDN": "www.example.com",
                "issuerDN": "Example issuer",
                "serialNumber": "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
                "validity": {
                    "notBefore": "May 28 12:30:02 2019 GMT",
                    "notAfter": "Aug  5 09:36:04 2021 GMT"
                }
            }
        },
        "authorizer": {
            "jwt": {
                "claims": {
                    "claim1": "value1",
                    "claim2": "value2"
                },
                "scopes": [
                    "scope1",
                    "scope2"
                ]
            }
        },
        "domainName": "id.execute-api.us-east-1.amazonaws.com",
        "domainPrefix": "id",
        "http": {
            "method": "POST",
            "path": "/my/path",
            "protocol": "HTTP/1.1",
            "sourceIp": "IP",
            "userAgent": "agent"
        },
        "requestId": "id",
        "routeKey": "$default",
        "stage": "$default",
        "time": "12/Mar/2020:19:03:58 +0000",
        "timeEpoch": 1583348638390
    },
    "body": "Hello from Lambda",
    "pathParameters": {
        "parameter1": "value1"
    },
    "isBase64Encoded": false,
    "stageVariables": {
        "stageVariable1": "value1",
        "stageVariable2": "value2"
    }
}
```
