import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";
import { describe, expect, it } from "vitest";
import { extractFrontmatterBlock } from "../../scripts/common/skill-frontmatter.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflowSkill = path.join(repoRoot, "skills/web/web-design-workflow/SKILL.md");

describe("web-design-workflow structure", () => {
  it("is marked as workflow and references available atomic skill", () => {
    const content = fs.readFileSync(workflowSkill, "utf8");
    const block = extractFrontmatterBlock(content);
    expect(block).not.toBeNull();
    const fm = YAML.parse(block!.yaml) as {
      name: string;
      metadata?: Record<string, string>;
    };
    expect(fm.name).toBe("web-design-workflow");
    expect(fm.metadata?.["ydp.kind"]).toBe("workflow");
    expect(content).toContain("planned");
    expect(content).toContain("web-visual-direction");
    expect(content).toContain("web-design-brief");
    expect(content).toContain("web-information-architecture");
    expect(content).toContain("web-design-system");
    expect(content).toContain("web-page-design");
    expect(content).toMatch(/用户确认/);
    expect(content).toMatch(/\*\*available\*\*/);
    expect(content).toMatch(/web-page-design[\s\S]*?\*\*available\*\*/);
    expect(content).toMatch(/web-responsive-design[\s\S]*?\*\*planned\*\*/);
  });

  it("ships stage contract reference file", () => {
    const contract = path.join(
      repoRoot,
      "skills/web/web-design-workflow/references/stage-contracts.md",
    );
    expect(fs.existsSync(contract)).toBe(true);
  });
});
