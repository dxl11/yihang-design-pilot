import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tempRoots: string[] = [];

afterEach(() => {
  for (const dir of tempRoots.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("install.ps1 layout", () => {
  it("installs cursor nested and claude/codex flat without overwrite", () => {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), "ydp-install-"));
    tempRoots.push(base);
    const cursorRoot = path.join(base, "cursor-skills");
    const claudeRoot = path.join(base, "claude-skills");

    const run = (host: string, target: string) =>
      spawnSync(
        "powershell",
        [
          "-NoProfile",
          "-File",
          path.join(repoRoot, "scripts/install/install.ps1"),
          "-HostName",
          host,
          "-TargetRoot",
          target,
          "-Skill",
          "web-visual-direction",
        ],
        { encoding: "utf8" },
      );

    const c1 = run("cursor", cursorRoot);
    expect(c1.status, c1.stderr || c1.stdout).toBe(0);
    expect(
      fs.existsSync(path.join(cursorRoot, "web/web-visual-direction/SKILL.md")),
    ).toBe(true);
    expect(
      fs.existsSync(path.join(cursorRoot, "web/web-visual-direction/.ydp-installed.json")),
    ).toBe(true);

    const c2 = run("claude", claudeRoot);
    expect(c2.status, c2.stderr || c2.stdout).toBe(0);
    expect(fs.existsSync(path.join(claudeRoot, "web-visual-direction/SKILL.md"))).toBe(true);
    expect(fs.existsSync(path.join(claudeRoot, "web/web-visual-direction/SKILL.md"))).toBe(
      false,
    );

    const overwrite = run("claude", claudeRoot);
    expect(overwrite.status).not.toBe(0);
    expect(`${overwrite.stderr}${overwrite.stdout}`).toMatch(/Refusing to overwrite/i);
  });
});
