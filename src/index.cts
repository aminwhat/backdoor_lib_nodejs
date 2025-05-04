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
  Dawood = "dawood",
  Quranicity = "quranicity",
  QuranicCity = "quraniccity",
  // Keep the old enum values for backwards compatibility
  dawood = "dawood",
  quraniCity = "quranicity", // Map this to quranicity
  ai100 = "ai100",
  Ai100 = "ai100",
}

export function makeBackdoorRequest(
  projectName: ProjectNameEnum | string
): boolean {
  // Make sure the input is a string before passing it to the addon
  const projectNameStr = String(projectName);
  return addon.makeBackdoorRequest(projectNameStr);
}
