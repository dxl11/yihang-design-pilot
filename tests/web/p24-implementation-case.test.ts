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
  "## 1. Implementation Overview",
  "## 2. Project Discovery",
  "## 3. Design Input Inventory",
  "## 4. Input Readiness",
  "## 5. Implementation Scope",
  "## 6. Technology Decisions",
  "## 7. Design-to-Code Mapping",
  "## 8. Implemented Components",
  "## 9. Implemented Pages",
  "## 10. Responsive Implementation",
  "## 11. Interaction Implementation",
  "## 12. Accessibility Implementation",
  "## 13. Design Fidelity Results",
  "## 14. Verification Results",
  "## 15. Deviations and Limitations",
  "## 16. Pending Tasks",
] as const;

describe("P2.4 web-implementation case (启航学堂)", () => {
  it("ships index and three reports with required sections", () => {
    expect(fs.existsSync(path.join(output, "07-web-implementation/_index.md"))).toBe(true);
    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`07-web-implementation/${id}/implementation-report.md`);
      expect(doc).toContain("web-implementation");
      for (const section of requiredSections) {
        expect(doc, `${id} ${section}`).toContain(section);
      }
      expect(doc).toMatch(/CASE_DEMO/);
      expect(doc).toMatch(/NO_PROJECT|NO_CODE_CHANGES/);
      expect(doc).toMatch(/NOT TESTED/);
      expect(doc).not.toMatch(/Build:\s*\*\*PASS\*\*/);
      expect(doc).not.toMatch(/Visual:\s*\*\*PASS\*\*/);
      expect(doc).not.toMatch(/已通过 WCAG 认证/);
      expect(doc).not.toMatch(/生产环境已部署/);
    }
  });

  it("respects design-review admission gates", () => {
    const index = readOut("07-web-implementation/_index.md");
    expect(index).toMatch(/INSUFFICIENT_EVIDENCE/);
    expect(index).toMatch(/NEEDS_REVISION/);
    expect(index).toMatch(/RESTRICTED|受限/);

    expect(readOut("07-web-implementation/home/implementation-report.md")).toMatch(
      /INSUFFICIENT_EVIDENCE/,
    );
    expect(readOut("07-web-implementation/course-detail/implementation-report.md")).toMatch(
      /NEEDS_REVISION/,
    );
    expect(readOut("07-web-implementation/course-detail/implementation-report.md")).toMatch(
      /RESTRICTED|验证页/,
    );
    expect(readOut("07-web-implementation/pricing/implementation-report.md")).toMatch(
      /NEEDS_REVISION/,
    );
    expect(readOut("07-web-implementation/pricing/implementation-report.md")).toMatch(
      /咨询|假标价|PLACEHOLDER/,
    );
  });

  it("includes discovery mapping fidelity and does not overwrite history", () => {
    for (const id of ["home", "course-detail", "pricing"]) {
      const doc = readOut(`07-web-implementation/${id}/implementation-report.md`);
      expect(doc).toMatch(/Design-to-Code Mapping|Token/);
      expect(doc).toMatch(/MATCHED|NOT_IMPLEMENTED|NOT_VERIFIED/);
      expect(doc).toMatch(/READY_WITH_GAPS|READY/);
    }
    expect(fs.existsSync(path.join(output, "06-design-review/home/design-review.md"))).toBe(
      true,
    );
    expect(fs.existsSync(path.join(output, "04-page-design/home/page-design.md"))).toBe(true);
  });
});
