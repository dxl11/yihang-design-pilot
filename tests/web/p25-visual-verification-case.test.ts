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
  "## 1. Executive Summary",
  "## 2. Project Information",
  "## 3. Verification Scope",
  "## 4. Readiness Assessment",
  "## 5. Test Environment",
  "## 6. Browser Tool Mode",
  "## 7. Page Coverage",
  "## 8. Viewport Matrix",
  "## 9. Screenshot Inventory",
  "## 10. Page Load Results",
  "## 11. Console and Network Results",
  "## 12. Layout Results",
  "## 13. Responsive Results",
  "## 14. Interaction Results",
  "## 15. Accessibility Results",
  "## 16. Visual Comparison Results",
  "## 17. Issue Register",
  "## 18. Fix and Re-verification Status",
  "## 19. Evidence Index",
  "## 20. Limitations",
  "## 21. Final Verification Decision",
] as const;

describe("P2.5 visual-verification case (启航学堂)", () => {
  it("ships index and three reports with required sections", () => {
    expect(fs.existsSync(path.join(output, "08-web-visual-verification/_index.md"))).toBe(true);
    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`08-web-visual-verification/${id}/visual-verification-report.md`);
      expect(doc).toContain("web-visual-verification");
      for (const section of requiredSections) {
        expect(doc, `${id} ${section}`).toContain(section);
      }
      expect(doc).toMatch(/CASE_DEMO/);
      expect(doc).toMatch(/NO_CODE_CHANGES|PROJECT_NOT_RUNNABLE/);
      expect(doc).toMatch(/NOT TESTED/);
      expect(doc).toMatch(/INSUFFICIENT_EVIDENCE/);
      expect(doc).not.toMatch(/结论:\s*\*\*VERIFIED\*\*/);
      expect(doc).not.toMatch(/Browser Tool Mode[\s\S]{0,200}PASS/);
      expect(doc).not.toMatch(/已通过 WCAG 认证/);
      expect(doc).not.toMatch(/设计稿匹配通过/);
      expect(doc).not.toMatch(/\.png\)/);
    }
  });

  it("ties viewport matrix to responsive specs and marks reference gaps", () => {
    const home = readOut("08-web-visual-verification/home/visual-verification-report.md");
    expect(home).toMatch(/05-responsive-design\/home/);
    expect(home).toMatch(/REFERENCE_IMAGE_NOT_AVAILABLE|参考图/);
    expect(home).toMatch(/TOOL_NOT_AVAILABLE|PROJECT_NOT_RUNNABLE/);
    expect(home).toMatch(/Viewport Matrix/);

    const course = readOut(
      "08-web-visual-verification/course-detail/visual-verification-report.md",
    );
    expect(course).toMatch(/验证页|NEEDS_REVISION/);
    expect(course).toMatch(/Sticky|Accordion|sticky/i);

    const pricing = readOut("08-web-visual-verification/pricing/visual-verification-report.md");
    expect(pricing).toMatch(/验证页|咨询/);
    expect(pricing).toMatch(/表|卡/);
  });

  it("does not overwrite prior design-output stages", () => {
    expect(fs.existsSync(path.join(output, "07-web-implementation/home/implementation-report.md"))).toBe(
      true,
    );
    expect(fs.existsSync(path.join(output, "06-design-review/home/design-review.md"))).toBe(true);
    expect(fs.existsSync(path.join(output, "05-responsive-design/home/responsive-design.md"))).toBe(
      true,
    );
  });
});
