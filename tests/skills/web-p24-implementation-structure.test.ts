import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillDir = path.join(repoRoot, "skills/web/web-implementation");

describe("P2.4 web-implementation skill structure", () => {
  it("has frontmatter, stages, core modules, and references", () => {
    const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
    const block = extractFrontmatterBlock(skillMd);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as { name: string; description: string };
    expect(fm.name).toBe("web-implementation");
    expect(fm.description).toMatch(/implement/i);
    expect(fm.description.length).toBeGreaterThanOrEqual(40);

    for (const heading of [
      "## 定位",
      "## 输入要求",
      "## Design Review 准入",
      "## 执行流程",
      "## 代码保护",
      "## 输出要求",
      "## 质量检查",
    ]) {
      expect(skillMd).toContain(heading);
    }

    expect(skillMd).toMatch(/Stage 1[\s\S]*Stage 14/);
    expect(skillMd).toContain("07-web-implementation");
    expect(skillMd).toMatch(/Project Discovery/);
    expect(skillMd).toMatch(/READY_WITH_GAPS|READY/);
    expect(skillMd).toMatch(/BLOCKED/);
    expect(skillMd).toMatch(/MATCHED|DEVIATED|NOT_VERIFIED|NOT_IMPLEMENTED/);
    expect(skillMd).toMatch(/BACKEND_REQUIRED|PLACEHOLDER/);
    expect(skillMd).toMatch(/NEEDS_REVISION/);
    expect(skillMd).toMatch(/不覆盖|保护/);

    for (const ref of [
      "references/project-discovery.md",
      "references/input-readiness.md",
      "references/design-to-code-mapping.md",
      "references/component-page-implementation.md",
      "references/responsive-interaction-a11y.md",
      "references/design-fidelity-review.md",
      "references/verification.md",
      "references/output-schema.md",
      "references/quality-checklist.md",
      "references/examples.md",
    ]) {
      expect(fs.existsSync(path.join(skillDir, ref)), ref).toBe(true);
    }

    const discovery = fs.readFileSync(
      path.join(skillDir, "references/project-discovery.md"),
      "utf8",
    );
    for (const token of ["NO_PROJECT", "package.json", "保护"]) {
      expect(discovery).toContain(token);
    }

    const readiness = fs.readFileSync(
      path.join(skillDir, "references/input-readiness.md"),
      "utf8",
    );
    for (const state of ["READY", "READY_WITH_GAPS", "BLOCKED", "INSUFFICIENT_EVIDENCE"]) {
      expect(readiness).toContain(state);
    }

    const mapping = fs.readFileSync(
      path.join(skillDir, "references/design-to-code-mapping.md"),
      "utf8",
    );
    expect(mapping).toMatch(/Design Tokens/);
    expect(mapping).toMatch(/CSS Variables|变量/);
    expect(mapping).toMatch(/复用|reuse/i);

    const fidelity = fs.readFileSync(
      path.join(skillDir, "references/design-fidelity-review.md"),
      "utf8",
    );
    for (const code of ["MATCHED", "DEVIATED", "NOT_IMPLEMENTED", "NOT_VERIFIED", "NOT_APPLICABLE"]) {
      expect(fidelity).toContain(code);
    }

    const verification = fs.readFileSync(
      path.join(skillDir, "references/verification.md"),
      "utf8",
    );
    for (const code of ["PASS", "FAIL", "PARTIAL", "NOT TESTED", "BLOCKED"]) {
      expect(verification).toContain(code);
    }
    expect(verification).toMatch(/Build PASS|不等于|≠/);
    expect(verification).not.toMatch(/无截图即可宣称视觉 PASS/);
  });

  it("documents boundary scenarios in examples", () => {
    const examples = fs.readFileSync(path.join(skillDir, "references/examples.md"), "utf8");
    for (const edge of [
      "无前端项目",
      "成熟",
      "冲突",
      "BACKEND_REQUIRED",
      "PLACEHOLDER",
      "无浏览器",
      "CASE_DEMO",
    ]) {
      expect(examples).toContain(edge);
    }
  });

  it("workflow v0.6 marks implementation available and visual verification planned", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    const block = extractFrontmatterBlock(wf);
    const fm = YAML.parse(block!.yaml) as { metadata?: Record<string, string> };
    expect(fm.metadata?.version).toBe("0.6.0");
    expect(wf).toMatch(/web-implementation[\s\S]*?\*\*available\*\*/);
    expect(wf).toContain("07-web-implementation");
    expect(wf).toContain("skills/web/web-implementation/SKILL.md");
    expect(wf).toMatch(/NEEDS_REVISION/);
    expect(wf).toMatch(/视觉验证[\s\S]*?\*\*planned\*\*|Visual Verification[\s\S]*?planned/i);
    expect(wf).not.toMatch(/视觉验证[\s\S]{0,40}\*\*available\*\*/);

    const contracts = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/references/stage-contracts.md"),
      "utf8",
    );
    expect(contracts).toContain("web implementation");
    expect(contracts).toContain("07-web-implementation");
    expect(contracts).toMatch(/APPROVED_WITH_NOTES|INSUFFICIENT_EVIDENCE/);
  });

  it("validator includes web-implementation among nine skills", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toContain("web-implementation");
    expect(names).toHaveLength(9);
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  });
});
