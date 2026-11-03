import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillDir = path.join(repoRoot, "skills/web/web-responsive-design");

describe("P2.2 web-responsive-design skill structure", () => {
  it("has valid frontmatter, stages, and references", () => {
    const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
    const block = extractFrontmatterBlock(skillMd);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as { name: string; description: string };
    expect(fm.name).toBe("web-responsive-design");
    expect(fm.description.length).toBeGreaterThanOrEqual(40);
    expect(fm.description).toMatch(/responsive/i);

    for (const heading of [
      "## 定位",
      "## 输入要求",
      "## 执行流程",
      "## 输出要求",
      "## 质量检查",
    ]) {
      expect(skillMd).toContain(heading);
    }
    expect(skillMd).toMatch(/Stage 1|Stage 12/);
    expect(skillMd).toContain("05-responsive-design");
    expect(skillMd).toMatch(/NOT TESTED|不.*伪造/);

    for (const ref of [
      "references/methodology.md",
      "references/viewport-strategy.md",
      "references/output-schema.md",
      "references/quality-checklist.md",
      "references/examples.md",
    ]) {
      expect(fs.existsSync(path.join(skillDir, ref)), ref).toBe(true);
    }
  });

  it("does not create design-review shell", () => {
    expect(fs.existsSync(path.join(repoRoot, "skills/web/web-design-review"))).toBe(false);
  });

  it("workflow marks responsive available and review planned", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    expect(wf).toMatch(/web-responsive-design[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-design-review[\s\S]*?\*\*planned\*\*/);
    expect(wf).toContain("05-responsive-design");
    expect(wf).toContain("skills/web/web-responsive-design/SKILL.md");
  });

  it("validator includes web-responsive-design", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toContain("web-responsive-design");
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
