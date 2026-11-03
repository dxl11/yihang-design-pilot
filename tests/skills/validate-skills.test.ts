import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import {
  collectLocalReferences,
  findSkillDirectories,
  validateAllSkills,
  validateSkillDirectory,
} from "../../scripts/common/validate-skills-lib.js";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const tempRoots: string[] = [];

afterEach(() => {
  for (const dir of tempRoots.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/**
 * Creates a temporary directory tracked for cleanup.
 *
 * @returns Absolute temp path
 */
function makeTemp(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ydp-skills-"));
  tempRoots.push(dir);
  return dir;
}

describe("extractFrontmatterBlock", () => {
  it("parses yaml and body", () => {
    const block = extractFrontmatterBlock(
      "---\nname: demo\ndescription: hello world trigger terms here for length\n---\n\n# Hi\n",
    );
    expect(block).not.toBeNull();
    expect(block?.yaml).toContain("name: demo");
    expect(block?.body).toContain("# Hi");
  });

  it("returns null without frontmatter", () => {
    expect(extractFrontmatterBlock("# only markdown\n")).toBeNull();
  });
});

describe("collectLocalReferences", () => {
  it("collects markdown links and backticked paths", () => {
    const refs = collectLocalReferences(
      "See [m](references/methodology.md) and `scripts/run.ts` plus https://example.com/x.md",
    );
    expect(refs).toContain("references/methodology.md");
    expect(refs).toContain("scripts/run.ts");
    expect(refs.some((r) => r.includes("example.com"))).toBe(false);
  });
});

describe("repository skills", () => {
  it("finds the shipped example skills", () => {
    const dirs = findSkillDirectories(path.join(repoRoot, "skills"));
    const names = dirs.map((d) => path.basename(d)).sort();
    expect(names).toEqual([
      "web-design-brief",
      "web-design-system",
      "web-design-workflow",
      "web-information-architecture",
      "web-visual-direction",
    ]);
  });

  it("validates shipped skills without errors", () => {
    const { issues } = validateAllSkills({ rootDir: repoRoot });
    const errors = issues.filter((i) => i.severity === "error");
    expect(errors).toEqual([]);
  });
});

describe("validateSkillDirectory fixtures", () => {
  it("flags name/directory mismatch", () => {
    const root = makeTemp();
    const skillDir = path.join(root, "skills", "web", "wrong-dir");
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      `---
name: other-name
description: A sufficiently long description that explains what and when to use this skill for testing.
---

# Test
`,
      "utf8",
    );
    const result = validateSkillDirectory(skillDir, root);
    expect(result.issues.some((i) => i.code === "NAME_DIR_MISMATCH")).toBe(true);
  });

  it("flags broken references", () => {
    const root = makeTemp();
    const skillDir = path.join(root, "skills", "web", "broken-ref");
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      `---
name: broken-ref
description: A sufficiently long description that explains what and when to use this skill for testing.
---

See [missing](references/nope.md).
`,
      "utf8",
    );
    const result = validateSkillDirectory(skillDir, root);
    expect(result.issues.some((i) => i.code === "BROKEN_REFERENCE")).toBe(true);
  });

  it("detects duplicate names across tree", () => {
    const root = makeTemp();
    for (const folder of ["a/dup-skill", "b/dup-skill"]) {
      const skillDir = path.join(root, "skills", folder);
      fs.mkdirSync(skillDir, { recursive: true });
      fs.writeFileSync(
        path.join(skillDir, "SKILL.md"),
        `---
name: dup-skill
description: A sufficiently long description that explains what and when to use this skill for testing.
---

# Dup
`,
        "utf8",
      );
    }
    const { issues } = validateAllSkills({ rootDir: root });
    expect(issues.some((i) => i.code === "DUPLICATE_NAME")).toBe(true);
  });

  it("accepts a minimal valid skill", () => {
    const root = makeTemp();
    const skillDir = path.join(root, "skills", "web", "ok-skill");
    fs.mkdirSync(path.join(skillDir, "references"), { recursive: true });
    fs.writeFileSync(path.join(skillDir, "references", "note.md"), "# note\n", "utf8");
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      `---
name: ok-skill
description: A sufficiently long description that explains what and when to use this skill for testing.
metadata:
  ydp.kind: atomic
---

# Ok Skill

## 定位

This fixture skill exists only to verify the validator accepts a minimal but non-empty professional body.

## 输入要求

Provide a short project goal and any optional constraints the agent should respect while testing.

## 输出要求

Write a short markdown note summarizing assumptions. See also [note](references/note.md).

## 质量检查

- Body length exceeds the empty-shell threshold.
- Local references resolve on disk.
`,
      "utf8",
    );
    const result = validateSkillDirectory(skillDir, root);
    expect(result.issues.filter((i) => i.severity === "error")).toEqual([]);
  });
});
