import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const output = path.join(repoRoot, "examples/web/online-education-site/design-output");

/**
 * @param relativePath - Path under design-output
 * @returns File contents
 */
function readOut(relativePath: string): string {
  return fs.readFileSync(path.join(output, relativePath), "utf8");
}

const requiredSections = [
  "## 1. Overview",
  "## 2. Viewport Strategy",
  "## 3. Breakpoint Rationale",
  "## 4. Layout Transformation",
  "## 5. Content Priority",
  "## 6. Navigation Adaptation",
  "## 7. Component Behavior",
  "## 8. Interaction Adaptation",
  "## 9. Typography & Spacing",
  "## 10. Responsive Media",
  "## 11. Accessibility",
  "## 12. Edge Cases",
  "## 13. Validation Checklist",
  "## 14. FACT / HYPOTHESIS / TODO",
] as const;

describe("P2.2 responsive design case (启航学堂)", () => {
  it("reads page designs and tokens without inventing a parallel palette", () => {
    for (const id of ["home", "course-detail", "pricing"]) {
      expect(fs.existsSync(path.join(output, `04-page-design/${id}/page-design.md`))).toBe(true);
    }
    const tokens = JSON.parse(readOut("design-tokens.json")) as {
      breakpoint: Record<string, { value: string }>;
    };
    expect(tokens.breakpoint.lg?.value).toMatch(/px/);

    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`05-responsive-design/${id}/responsive-design.md`);
      expect(doc).toMatch(/breakpoint|Tokens:|design-tokens|layout\.(container|proseMax)|继承 tokens/i);
      expect(doc).not.toMatch(/\bblue-1\b/);
      expect(doc).toMatch(/不另建全局色板|不新增全局|继承 tokens|无新全局色|Tokens:/i);
      expect(doc).toContain("web-responsive-design");
      for (const section of requiredSections) {
        expect(doc, `${id} missing ${section}`).toContain(section);
      }
      expect(doc).toMatch(/NOT TESTED/);
      expect(doc).not.toMatch(/经用户研究验证/);
      expect(doc).not.toMatch(/已通过 WCAG 认证/);
    }
  });

  it("home strategy centers hero stack and program columns", () => {
    const home = readOut("05-responsive-design/home/responsive-design.md");
    expect(home).toMatch(/marketing-stack|Hero|产品线/);
    expect(home).toMatch(/汉堡|Navigation/);
    expect(home).toMatch(/两列|单列/);
    expect(home).toMatch(/原因|UX/);
  });

  it("course detail keeps CTA when sidebar collapses", () => {
    const course = readOut("05-responsive-design/course-detail/responsive-design.md");
    expect(course).toMatch(/sticky-cta-reader|粘性/);
    expect(course).toMatch(/侧栏/);
    expect(course).toMatch(/申请/);
    expect(course).toMatch(/验证页|P2/);
  });

  it("pricing converts comparison to stacked cards without dropping benefits", () => {
    const pricing = readOut("05-responsive-design/pricing/responsive-design.md");
    expect(pricing).toMatch(/compare-to-stack|纵/);
    expect(pricing).toMatch(/权益/);
    expect(pricing).toMatch(/禁止.*隐藏|不删|保留/);
    expect(pricing).not.toMatch(/¥\s*\d{2,}/);
    expect(pricing).toMatch(/咨询/);
  });

  it("three pages declare distinct responsive strategy tags", () => {
    const home = readOut("05-responsive-design/home/responsive-design.md");
    const course = readOut("05-responsive-design/course-detail/responsive-design.md");
    const pricing = readOut("05-responsive-design/pricing/responsive-design.md");
    expect(home).toMatch(/marketing-stack/);
    expect(course).toMatch(/sticky-cta-reader/);
    expect(pricing).toMatch(/compare-to-stack/);
  });
});
