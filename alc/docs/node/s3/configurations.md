---
title: Configurations
description: Configure S3 ALC Events
---

## Event Configurations

The S3 event will automatically handle many common things done when eventing off a DynamoDB stream. Developers then have the ability to further extend that functionality with custom middleware. Below is a full list of all the configurations available and examples of their use.

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Configuration Options

| option                | type      | required | default                        | description                                                                 |
|-----------------------|-----------|----------|--------------------------------|-----------------------------------------------------------------------------|
| **`globalLogger`**    | bool      | no       | false                          | will assign the ALC logger to the global variable `globalLogger`            |
| **`operations`**      | array     | no       | ['create', 'update', 'delete'] | will only run if record was created from the listed operation               |
| **`operationError`**  | bool      | no       | false                          | will raise exception if operation of record is not from listed operations   |
| **`requiredBody`**    | str or obj| no       | null                           | will validate body of record against this schema                            |
| **`schemaPath`**      | str       | no       | null                           | file path pointing to the location of the openapi.yml file                  |
| **`validationError`** | bool      | no       | false                          | will raise exception if validation of record fails                          |
| **`dataClass`**       | class     | no       | null                           | a custom class that will be passed instead of the records object            |
| **`before`**          | func      | no       | null                           | a custom function to be ran before your records are pulled                  |


### Example: S3 Configuration Options

```js
const EventClient = require('@syngenta-digital/alc').dynamodb.Event;
const Grower = require('api/v1/logic/grower');

exports.stream = async (event) => {
    const options = {
        globalLogger: true,
        operations: ['create', 'update'] // [create, update, delete] by default
        operationError: false, // will raise exception if wrong operation;  default false
        requiredBody: 'v1-ddb-record',
        schemaPath: 'api/openapi.yml',
        validationError: false, // will raise exception if validation fails;  default false
        dataClass: Grower, // will get instance of this instead of record instance
        before: (records) => {
            // run this before records are sent
        }
    }
    const eventClient = new EventClient(event, options);
    const records = await eventClient.getRecords();
    for (const grower of records) {
        // do stuff here
    }
};
```
