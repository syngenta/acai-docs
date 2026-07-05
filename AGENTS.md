# AGENTS.md

This file has two audiences: an agent working *in this repository* (a static
marketing site), and an agent writing *application code that uses Acai*
elsewhere. Most of the value here is the second part — a verified reference
for how the three Acai runtimes actually work, distilled from primary source
so an agent doesn't have to guess or hallucinate the API surface.

## What this repo is

`acai-docs` is the static landing page for https://www.acaiproject.io/ —
plain HTML/CSS/JS, no build step, no framework, no dependencies.

- `index.html` — all page markup
- `styles.css` — design tokens and layout
- `script.js` — the one stateful interaction (trigger-tab switcher)
- `robots.txt` / `sitemap.xml` / `llms.txt` — crawler/LLM discovery files

To preview locally: `python3 -m http.server 8000` from the repo root, then
open `http://localhost:8000/`. There is no test suite or build step to run —
changes are visual/markup only, so check them in a browser.

Deploys via GitHub Pages on push to `main` (see `CNAME`). This is a
solo-maintained repo; changes land directly on `main`, no PR required.

## What Acai is

Acai is a DRY, declarative framework for AWS Lambda functions, implemented
independently for **Python**, **Node.js**, and **TypeScript** — same
philosophy, same shape, three runtimes. The philosophy is **Happy Path
Programming**: validate every input — via auto-routing, OpenAPI schema
validation, and configurable middleware — before your business logic runs.
No nested `try`/`catch`, no mid-level exceptions, no defensive conditionals.

| Language | Package | Registry | Install | Repo |
|---|---|---|---|---|
| Python | `acai-aws` | PyPI | `pip install acai-aws` | github.com/syngenta/acai-python |
| Node.js | `acai` (repo is named `acai-js`) | npm | `npm install acai` | github.com/syngenta/acai-js |
| TypeScript | `acai-ts` | npm | `npm install acai-ts` | github.com/syngenta/acai-ts |

**Gotcha:** the Node.js repo is `acai-js`, but the published npm package is
just `acai`. `npm install acai-js` installs the wrong (or no) package.

Full docs: acai-python-docs, acai-js-docs, acai-ts-docs (same `syngenta.github.io`
pattern as the repos above).

## Verified API reference

Everything below was checked directly against `src/` in each repo (not just
the READMEs) as of mid-2026. If the installed version has since diverged,
trust the source over this file — but this is a safer starting point than
guessing, since a common failure mode is inventing a `requirements()`
wrapper function for stream handlers, which **does not exist** in either
JS or TS. Both languages use an `Event` class instead — see below.

### API Gateway — router + endpoint

Python (`acai-aws`):
```python
# handler.py
from acai_aws.apigateway.router import Router

router = Router(
    base_path='grower/v1',
    handlers='api/handlers',
    schema='api/openapi.yml'
)
router.auto_load()

def handle(event, context):
    return router.route(event, context)
```
```python
# api/handlers/grower.py
requirements = {
    'post': {'required_body': 'v1-grower-request'}
}

def post(request, response):
    response.body = {'grower': request.body}
    return response
```

Node.js (`acai`) — `Router` is namespaced under `.apigateway`:
```javascript
// handler.js
const { Router } = require('acai').apigateway;

const router = new Router({
    basePath: 'grower/v1',
    handlerPath: 'api/handlers',
    schemaPath: 'api/openapi.yml'
});

exports.handle = async (event) => router.route(event);
```
```javascript
// api/handlers/grower.js
exports.requirements = {
    post: { requiredBody: 'v1-grower-request' }
};

exports.post = async (request, response) => {
    response.body = { grower: request.body };
    return response;
};
```
`requirements` is a plain exported object read by the router — it is
**never** a callable wrapper, for any handler type.

TypeScript (`acai-ts`) — `Router` is a top-level export, decorator-based endpoints:
```typescript
// handler.ts
import { Router } from 'acai-ts';

const router = new Router({
    basePath: 'grower/v1',
    routesPath: './src/handlers/**/*.ts',
    schemaPath: './openapi.yml'
});

export const handler = async (event) => router.route(event);
```
```typescript
// src/handlers/grower.ts
export class GrowerEndpoint extends BaseEndpoint {
    @Validate({ requiredBody: 'v1-grower-request' })
    async post(request: Request, response: Response) {
        response.body = { grower: request.body };
        return response;
    }
}
```

