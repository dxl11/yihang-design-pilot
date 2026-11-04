import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillDir = path.join(repoRoot, "skills/web/web-design-review");

describe("P2.3 web-design-review skill structure", () => {
  it("has frontmatter, stages, nine dimensions, and references", () => {
    const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
    const block = extractFrontmatterBlock(skillMd);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as { name: string; description: string };
    expect(fm.name).toBe("web-design-review");
    expect(fm.description).toMatch(/review/i);
    expect(fm.description.length).toBeGreaterThanOrEqual(40);

    for (const heading of [
      "## 定位",
      "## 输入要求",
      "## 执行流程",
      "## 输出要求",
      "## 质量检查",
      "## 九个审查维度",
    ]) {
      expect(skillMd).toContain(heading);
    }
    expect(skillMd).toMatch(/Stage 1|Stage 12/);
    expect(skillMd).toContain("06-design-review");
    expect(skillMd).toMatch(/NOT TESTED/);
    expect(skillMd).toMatch(/CRITICAL|Severity|严重/);

    for (const dim of [
      "Visual Quality",
      "Design System Consistency",
      "Information Architecture",
      "Interaction",
      "Responsive Design",
      "Accessibility",
      "Business Goals",
      "Content Quality",
      "Overall Experience",
    ]) {
      expect(skillMd).toContain(dim);
    }

    for (const ref of [
      "references/review-methodology.md",
      "references/evidence-model.md",
      "references/severity.md",
      "references/output-schema.md",
      "references/quality-checklist.md",
      "references/examples.md",
    ]) {
      expect(fs.existsSync(path.join(skillDir, ref)), ref).toBe(true);
    }

    const evidence = fs.readFileSync(path.join(skillDir, "references/evidence-model.md"), "utf8");
    for (const code of [
      "DESIGN_BRIEF",
      "PAGE_DESIGN",
      "RESPONSIVE_DESIGN",
      "DESIGN_SCREENSHOT",
      "BROWSER_TEST",
      "NOT TESTED",
    ]) {
      expect(evidence).toContain(code);
    }

    const severity = fs.readFileSync(path.join(skillDir, "references/severity.md"), "utf8");
    for (const level of ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"]) {
      expect(severity).toContain(level);
    }
  });

  it("workflow marks design-review available", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    expect(wf).toMatch(/web-design-review[\s\S]*?\*\*available\*\*/);
    expect(wf).toContain("06-design-review");
    expect(wf).toContain("skills/web/web-design-review/SKILL.md");
  });

  it("validator includes web-design-review", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toContain("web-design-review");
    expect(names).toHaveLength(8);
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  });
});
