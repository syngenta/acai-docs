---
title: Record
description: Review S3 Record Structure
---

## S3 Record Object

The DynamoDB event will by default provide instances of `record` classes which will be easier to work with then standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the DynamoDB event record:

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Record Properties

| property                                                                                                 | type  | description                                           |
|----------------------------------------------------------------------------------------------------------|-------|-------------------------------------------------------|
| **[`awsRegion`]({{web.url}}/node/dynamodb/record/#record.awsRegion)**                                    | str   | the region the record is from                         |
| **[`eventID`]({{web.url}}/node/dynamodb/record/#record.eventID)**                                        | str   | the id of the event which invoked the lambda          |
| **[`eventName`]({{web.url}}/node/dynamodb/record/#record.eventName)**                                    | str   | the name of the event which invoked the lambda        |
| **[`eventSource`]({{web.url}}/node/dynamodb/record/#record.eventSource)**                                | str   | the source of the event which invoked the lambda      |
| **[`keys`]({{web.url}}/node/dynamodb/record/#record.keys)**                                              | object| the keys of DynamoDB record                           |
| **[`oldImage`]({{web.url}}/node/dynamodb/record/#record.oldImage)**                                      | object| the old image of dynamodb record; updated or deleted  |
| **[`newImage`]({{web.url}}/node/dynamodb/record/#record.newImage)**                                      | object| the new image of dynamodb record; created or updated  |
| **[`body`]({{web.url}}/node/dynamodb/record/#record.body)**                                              | object| the new image of dynamodb record; created or updated  |
| **[`operation`]({{web.url}}/node/dynamodb/record/#record.operation)**                                    | str   | triggered operation lambda (create, update, delete)   |
| **[`eventSourceARN`]({{web.url}}/node/dynamodb/record/#record.eventSourceARN)**                          | str   | the event source arn                                  |
| **[`eventVersion`]({{web.url}}/node/dynamodb/record/#record.eventVersion)**                              | str   | the event version                                     |
| **[`streamViewType`]({{web.url}}/node/dynamodb/record/#record.streamViewType)**                          | str   | the stream view type                                  |
| **[`sizeBytes`]({{web.url}}/node/dynamodb/record/#record.sizeBytes)**                                    | int   | the size in bytes of the record                       |
| **[`approximateCreationDateTime`]({{web.url}}/node/dynamodb/record/#record.approximateCreationDateTime)**| float | the approximate creationDate time                     |
| **[`userIdentity`]({{web.url}}/node/dynamodb/record/#record.userIdentity)**                              | object| the identity who triggered the dynamodb change|
| **[`timeToLiveExpired`]({{web.url}}/node/dynamodb/record/#record.timeToLiveExpired)**                    | boo   | whether the ttl has expired                           |

#### `record.awsRegion`

```javascript
console.log(record.awsRegion);

// example output:
'us-east-2'
```

#### `record.eventID`

```javascript
console.log(record.eventID);

// example output:
'9a37c0d03eb60f7cf70cabc823de9907'
```

#### `record.eventName`

```javascript
console.log(record.eventName);

// example output:
'INSERT'
```

#### `record.eventSource`

```javascript
console.log(record.eventSource);

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

#### `record.eventSourceARN`

```javascript
console.log(record.eventSourceARN);

// example output:
'arn:aws:dynamodb:us-east-1:771875143460:table/test-example/stream/2019-10-04T23:18:26.340'
```

#### `record.eventVersion`

```javascript
console.log(record.eventVersion);

// example output:
'1.1'
```

#### `record.streamViewType`

```javascript
console.log(record.streamViewType);

// example output:
'NEW_AND_OLD_IMAGES'
```

#### `record.sizeBytes`

```javascript
console.log(record.sizeBytes);

// example output:
1124
```

#### `record.approximateCreationDateTime`

```javascript
console.log(record.approximateCreationDateTime);

// example output:
1538695200.0 //unix timestamp
```

#### `record.userIdentity`

```javascript
console.log(record.userIdentity);

// example output:
{
    type: 'Service',
    principalId: 'dynamodb.amazonaws.com'
}
```

#### `record.timeToLiveExpired`

```javascript
console.log(record.timeToLiveExpired);

// example output:
false
```
