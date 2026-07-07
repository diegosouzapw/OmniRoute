"use strict";

const { createRequire } = require("node:module");

const requireFromProject = createRequire(`${process.cwd()}/package.json`);
const compiled = requireFromProject("next/dist/server/route-modules/app-page/module.compiled.js");

module.exports = {
  ...compiled,
  K: compiled.AppPageRouteModule,
};