### SQS — validated before it runs

Python:
```python
# handlers/sqs.py
from acai_aws.sqs.requirements import requirements

@requirements(required_body='v1-sqs-event')
def handle(event):
    for record in event.records:
        process(record.body)
```

Node.js — `sqs.Event`, and body validation requires the **async**
`getRecords()` (the sync `.records` getter throws if `requiredBody` is set):
```javascript
// handlers/sqs.js
const { sqs } = require('acai');

exports.handle = async (event) => {
    const sqsEvent = new sqs.Event(event, {
        requiredBody: 'v1-sqs-event',
        schemaPath: 'openapi.yml'
    });
    const records = await sqsEvent.getRecords();
    for (const record of records) {
        await process(record.body);
    }
};
```

TypeScript — same `Event` class (import from the `acai-ts/sqs` subpath),
but the async entry point is named `process()`, and records are read from
the `.records` getter afterward:
```typescript
// src/handlers/sqs.ts
import { Event } from 'acai-ts/sqs';
import { SQSEvent } from 'aws-lambda';

export const handle = async (event: SQSEvent) => {
    const sqsEvent = new Event(event, {
        requiredBody: 'v1-sqs-event',
        schemaPath: './openapi.yml'
    });
    await sqsEvent.process();
    for (const record of sqsEvent.records) {
        await process(record.body);
    }
};
```

### DynamoDB Streams — filtered by operation

Valid `operations` values are **`'create' | 'update' | 'delete'`** — not
`'created'`/`'deleted'` (a mistake worth calling out because it's an easy
one to make). No `requiredBody`/`before`/`getObject` param means the sync
`.records` getter works fine — no need for `getRecords()`/`process()`.

Python:
```python
# handlers/dynamodb.py
from acai_aws.dynamodb.requirements import requirements

@requirements(operations=['create', 'delete'])
def handle(event):
    for record in event.records:
        sync(record.new_image)
```

Node.js:
```javascript
// handlers/dynamodb.js
const { dynamodb } = require('acai');

exports.handle = async (event) => {
    const ddbEvent = new dynamodb.Event(event, {
        operations: ['create', 'delete']
    });
    for (const record of ddbEvent.records) {
        await sync(record.newImage);
    }
};
```

TypeScript:
```typescript
// src/handlers/dynamodb.ts
import { Event } from 'acai-ts/dynamodb';
import { DynamoDBStreamEvent } from 'aws-lambda';

export const handle = async (event: DynamoDBStreamEvent) => {
    const ddbEvent = new Event(event, {
        operations: ['create', 'delete']
    });
    for (const record of ddbEvent.records) {
        await sync(record.newImage);
    }
};
```

### S3 (Node.js — confirmed via `acai` README; same shape applies in `acai-ts`)

```javascript
const { s3 } = require('acai');

exports.handle = async (event) => {
    const s3Event = new s3.Event(event, {
        getObject: true,
        isJSON: true
    });
    const records = await s3Event.getRecords();
    for (const record of records) {
        console.log(record.bucket.name, record.key, record.body);
    }
};
```

### SNS, Kinesis, Firehose, MSK, MQ, DocumentDB

Acai supports all of these as event sources, but their exact config shape
was **not** independently verified for this file — check the per-language
docs sites linked above rather than assuming the SQS/DynamoDB shape
transfers exactly.

## `serverless.yml` wiring (shape is the same across all three languages)

```yaml
functions:
    api-handler:
        handler: api/handler.handle
        events:
            - http: { path: /{proxy+}, method: ANY }
    sqs-handler:
        handler: handlers/sqs.handle
        events:
            - sqs: { arn: !GetAtt GrowerQueue.Arn }
    ddb-handler:
        handler: handlers/dynamodb.handle
        events:
            - stream: { type: dynamodb, arn: !GetAtt GrowerTable.StreamArn }
```
