#!/usr/bin/env node
/**
 * Optional helper for web-visual-verification MODE A.
 * Dynamically loads Playwright if present; never requires it in this repo's package.json.
 *
 * Usage:
 *   node scripts/web/visual-verify-capture.mjs --manifest <path-to-json>
 *   node scripts/web/visual-verify-capture.mjs --check-only
 *
 * Manifest shape (minimal):
 * {
 *   "baseUrl": "http://127.0.0.1:4173",
 *   "outDir": "./tmp/visual-verify-run",
 *   "pages": [{ "id": "home", "path": "/" }],
 *   "viewports": [{ "id": "mobile-375", "width": 375, "height": 812 }]
 * }
 *
 * Exit codes:
 *   0 — success (or check-only: playwright available)
 *   2 — TOOL_NOT_AVAILABLE
 *   3 — invalid arguments / manifest
 *   4 — capture / navigation failure
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * Prints a JSON line status object to stdout.
 *
 * @param {Record<string, unknown>} payload - Status payload
 * @returns {void}
 */
function emit(payload) {
  process.stdout.write(`${JSON.stringify(payload)}\n`);
}

/**
 * Parses CLI argv into flags.
 *
 * @param {string[]} argv - process.argv slice
 * @returns {{ checkOnly: boolean, manifestPath: string | null }}
 */
function parseArgs(argv) {
  let checkOnly = false;
  let manifestPath = null;
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--check-only") checkOnly = true;
    if (a === "--manifest") {
      manifestPath = argv[i + 1] ?? null;
      i += 1;
    }
  }
  return { checkOnly, manifestPath };
}

/**
 * Attempts to import Playwright; returns null when unavailable.
 *
 * @returns {Promise<typeof import("playwright") | null>}
 */
async function tryLoadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    return null;
  }
}

/**
 * Loads and validates a capture manifest.
 *
 * @param {string} filePath - Absolute or relative manifest path
 * @returns {{ baseUrl: string, outDir: string, pages: Array<{id: string, path: string}>, viewports: Array<{id: string, width: number, height: number}> }}
 * @throws {Error} When file missing or shape invalid
 */
function loadManifest(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`manifest not found: ${abs}`);
  }
  const raw = JSON.parse(fs.readFileSync(abs, "utf8"));
  if (!raw || typeof raw.baseUrl !== "string" || !Array.isArray(raw.pages) || !Array.isArray(raw.viewports)) {
    throw new Error("manifest requires baseUrl, pages[], viewports[]");
  }
  return {
    baseUrl: raw.baseUrl,
    outDir: typeof raw.outDir === "string" ? raw.outDir : "./tmp/visual-verify-run",
    pages: raw.pages,
    viewports: raw.viewports,
  };
}

/**
 * Captures screenshots for each page × viewport using Playwright Chromium.
 *
 * @param {Awaited<ReturnType<typeof tryLoadPlaywright>>} playwright - Playwright module
 * @param {ReturnType<typeof loadManifest>} manifest - Capture manifest
 * @returns {Promise<{ captures: Array<Record<string, unknown>> }>}
 */
async function captureAll(playwright, manifest) {
  if (!playwright) {
    throw new Error("playwright module missing");
  }
  const outRoot = path.resolve(manifest.outDir);
  fs.mkdirSync(outRoot, { recursive: true });
  const browser = await playwright.chromium.launch({ headless: true });
  const captures = [];
  try {
    for (const pageDef of manifest.pages) {
      for (const vp of manifest.viewports) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
        });
        const page = await context.newPage();
        const url = new URL(pageDef.path, manifest.baseUrl).toString();
        const dir = path.join(outRoot, pageDef.id, vp.id);
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, "viewport.png");
        try {
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30_000 });
          await new Promise((r) => setTimeout(r, 250));
          await page.screenshot({ path: filePath, fullPage: true });
          captures.push({
            pageId: pageDef.id,
            viewportId: vp.id,
            url,
            path: filePath,
            status: "captured",
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          captures.push({
            pageId: pageDef.id,
            viewportId: vp.id,
            url,
            path: null,
            status: "TEST_EXECUTION_FAILED",
            error: message,
          });
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
  return { captures };
}

/**
 * CLI entry.
 *
 * @returns {Promise<number>} Process exit code
 */
async function main() {
  const { checkOnly, manifestPath } = parseArgs(process.argv.slice(2));
  const playwright = await tryLoadPlaywright();

  if (!playwright) {
    emit({
      status: "TOOL_NOT_AVAILABLE",
      tool: "playwright",
      message:
        "Playwright is not installed in this environment. Install in the user project or use MODE B/C. This Skills repo does not bundle Playwright.",
    });
    return 2;
  }

  if (checkOnly) {
    emit({ status: "READY", tool: "playwright", modeHint: "AUTOMATED" });
    return 0;
  }

  if (!manifestPath) {
    emit({
      status: "INVALID_ARGS",
      message: "Provide --manifest <file> or --check-only",
    });
    return 3;
  }

  let manifest;
  try {
    manifest = loadManifest(manifestPath);
  } catch (err) {
    emit({
      status: "INVALID_ARGS",
      message: err instanceof Error ? err.message : String(err),
    });
    return 3;
  }

  try {
    const result = await captureAll(playwright, manifest);
    const failed = result.captures.some((c) => c.status !== "captured");
    emit({
      status: failed ? "TEST_EXECUTION_FAILED" : "OK",
      tool: "playwright",
      outDir: path.resolve(manifest.outDir),
      captures: result.captures,
    });
    return failed ? 4 : 0;
  } catch (err) {
    emit({
      status: "TEST_EXECUTION_FAILED",
      message: err instanceof Error ? err.message : String(err),
    });
    return 4;
  }
}

const code = await main();
process.exit(code);
