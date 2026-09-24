import { basename } from "node:path";
import React from "react";

type Choice = { enabled: boolean };

export class Example {
  #label = basename("/fixture/coverage");

  async render({ enabled }: Choice = { enabled: true }) {
    return <section>{enabled ? this.#label : "disabled"}</section>;
  }
}

export function neverCalled() {
  return "uncovered";
}
