#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { formatReport, validateAllSkills } from "./validate-skills-lib.js";

/**
 * CLI entry for skill validation.
 *
 * Exit codes:
 * - 0: no errors (warnings allowed)
 * - 1: one or more errors
 *
 * @returns Process exit code
 */
function main(): number {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(here, "../..");
  const { results, issues } = validateAllSkills({ rootDir });
  const report = formatReport(issues, results.length);
  console.log(report);
  const hasError = issues.some((i) => i.severity === "error");
  return hasError ? 1 : 0;
}

process.exit(main());
