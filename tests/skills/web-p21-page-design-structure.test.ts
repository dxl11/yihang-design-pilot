import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillDir = path.join(repoRoot, "skills/web/web-page-design");

describe("P2.1 web-page-design skill structure", () => {
  it("has valid frontmatter, sections, and references", () => {
    const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
    const block = extractFrontmatterBlock(skillMd);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as { name: string; description: string };
    expect(fm.name).toBe("web-page-design");
    expect(fm.description.length).toBeGreaterThanOrEqual(40);
    expect(fm.description).toMatch(/page/i);

    for (const heading of [
      "## 定位",
      "## 输入要求",
      "## 执行流程",
      "## 输出要求",
      "## 质量检查",
    ]) {
      expect(skillMd).toContain(heading);
    }

    expect(skillMd).toMatch(/Stage 1|Stage 11/);
    expect(skillMd).toContain("04-page-design");
    expect(skillMd).toMatch(/不.*Design Brief|不是.*重新写 Design Brief/);

    for (const ref of [
      "references/methodology.md",
      "references/output-schema.md",
      "references/quality-checklist.md",
      "references/page-types.md",
      "references/examples.md",
    ]) {
      expect(fs.existsSync(path.join(skillDir, ref)), ref).toBe(true);
    }
  });

  it("workflow marks page-design and review available", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    expect(wf).toMatch(/web-page-design[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-responsive-design[\s\S]*?\*\*available\*\*/);
    expect(wf).toMatch(/web-design-review[\s\S]*?\*\*available\*\*/);
    expect(wf).toContain("04-page-design");
    expect(wf).toContain("skills/web/web-page-design/SKILL.md");
  });

  it("validator includes web-page-design without errors", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toContain("web-page-design");
    expect(names).toContain("web-design-review");
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  });
});
