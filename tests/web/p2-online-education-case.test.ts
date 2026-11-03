import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const caseRoot = path.join(repoRoot, "examples/web/online-education-site");
const output = path.join(caseRoot, "design-output");

/**
 * Reads a UTF-8 file under the case design-output directory.
 *
 * @param name - File name relative to design-output
 * @returns File contents
 */
function readOutput(name: string): string {
  return fs.readFileSync(path.join(output, name), "utf8");
}

describe("P2 online-education case chain", () => {
  it("ships intake with intentional gaps", () => {
    const intake = fs.readFileSync(path.join(caseRoot, "00-project-intake.md"), "utf8");
    expect(intake).toMatch(/没有正式访谈|没有.*漏斗|尚未|还没/);
    expect(intake).toMatch(/启航学堂/);
  });

  it("design brief separates facts and hypotheses", () => {
    const brief = readOutput("01-design-brief.md");
    expect(brief).toContain("web-design-brief");
    expect(brief).toMatch(/\[FACT\]/);
    expect(brief).toMatch(/\[HYPOTHESIS\]/);
    expect(brief).toMatch(/待确认/);
    expect(brief).toMatch(/Out of scope|不做/);
    expect(brief).toMatch(/不得写成「经用户研究验证|禁止表述/);
  });

  it("information architecture includes sitemap and paths", () => {
    const ia = readOutput("02-information-architecture.md");
    expect(ia).toContain("web-information-architecture");
    expect(ia).toMatch(/Sitemap|网站 Sitemap/);
    expect(ia).toMatch(/Primary|导航/);
    expect(ia).toMatch(/路径 A|核心用户路径/);
    expect(ia).toMatch(/\/apply|申请/);
  });

  it("visual direction is approved before design system", () => {
    const approved = readOutput("direction-approved.md");
    const direction = readOutput("visual-direction.md");
    expect(approved).toMatch(/Direction B/);
    expect(direction).toMatch(/青绿工作室|Direction B/);
  });

  it("design system covers tokens, components, responsive, a11y", () => {
    const ds = readOutput("03-design-system.md");
    expect(ds).toContain("web-design-system");
    expect(ds).toMatch(/Typography|字体/);
    expect(ds).toMatch(/Component|组件/);
    expect(ds).toMatch(/Responsive|响应式|Breakpoints/);
    expect(ds).toMatch(/Accessibility|无障碍|WCAG/);
    expect(ds).toMatch(/不得.*认证|未.*认证|目标/);
  });

  it("design-tokens.json parses and uses semantic color keys", () => {
    const raw = readOutput("design-tokens.json");
    const tokens = JSON.parse(raw) as {
      color: {
        brand: { primary: { value: string } };
        text: { primary: { value: string } };
        surface: { default: { value: string } };
        status: { success: { value: string } };
      };
      typography: { size: Record<string, { value: string }> };
      spacing: { scale: number[] };
      breakpoint: Record<string, { value: string }>;
    };
    expect(tokens.color.brand.primary.value).toMatch(/^#/);
    expect(tokens.color.text.primary.value).toMatch(/^#/);
    expect(tokens.color.surface.default.value).toMatch(/^#/);
    expect(tokens.color.status.success.value).toMatch(/^#/);
    expect(tokens.typography.size.md?.value).toBe("16px");
    expect(tokens.spacing.scale.length).toBeGreaterThanOrEqual(5);
    expect(tokens.breakpoint.lg?.value).toMatch(/px/);
    expect(raw).not.toContain("blue-1");
  });
});
