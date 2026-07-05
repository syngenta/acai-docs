# 🫐 acai-docs

The landing page for **Acai** — live at [www.acaiproject.io](https://www.acaiproject.io/).

Plain HTML/CSS/JS, no build step. `index.html` is the whole page, `styles.css`
holds the design tokens, `script.js` runs the one bit of interactivity (the
trigger-tab code switcher). Deploys via GitHub Pages on push to `main`.

## 🤔 What's Acai?

A DRY, declarative framework for AWS Lambda functions — the same philosophy
implemented independently for **Python** (`acai-aws`), **Node.js** (`acai`),
and **TypeScript** (`acai-ts`).

The idea is **Happy Path Programming**: validate every input *before* your
business logic runs — via auto-routing, OpenAPI schema validation, and
configurable middleware — so your code never has to defend itself. No nested
`try`/`catch`, no mid-level exceptions. Just the path it was meant to take.

## 🔗 Links

| | Docs | Source |
|---|---|---|
| 🐍 Python | [acai-python-docs](https://syngenta.github.io/acai-python-docs/) | [acai-python](https://github.com/syngenta/acai-python) |
| 🟢 Node.js | [acai-js-docs](https://syngenta.github.io/acai-js-docs/) | [acai-js](https://github.com/syngenta/acai-js) |
| 🔷 TypeScript | [acai-ts-docs](https://syngenta.github.io/acai-ts-docs/) | [acai-ts](https://github.com/syngenta/acai-ts) |

## 🤖 Working on this repo with an AI agent?

See [`AGENTS.md`](AGENTS.md) — a verified reference for how the Router and
event handlers actually work in each language, plus notes on running this
site locally.
