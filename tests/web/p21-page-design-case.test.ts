import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const caseRoot = path.join(repoRoot, "examples/web/online-education-site");
const output = path.join(caseRoot, "design-output");
const pagesRoot = path.join(output, "04-page-design");

/**
 * Reads UTF-8 from design-output.
 *
 * @param relativePath - Path under design-output
 * @returns File contents
 */
function readOut(relativePath: string): string {
  return fs.readFileSync(path.join(output, relativePath), "utf8");
}

const requiredSections = [
  "## 1. Overview",
  "## 2. Structure",
  "## 3. Layout",
  "## 4. Interaction",
  "## 5. Content",
  "## 6. Quality checklist",
] as const;

describe("P2.1 web-page-design case (启航学堂)", () => {
  it("upstream artifacts exist for page design inputs", () => {
    for (const file of [
      "01-design-brief.md",
      "02-information-architecture.md",
      "visual-direction.md",
      "direction-approved.md",
      "03-design-system.md",
      "design-tokens.json",
    ]) {
      expect(fs.existsSync(path.join(output, file)), file).toBe(true);
    }
    expect(() => JSON.parse(readOut("design-tokens.json"))).not.toThrow();
  });

  it("ships index and three differentiated page specs", () => {
    expect(fs.existsSync(path.join(pagesRoot, "_index.md"))).toBe(true);
    const pages = ["home", "course-detail", "pricing"] as const;
    for (const id of pages) {
      const doc = readOut(`04-page-design/${id}/page-design.md`);
      expect(doc).toContain("web-page-design");
      for (const section of requiredSections) {
        expect(doc).toContain(section);
      }
      expect(doc).toMatch(/\[FACT\]|FACT/);
      expect(doc).toMatch(/TODO|HYPOTHESIS/);
      expect(doc).toMatch(/color\.brand\.primary|brand\.primary|design-tokens|tokens/);
      expect(doc).not.toMatch(/经用户研究验证/);
    }
  });

  it("home focuses on value prop and dual program routing", () => {
    const home = readOut("04-page-design/home/page-design.md");
    expect(home).toMatch(/Home|首页/);
    expect(home).toMatch(/产品线|programs/);
    expect(home).toMatch(/申请试听|\/apply/);
    expect(home).toMatch(/顺序理由/);
  });

  it("course detail emphasizes fit and syllabus not a second home", () => {
    const course = readOut("04-page-design/course-detail/page-design.md");
    expect(course).toMatch(/Course Detail|课程详情/);
    expect(course).toMatch(/适合/);
    expect(course).toMatch(/大纲/);
    expect(course).toMatch(/P2|验证/);
    expect(course).not.toMatch(/¥\s*\d{2,}/);
  });

  it("pricing stays consultative without fabricated list prices", () => {
    const pricing = readOut("04-page-design/pricing/page-design.md");
    expect(pricing).toMatch(/Pricing|价格/);
    expect(pricing).toMatch(/咨询/);
    expect(pricing).toMatch(/未定|确认中|未纳入/);
    expect(pricing).not.toMatch(/¥\s*\d{2,}/);
    expect(pricing).not.toMatch(/\[FACT\].{0,40}¥\d/);
    expect(pricing).toMatch(/不得.*写成页面标价|不输出任何 FACT 价格/);
    expect(pricing).toMatch(/主 CTA|Interaction|交互/);
    expect(pricing).toMatch(/成功|失败/);
  });

  it("pages declare distinct type strategies", () => {
    const home = readOut("04-page-design/home/page-design.md");
    const course = readOut("04-page-design/course-detail/page-design.md");
    const pricing = readOut("04-page-design/pricing/page-design.md");
    expect(home).toMatch(/页面类型:\s*Home/);
    expect(course).toMatch(/页面类型:\s*Course Detail/);
    expect(pricing).toMatch(/页面类型:\s*Pricing/);
    expect(home).toMatch(/不是课程详情|不是比价|分流/);
    expect(course).toMatch(/不是.*首页|不是第二首页/);
    expect(pricing).toMatch(/与 Home 不同|不是第二首页|异于 Home/);
  });
});
