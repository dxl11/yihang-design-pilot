import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const p2Skills = [
  "web-design-brief",
  "web-information-architecture",
  "web-design-system",
] as const;

describe("P2 web atomic skills structure", () => {
  for (const name of p2Skills) {
    it(`${name} has required professional sections and references`, () => {
      const skillDir = path.join(repoRoot, "skills/web", name);
      const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
      const block = extractFrontmatterBlock(skillMd);
      expect(block).not.toBeNull();
      const fm = YAML.parse(block!.yaml) as { name: string; description: string };
      expect(fm.name).toBe(name);
      expect(fm.description.length).toBeGreaterThanOrEqual(40);

      for (const heading of [
        "## 定位",
        "## 输入要求",
        "## 执行流程",
        "## 输出要求",
        "## 质量检查",
      ]) {
        expect(skillMd).toContain(heading);
      }

      expect(fs.existsSync(path.join(skillDir, "references/methodology.md"))).toBe(true);
      expect(fs.existsSync(path.join(skillDir, "references/output-schema.md"))).toBe(true);
      expect(fs.existsSync(path.join(skillDir, "references/quality-checklist.md"))).toBe(true);
    });
  }

  it("does not create empty planned skill shell for design-review", () => {
    expect(fs.existsSync(path.join(repoRoot, "skills/web/web-design-review"))).toBe(false);
  });

  it("workflow marks P2 skills available including page-design", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    expect(wf).toMatch(/web-design-brief[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-information-architecture[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-design-system[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-page-design[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-responsive-design[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/并行/);
  });

  it("validator passes for all shipped skills including P2", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toEqual([
      "web-design-brief",
      "web-design-system",
      "web-design-workflow",
      "web-information-architecture",
      "web-page-design",
      "web-responsive-design",
      "web-visual-direction",
    ]);
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  });
});
