import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const output = path.join(repoRoot, "examples/web/online-education-site/design-output");

/**
 * @param relativePath - under design-output
 */
function readOut(relativePath: string): string {
  return fs.readFileSync(path.join(output, relativePath), "utf8");
}

const requiredSections = [
  "## 1. Review Overview",
  "## 2. Review Scope",
  "## 3. Input Inventory",
  "## 4. Evidence Coverage",
  "## 5. Overall Result",
  "## 6. Dimension Results",
  "## 7. Issue Summary",
  "## 8. Detailed Findings",
  "## 9. Recommended Actions",
  "## 10. Unverified Items",
  "## 11. Acceptance Criteria",
  "## 12. Review Limitations",
] as const;

describe("P2.3 design-review case (启航学堂)", () => {
  it("ships index and three page reviews with required sections", () => {
    expect(fs.existsSync(path.join(output, "06-design-review/_index.md"))).toBe(true);
    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`06-design-review/${id}/design-review.md`);
      expect(doc).toContain("web-design-review");
      for (const section of requiredSections) {
        expect(doc, `${id} ${section}`).toContain(section);
      }
      expect(doc).toMatch(/NOT TESTED/);
      expect(doc).toMatch(/Evidence Coverage|证据/);
      expect(doc).not.toMatch(/已通过 WCAG 认证/);
      expect(doc).not.toMatch(/经用户研究验证/);
    }
  });

  it("does not approve without screenshots or claim visual PASS", () => {
    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`06-design-review/${id}/design-review.md`);
      expect(doc).not.toMatch(/结论:\s*\*\*APPROVED\*\*/);
      expect(doc).toMatch(/Visual Quality[\s\S]{0,80}NOT TESTED/);
      expect(doc).toMatch(/DESIGN_SCREENSHOT|截图/);
    }
  });

  it("home is insufficient evidence; others need revision", () => {
    expect(readOut("06-design-review/home/design-review.md")).toMatch(
      /INSUFFICIENT_EVIDENCE/,
    );
    expect(readOut("06-design-review/course-detail/design-review.md")).toMatch(
      /NEEDS_REVISION/,
    );
    expect(readOut("06-design-review/pricing/design-review.md")).toMatch(
      /NEEDS_REVISION/,
    );
  });

  it("marks case demos and verification-page honesty", () => {
    const home = readOut("06-design-review/home/design-review.md");
    const course = readOut("06-design-review/course-detail/design-review.md");
    const pricing = readOut("06-design-review/pricing/design-review.md");
    expect(home).toMatch(/CASE_DEMO/);
    expect(course).toMatch(/验证页|P2/);
    expect(course).toMatch(/PLACEHOLDER/);
    expect(pricing).toMatch(/未纳入|验证页/);
    expect(pricing).toMatch(/标价|咨询/);
    expect(pricing).toMatch(/CASE_DEMO/);
  });

  it("issues include severity and remediation acceptance", () => {
    const course = readOut("06-design-review/course-detail/design-review.md");
    expect(course).toMatch(/HIGH/);
    expect(course).toMatch(/整改/);
    expect(course).toMatch(/验收/);
  });
});
