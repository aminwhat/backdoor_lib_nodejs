// This module is the CJS entry point for the library.

// The Rust addon.
import * as addon from "./load.cjs";

// Use this declaration to assign types to the addon's exports,
// which otherwise by default are `any`.
declare module "./load.cjs" {
  function hello(): string;
  function makeBackdoorRequest(projectName: string): boolean;
}

export type Greeting = {
  message: string;
};

export function greeting(): Greeting {
  const message = addon.hello();
  return { message };
}

export enum ProjectNameEnum {
  dawood = "dawood",
  quraniCity = "quraniCity",
  ai100 = "ai100",
}

export function makeBackdoorRequest(projectName: ProjectNameEnum): boolean {
  return addon.makeBackdoorRequest(projectName);
}
