import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";
import { validateAllSkills } from "../../scripts/common/validate-skills-lib.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillDir = path.join(repoRoot, "skills/web/web-visual-verification");

describe("P2.5 web-visual-verification skill structure", () => {
  it("has frontmatter, modes, protocol, and references", () => {
    const skillMd = fs.readFileSync(path.join(skillDir, "SKILL.md"), "utf8");
    const block = extractFrontmatterBlock(skillMd);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as { name: string; description: string };
    expect(fm.name).toBe("web-visual-verification");
    expect(fm.description).toMatch(/visual|browser|screenshot/i);
    expect(fm.description.length).toBeGreaterThanOrEqual(40);

    for (const heading of [
      "## 定位",
      "## 与 P2.4 的边界",
      "## 输入要求",
      "## Verification Readiness",
      "## 浏览器工具模式",
      "## 执行流程",
      "## 输出要求",
      "## 质量检查",
    ]) {
      expect(skillMd).toContain(heading);
    }

    expect(skillMd).toContain("08-web-visual-verification");
    expect(skillMd).toMatch(/AUTOMATED|MODE A/);
    expect(skillMd).toMatch(/BROWSER_ASSISTED|MODE B/);
    expect(skillMd).toMatch(/EVIDENCE_ONLY|MODE C/);
    expect(skillMd).toMatch(/READY_WITH_LIMITATIONS|READY/);
    expect(skillMd).toMatch(/TOOL_NOT_AVAILABLE/);
    expect(skillMd).toMatch(/REFERENCE_IMAGE_NOT_AVAILABLE/);
    expect(skillMd).toMatch(/Playwright/);
    expect(skillMd).toMatch(/可选/);
    expect(skillMd).toMatch(/Design Fidelity|P2\.4/);
    expect(skillMd).not.toMatch(/必须安装 Playwright/);
    expect(skillMd).toMatch(/要求强制给所有用户项目安装 Playwright/); // 列为不适用场景（禁止）

    for (const ref of [
      "references/browser-tool-modes.md",
      "references/verification-protocol.md",
      "references/verification-checks.md",
      "references/evidence-and-issues.md",
      "references/output-schema.md",
      "references/quality-checklist.md",
      "references/examples.md",
    ]) {
      expect(fs.existsSync(path.join(skillDir, ref)), ref).toBe(true);
    }

    const modes = fs.readFileSync(path.join(skillDir, "references/browser-tool-modes.md"), "utf8");
    expect(modes).toMatch(/MODE A|AUTOMATED/);
    expect(modes).toMatch(/工具缺失 ≠ 页面 FAIL|≠.*FAIL/);

    const protocol = fs.readFileSync(
      path.join(skillDir, "references/verification-protocol.md"),
      "utf8",
    );
    expect(protocol).toMatch(/VIEWPORT_SPEC_MISSING/);
    expect(protocol).toMatch(/05-responsive|P2\.2|继承/);
    expect(protocol).not.toMatch(/必须使用 375.*768.*1024.*1440 作为设计规定/);

    const evidence = fs.readFileSync(
      path.join(skillDir, "references/evidence-and-issues.md"),
      "utf8",
    );
    for (const s of ["PASS", "FAIL", "PARTIAL", "NOT TESTED", "BLOCKED", "N/A"]) {
      expect(evidence).toContain(s);
    }
    for (const r of ["NEW", "FIXED", "REGRESSED", "STILL_OPEN", "NOT_RETESTED"]) {
      expect(evidence).toContain(r);
    }
    expect(evidence).toMatch(/代码改了 ≠ FIXED|须有重新验证/);

    const checks = fs.readFileSync(
      path.join(skillDir, "references/verification-checks.md"),
      "utf8",
    );
    expect(checks).toMatch(/像素差单独不得|像素差异/);
    expect(checks).toMatch(/REFERENCE_IMAGE_NOT_AVAILABLE/);
    expect(checks).toMatch(/WCAG/);
  });

  it("workflow v0.7 marks visual verification available and keeps P2.4 distinct", () => {
    const wf = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md"),
      "utf8",
    );
    const block = extractFrontmatterBlock(wf);
    const fm = YAML.parse(block!.yaml) as { metadata?: Record<string, string> };
    expect(fm.metadata?.version).toBe("0.7.0");
    expect(wf).toMatch(/web-visual-verification[\s\S]*?\*\*available\*\*/);
    expect(wf).toContain("08-web-visual-verification");
    expect(wf).toContain("skills/web/web-visual-verification/SKILL.md");
    expect(wf).toMatch(/Design Fidelity|P2\.4/);
    expect(wf).toMatch(/Playwright 可选|可选/);

    const contracts = fs.readFileSync(
      path.join(repoRoot, "skills/web/web-design-workflow/references/stage-contracts.md"),
      "utf8",
    );
    expect(contracts).toMatch(/web visual verification|visual verification/i);
    expect(contracts).toContain("08-web-visual-verification");
    expect(contracts).toMatch(/TOOL_NOT_AVAILABLE/);
    expect(contracts).not.toMatch(/Visual Verification 仍为 \*\*planned\*\*/);
  });

  it("validator includes web-visual-verification among ten skills", () => {
    const { results, issues } = validateAllSkills({ rootDir: repoRoot });
    const names = results.map((r) => r.name).filter(Boolean).sort();
    expect(names).toContain("web-visual-verification");
    expect(names).toHaveLength(10);
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  });

  it("optional capture script reports TOOL_NOT_AVAILABLE without playwright", () => {
    const script = path.join(repoRoot, "scripts/web/visual-verify-capture.mjs");
    expect(fs.existsSync(script)).toBe(true);
    const result = spawnSync(process.execPath, [script, "--check-only"], {
      encoding: "utf8",
      cwd: repoRoot,
    });
    // Without playwright dependency in this repo, expect exit 2
    expect(result.status).toBe(2);
    expect(result.stdout).toMatch(/TOOL_NOT_AVAILABLE/);
    expect(result.stdout).not.toMatch(/"status":"OK"/);
  });
});
