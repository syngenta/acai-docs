---
title: Response
description: ALC Response Object
---

## Response Object

By default, every endpoint function will receive an instance of the `ResponseClient` class (aka `response`) as the second argument of their function. This response object is meant to provide consistency to HTTP response codes and error signatures. Below is a list and examples of all the properties of the `response`:

???+ example
    Don't like reading documentation? Then look at [our examples](https://github.com/syngenta-digital/docs-markdown-alc/tree/main/examples/node/apigateway) which can run locally! :nerd:

### Response Properties

| property                                                                  | type  | description                                                   |
|---------------------------------------------------------------------------|-------|---------------------------------------------------------------|
| [`headers`]({{web.url}}/node/apigateway/response/#responseheaders)        | object| provide headers in key/value pairs to add new headers         |
| [`code`]({{web.url}}/node/apigateway/response/#responsecode)              | int   | http response code to be returned the requester               |
| [`body`]({{web.url}}/node/apigateway/response/#responsebody)              | any   | body of the response automatically converted to JSON string   |
| [`rawBody`]({{web.url}}/node/apigateway/response/#responserawbody)        | any   | body of the response not converted to JSON string             |
| [`compress`]({{web.url}}/node/apigateway/response/#responsecompress)      | bool  | will compress the body if set to true and add proper headers  |
| [`setError`]({{web.url}}/node/apigateway/response/#responseseterror)      | func  | function to set an error with a key and value                 |
| [`hasError`]({{web.url}}/node/apigateway/response/#responsehaserror)      | boolen| simple property to check if response already has errors in it |


#### `response.headers`

```js
response.headers = {status: 'ok'};
response.headers = {response_id: 'some-guid'};

console.log(response.headers);

// example output:
{
    status: 'ok',
    response_id: 'some-guid',
}
```

#### `response.code`

```js
response.code = 418;

console.log(response.code);

// example output:
418
```

#### `response.body`

???+ info
    This will automatically convert the body to json if possible when called.

```js
response.body = {someKey: 'someValue'};

console.log(response.body);

// example output:
'{"someKey":"someValue"}'
```

#### `response.rawBody`

???+ info
    This will NOT automatically convert the body to json if possible when called. This is great when working with an `afterAll` method that wants to mutate the body of the response before returning to the user.

```js
response.rawBody = {someKey: 'someValue'};

console.log(response.rawBody);

// example output:
{
    someKey: 'someValue'
}
```

#### `response.compress`

???+ info
    This will compress whatever is in the body property.

```js
response.compress = true;

console.log(response.body);
// example output: this will gzip and compress the body.
```

#### `response.setError(key, value)`

```js
const someKey = 'abc123';
response.setError('someKey', `${someKey} is not a valid key to use with this service; try again with a different key`);
const anotherKey = 'def456';
response.setError('anotherKey', `${anotherKey} is not the correct type to operate on`);

console.log(response.rawBody);

// example output:
{
    errors: [
        {
            key_path: 'someKey',
            message: 'abc123 is not a valid key to use with this service; try again with a different key'
        },
        {
            key_path: 'anotherKey',
            message: 'def456 is not the correct type to operate on'
        }
    ]
}
```

#### `response.hasError`

```js
response.setError('user', `your access is denied`);
console.log(response.hasError);

// example output:
true


response.body = {user: 'you have been granted access'};
console.log(response.hasError);

// example output:
false
```
