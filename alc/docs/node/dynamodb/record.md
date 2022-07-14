---
title: Record
description: Review DynamoDB Record Structure
---

## DynamoDB Record Object

The DynamoDB event will by default provide instances of `record` classes which will be easier to work with then standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the DynamoDB event record:

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Record Properties

| property                                                                                                 | type  | description                                           |
|----------------------------------------------------------------------------------------------------------|-------|-------------------------------------------------------|
| **[`region`]({{web.url}}/node/dynamodb/record/#record.region)**                                    | str   | the region the record is from                         |
| **[`id`]({{web.url}}/node/dynamodb/record/#record.id)**                                        | str   | the id of the event which invoked the lambda          |
| **[`name`]({{web.url}}/node/dynamodb/record/#record.name)**                                    | str   | the name of the event which invoked the lambda        |
| **[`source`]({{web.url}}/node/dynamodb/record/#record.source)**                                | str   | the source of the event which invoked the lambda      |
| **[`keys`]({{web.url}}/node/dynamodb/record/#record.keys)**                                              | object| the keys of DynamoDB record                           |
| **[`oldImage`]({{web.url}}/node/dynamodb/record/#record.oldImage)**                                      | object| the old image of dynamodb record; updated or deleted  |
| **[`newImage`]({{web.url}}/node/dynamodb/record/#record.newImage)**                                      | object| the new image of dynamodb record; created or updated  |
| **[`body`]({{web.url}}/node/dynamodb/record/#record.body)**                                              | object| the new image of dynamodb record; created or updated  |
| **[`operation`]({{web.url}}/node/dynamodb/record/#record.operation)**                                    | str   | triggered operation lambda (create, update, delete)   |
| **[`sourceARN`]({{web.url}}/node/dynamodb/record/#record.sourceARN)**                          | str   | the event source arn                                  |
| **[`version`]({{web.url}}/node/dynamodb/record/#record.version)**                              | str   | the event version                                     |
| **[`streamType`]({{web.url}}/node/dynamodb/record/#record.streamType)**                          | str   | the stream view type                                  |
| **[`size`]({{web.url}}/node/dynamodb/record/#record.size)**                                    | int   | the size in bytes of the record                       |
| **[`created`]({{web.url}}/node/dynamodb/record/#record.created)**| float | the approximate creationDate time                     |
| **[`identity`]({{web.url}}/node/dynamodb/record/#record.identity)**                              | object| the identity who triggered the dynamodb change|
| **[`expired`]({{web.url}}/node/dynamodb/record/#record.expired)**                    | bool  | whether the ttl has expired                           |

#### `record.region`

```javascript
console.log(record.region);

// example output:
'us-east-2'
```

#### `record.id`

```javascript
console.log(record.id);

// example output:
'9a37c0d03eb60f7cf70cabc823de9907'
```

#### `record.name`

```javascript
console.log(record.name);

// example output:
'INSERT'
```

#### `record.source`

```javascript
console.log(record.source);

// example output:
'aws:dynamodb'
```

#### `record.keys`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.keys);

// example output:
{
    example_id: '123456789'
}
```

#### `record.oldImage`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.oldImage);

// example output:
{
    old_data: '123456789'
}
```

#### `record.newImage`

???+ info
    This is converted from the original DDB JSON to standard json

```javascript
console.log(record.newImage);

// example output:
{
    new_data: '123456789'
}
```

#### `record.body`

???+ info
    This is converted from the original DDB JSON to standard json from `newImage`

```javascript
console.log(record.body);

// example output:
{
    new_data: '123456789'
}
```

#### `record.operation`

```javascript
console.log(record.operation);

// example output:
'create'
```

#### `record.sourceARN`

```javascript
console.log(record.sourceARN);

// example output:
'arn:aws:dynamodb:us-east-1:771875143460:table/test-example/stream/2019-10-04T23:18:26.340'
```

#### `record.version`

```javascript
console.log(record.version);

// example output:
'1.1'
```

#### `record.streamType`

```javascript
console.log(record.streamType);

// example output:
'NEW_AND_OLD_IMAGES'
```

#### `record.size`

```javascript
console.log(record.size);

// example output:
1124
```

#### `record.created`

```javascript
console.log(record.created);

// example output:
1538695200.0 //unix timestamp
```

#### `record.identity`

```javascript
console.log(record.identity);

// example output:
{
    type: 'Service',
    principalId: 'dynamodb.amazonaws.com'
}
```

#### `record.expired`

```javascript
console.log(record.expired);

// example output:
false
```
