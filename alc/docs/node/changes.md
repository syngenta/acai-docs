---
title: 2.0 Breaking Changes
description: The changes to ALC in version 2.0
---

## Changes to the ALC from 1.x to 2.0

In version 2.0 we have added a lot of cool new features, but that does require deprecating some old things. Below is a list of all the changes:

???+ tip
    If you don't want to make the changes yourself manually, we have a script which will make the changes for you. Just run this command in your terminal from the root of the directory of the project you want to upgrade:
    ```bash
    /bin/bash -c "$(curl -fsSL https://alc.syngenta-digital.com/scripts/node-upgrade.sh)"
    ```

### APIGateway

| old              | new                      | description                                                    |
|------------------|--------------------------|----------------------------------------------------------------|
| `router.route()` | **`router.route(event)`**| `router.route` now requires the event to be passed in          |
| `requiredParams` | **`requiredQuery`**      | `requiredQuery` is how you define required query string params |
| `request.params` | **`request.query`**      | `request.query` is how you access query string params          |

### DynamoDB, S3 & SNS/SQS Event

| old              | new                           | description                                                                           |
|------------------|-------------------------------|---------------------------------------------------------------------------------------|
| `event.records`  | **`await event.getRecords()`**| to use advance validation features, you must the async method; `.records` still works |


### DynamoDB Record

| old                                   | new                    |
|---------------------------------------|------------------------|
| `record.approximateCreationDateTime`  | **`record.created`**   |
| `record.awsRegion`                    | **`record.region`**    |
| `record.eventID`                      | **`record.id`**        |
| `record.eventName`                    | **`record.name`**      |
| `record.eventSource`                  | **`record.source`**    |
| `record.eventSourceARN`               | **`record.sourceARN`** |
| `record.streamViewType`               | **`record.streamType`**|
| `record.sizeBytes`                    | **`record.size`**      |
| `record.userIdentity`                 | **`record.identity`**  |
| `record.timeToLiveExpired`            | **`record.expired`**   |

### S3 Record

| old                                   | new                    |
|---------------------------------------|------------------------|
| `record.awsRegion`                    | **`record.region`**    |
| `record.eventID`                      | **`record.id`**        |
| `record.eventName`                    | **`record.name`**      |
| `record.eventSource`                  | **`record.source`**    |
| `record.eventSourceARN`               | **`record.sourceARN`** |
| `record.requestParameters`            | **`record.request`**   |
| `record.responseElements`             | **`record.response`**  |
| `record.s3SchemaVersion`              | **`record.version`**   |

### SNS/SQS Record

| old                                   | new                    |
|---------------------------------------|------------------------|
| `record.awsRegion`                    | **`record.region`**    |
| `record.eventName`                    | **`record.name`**      |
| `record.eventSource`                  | **`record.source`**    |
| `record.eventSourceARN`               | **`record.sourceARN`** |
| `record.messageId`                    | **`record.id`**        |
| `record.rawBody`                      | **`record.raw`**       |
