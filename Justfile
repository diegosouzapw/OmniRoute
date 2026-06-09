# OmniRoute Justfile
set shell := ["bash", "-cu"]

default:
    @just --list

install:
    npm install

build:
    npm run build

test:
    npm test

lint:
    npx eslint . --ext .ts
    npx prettier --check "**/*.ts"

fmt:
    npx prettier --write "**/*.ts"

ci: install build test lint

clean:
    rm -rf node_modules dist
