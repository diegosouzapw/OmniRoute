# CFO ERP API

[![API CI](https://github.com/diegosouzapw/OmniRoute/actions/workflows/api-ci.yml/badge.svg?branch=main)](https://github.com/diegosouzapw/OmniRoute/actions/workflows/api-ci.yml)

This service provides the API for the CFO/ERP demo used in the repository. CI runs the API test suite with coverage and enforces a minimum coverage threshold on every push and pull request.

## Quick commands

- Install deps: npm ci
- Run tests (with coverage): npm test
- Check coverage thresholds locally: npm run check-coverage

## Coverage thresholds

Enforced in CI: statements, branches, functions, lines >= 60%.

