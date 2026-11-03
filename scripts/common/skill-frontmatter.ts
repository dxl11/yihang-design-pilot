import { z } from "zod";

/**
 * Zod schema for the minimal cross-host SKILL.md frontmatter.
 *
 * @remarks
 * Aligns with Agent Skills spec constraints for `name` and `description`.
 * Optional `metadata` allows repo-local keys such as `ydp.kind`.
 */
export const skillFrontmatterSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(64)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "name must be kebab-case (a-z, 0-9, single hyphens; no leading/trailing hyphen)",
    ),
  description: z.string().min(1).max(1024),
  license: z.string().min(1).optional(),
  compatibility: z.string().min(1).max(500).optional(),
  metadata: z.record(z.string()).optional(),
  "allowed-tools": z.string().optional(),
  "disable-model-invocation": z.union([z.boolean(), z.string()]).optional(),
});

export type SkillFrontmatter = z.infer<typeof skillFrontmatterSchema>;

/**
 * Parses YAML frontmatter from a SKILL.md document.
 *
 * @param content - Full file contents
 * @returns Object with raw yaml string and markdown body, or null if missing
 * @throws Never — invalid YAML is handled by callers via parse failures
 */
export function extractFrontmatterBlock(
  content: string,
): { yaml: string; body: string } | null {
  // Normalize newlines so Windows CRLF does not leave a dangling CR on the last YAML line.
  const normalized = content.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!normalized.startsWith("---")) {
    return null;
  }
  const end = normalized.indexOf("\n---", 3);
  if (end === -1) {
    return null;
  }
  const yaml = normalized.slice(3, end).replace(/^\n/, "");
  const after = normalized.slice(end + 4);
  const body = after.startsWith("\n") ? after.slice(1) : after;
  return { yaml, body };
}
