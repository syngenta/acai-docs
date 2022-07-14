---
title: Record
description: Review S3 Record Structure
---

## S3 Record Object

The S3 event will by default provide instances of `record` classes which will be easier to work with then standard lambda event record object. This is the same object which will be passed down to the `dataClass`, if you provide on in your configuration. Below is a list of all the properties and example outputs for the S3 event record:

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Record Properties

| property                                                                        | type  | description                                                      |
|---------------------------------------------------------------------------------|-------|------------------------------------------------------------------|
| **[`awsRegion`]({{web.url}}/node/s3/record/#record.awsRegion)**                 | str   | the region the record is from                                    |
| **[`body`]({{web.url}}/node/s3/record/#record.body)**                           | object| the object from the bucket in memory; buffer, json or csv object |
| **[`bucket`]({{web.url}}/node/s3/record/#record.bucket)**                       | str   | the name of the bucket                                           |
| **[`configurationId`]({{web.url}}/node/s3/record/#record.configurationId)**     | str   | the id of configuration                                          |
| **[`eventName`]({{web.url}}/node/s3/record/#record.eventName)**                 | str   | the name of the event which invoked the lambda                   |
| **[`eventSource`]({{web.url}}/node/s3/record/#record.eventSource)**             | str   | the source of the event which invoked the lambda                 |
| **[`eventTime`]({{web.url}}/node/s3/record/#record.eventTime)**                 | float | the event time                                                   |
| **[`key`]({{web.url}}/node/s3/record/#record.key)**                             | str   | the bucket key                                                   |
| **[`object`]({{web.url}}/node/s3/record/#record.object)**                       | object| the object described from the bucket                             |
| **[`operation`]({{web.url}}/node/s3/record/#record.operation)**                 | str   | triggered operation lambda (create, delete)                      |
| **[`requestParameters`]({{web.url}}/node/s3/record/#record.requestParameters)** | object| the request parameters                                           |
| **[`responseElements`]({{web.url}}/node/s3/record/#record.responseElements)**   | object| the response parameters                                          |
| **[`s3SchemaVersion`]({{web.url}}/node/s3/record/#record.s3SchemaVersion)**     | object| the s3 schema version                                            |


#### `record.awsRegion`

```javascript
console.log(record.awsRegion);

// example output:
'us-east-2'
```

#### `record.body`

```javascript
console.log(record.body);

// example output: depending on the configuration, it might be a Buffer, CSV, or JSON object
// does require `getObject: true` to be set in the options of the EventClient
```

#### `record.bucket`

```javascript
console.log(record.bucket);

// example output:
{
    "name": "DOC-EXAMPLE-BUCKET",
    "ownerIdentity": {
        "principalId": "A3I5XTEXAMAI3E"
    },
    "arn": "arn:aws:s3:::lambda-artifacts-deafc19498e3f2df"
}
```

#### `record.configurationId`

```javascript
console.log(record.configurationId);

// example output:
'828aa6fc-f7b5-4305-8584-487c791949c1'
```

#### `record.eventName`

```javascript
console.log(record.eventName);

// example output:
'ObjectCreated:Put'
```

#### `record.eventSource`

```javascript
console.log(record.eventSource);

// example output:
'aws:s3'
```

#### `record.eventTime`

```javascript
console.log(record.eventTime);

// example output:
'2019-09-03T19:37:27.192Z'
```

#### `record.key`

```javascript
console.log(record.key);

// example output:
'some-directory/b21b84d653bb07b05b1e6b33684dc11b.json'
```

#### `record.object`

```javascript
console.log(record.object);

// example output:
{
    'key': 'some-directory/b21b84d653bb07b05b1e6b33684dc11b.json',
    'size': 1305107,
    'eTag': 'b21b84d653bb07b05b1e6b33684dc11b',
    'sequencer': '0C0F6F405D6ED209E1'
}
```

#### `record.operation`

```javascript
console.log(record.operation);

// example output:
'create'
```

#### `record.requestParameters`

```javascript
console.log(record.requestParameters);

// example output:
{
    "sourceIPAddress": "205.255.255.255"
}
```

#### `record.responseParameters`

```javascript
console.log(record.responseParameters);

// example output:
{
    "x-amz-request-id": "D82B88E5F771F645",
    "x-amz-id-2": "vlR7PnpV2Ce81l0PRw6jlUpck7Jo5ZsQjryTjKlc5aLWGVHPZLj5NeC6qMa0emYBDXOo6QBU0Wo="
}
```

#### `record.s3SchemaVersion`

```javascript
console.log(record.s3SchemaVersion);

// example output:
"1.0"
```
