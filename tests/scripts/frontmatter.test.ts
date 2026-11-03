import { describe, expect, it } from "vitest";
import { skillFrontmatterSchema } from "../../scripts/common/skill-frontmatter.js";

describe("skillFrontmatterSchema", () => {
  it("accepts valid frontmatter", () => {
    const parsed = skillFrontmatterSchema.parse({
      name: "web-visual-direction",
      description:
        "Defines website visual direction. Use when exploring art direction for landing pages.",
      metadata: { "ydp.kind": "atomic" },
    });
    expect(parsed.name).toBe("web-visual-direction");
  });

  it("rejects uppercase names", () => {
    const result = skillFrontmatterSchema.safeParse({
      name: "Web-Direction",
      description: "x".repeat(50),
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty description", () => {
    const result = skillFrontmatterSchema.safeParse({
      name: "ok-skill",
      description: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects consecutive hyphens", () => {
    const result = skillFrontmatterSchema.safeParse({
      name: "bad--name",
      description: "x".repeat(50),
    });
    expect(result.success).toBe(false);
  });
});
