---
title: Configurations
description: Configure S3 ALC Events
---

## Event Configurations

The S3 event will automatically handle many common things done when eventing off a S3 event. Developers then have the ability to further extend that functionality with custom middleware. Below is a full list of all the configurations available and examples of their use.

???+ example
    Don't like reading documentation? Then look at our examples which can run locally! :nerd:

### Configuration Options

| option                | type      | required | default                        | description                                                                 |
|-----------------------|-----------|----------|--------------------------------|-----------------------------------------------------------------------------|
| **`globalLogger`**    | bool      | no       | false                          | will assign the ALC logger to the global variable `globalLogger`            |
| **`operations`**      | array     | no       | ['create', 'update', 'delete'] | will only run if record was created from the listed operation               |
| **`operationError`**  | bool      | no       | false                          | will raise exception if operation of record is not from listed operations   |
| **`requiredBody`**    | str or obj| no       | null                           | will validate body of record against this schema, requires `isJSON`         |
| **`schemaPath`**      | str       | no       | null                           | file path pointing to the location of the openapi.yml file                  |
| **`validationError`** | bool      | no       | false                          | will raise exception if validation of record fails                          |
| **`getObject`**       | bool      | no       | false                          | will pull the file from S3 bucket and hold in memory                        |
| **`isJSON`**          | bool      | no       | false                          | will convert file into JSON object; requires `getObject`                    |
| **`isCSV`**           | bool      | no       | false                          | will convert file into CSV object; requires `getObject`                     |
| **`dataClass`**       | class     | no       | null                           | a custom class that will be passed instead of the records object            |
| **`before`**          | func      | no       | null                           | a custom function to be ran before your records are pulled                  |


### Example: S3 Configuration Options

```js
const EventClient = require('@syngenta-digital/alc').s3.Event;
const Grower = require('api/v1/logic/grower');

exports.eventer = async (event) => {
    const options = {
        globalLogger: true,
        operations: ['create', 'delete'] // [create, update, delete] by default; s3 doesn't support delete
        operationError: false, // will raise exception if wrong operation;  default false
        requiredBody: 'v1-s3-record', // only works with isJSON
        schemaPath: 'api/openapi.yml', // only works with isJSON
        validationError: false, // will raise exception if validation fails;  default false
        getObject: true, // required for isJSON or isCSV
        isJSON: true, // will convert file into JSON object, must be valid JSON file
        isCSV: false, // will convert file into object, must be valid CSV file
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
