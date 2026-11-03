import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/**
 * Reads a UTF-8 file from the repository root.
 *
 * @param relativePath - Path relative to repo root
 * @returns File contents
 */
function readRepo(relativePath: string): string {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

/**
 * Collects markdown link targets that look like local repo paths.
 *
 * @param markdown - Markdown source
 * @returns Unique relative path candidates (no anchors)
 */
function collectLocalMarkdownLinks(markdown: string): string[] {
  const found = new Set<string>();
  for (const match of markdown.matchAll(/\]\((?!https?:\/\/)(?!mailto:)([^)#\s]+)\)/g)) {
    const raw = match[1];
    if (!raw) continue;
    if (raw.startsWith("#")) continue;
    found.add(raw.split("#")[0] ?? raw);
  }
  return [...found];
}

const availableSkills = [
  "web-design-brief",
  "web-information-architecture",
  "web-visual-direction",
  "web-design-system",
  "web-design-workflow",
] as const;

const plannedSkills = [
  "web-page-design",
  "web-responsive-design",
  "web-design-review",
] as const;

describe("bilingual README", () => {
  const zh = readRepo("README.md");
  const en = readRepo("README.en.md");

  it("ships both language files with switcher links", () => {
    expect(fs.existsSync(path.join(repoRoot, "README.md"))).toBe(true);
    expect(fs.existsSync(path.join(repoRoot, "README.en.md"))).toBe(true);
    for (const doc of [zh, en]) {
      expect(doc).toContain("[简体中文](README.md)");
      expect(doc).toContain("[English](README.en.md)");
    }
  });

  it("covers positioning, install, license, and host honesty", () => {
    expect(zh).toMatch(/不是.*Agent Runtime|不是.*SaaS/);
    expect(en).toMatch(/not.*Agent Runtime|not.*SaaS/i);
    expect(zh).toContain("安装指南");
    expect(en).toContain("## Installation");
    expect(zh).toMatch(/MIT/);
    expect(en).toMatch(/MIT/);
    expect(zh).toMatch(/PARTIAL|部分/);
    expect(en).toContain("PARTIAL");
    expect(zh).toContain("BLOCKED");
    expect(en).toContain("BLOCKED");
  });

  it("lists the same Available and Planned Skills", () => {
    for (const name of availableSkills) {
      expect(zh).toContain(name);
      expect(en).toContain(name);
      expect(zh).toMatch(new RegExp(`${name}[\\s\\S]{0,200}?\\*\\*Available\\*\\*`));
      expect(en).toMatch(new RegExp(`${name}[\\s\\S]{0,200}?\\*\\*Available\\*\\*`));
    }
    for (const name of plannedSkills) {
      expect(zh).toContain(name);
      expect(en).toContain(name);
      expect(zh).toMatch(new RegExp(`${name}[\\s\\S]{0,120}?\\*\\*Planned\\*\\*`));
      expect(en).toMatch(new RegExp(`${name}[\\s\\S]{0,120}?\\*\\*Planned\\*\\*`));
      expect(fs.existsSync(path.join(repoRoot, "skills/web", name))).toBe(false);
    }
  });

  it("documents verified install.ps1 parameters", () => {
    for (const doc of [zh, en]) {
      expect(doc).toContain("scripts/install/install.ps1");
      expect(doc).toContain("-HostName all");
      expect(doc).toContain("-ProjectInstall");
      expect(doc).toContain("-Skill");
      expect(doc).toContain("uninstall.ps1");
      expect(doc).toContain("-ForceBackup");
    }
  });

  it("resolves local markdown links from both READMEs", () => {
    for (const doc of [zh, en]) {
      for (const link of collectLocalMarkdownLinks(doc)) {
        const target = path.join(repoRoot, link);
        expect(fs.existsSync(target), `missing link target: ${link}`).toBe(true);
      }
    }
  });
});
