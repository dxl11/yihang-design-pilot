import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import {
  extractFrontmatterBlock,
  skillFrontmatterSchema,
  type SkillFrontmatter,
} from "./skill-frontmatter.js";

export type Severity = "error" | "warning";

export interface ValidationIssue {
  severity: Severity;
  skillPath: string;
  message: string;
  code: string;
}

export interface SkillValidationResult {
  skillDir: string;
  name: string | null;
  issues: ValidationIssue[];
}

export interface ValidateSkillsOptions {
  /** Absolute or relative path to repository root */
  rootDir: string;
  /** Relative skills directory from root (default: skills) */
  skillsDirName?: string;
}

/**
 * Recursively finds directories that contain a SKILL.md file.
 *
 * @param dir - Absolute directory to scan
 * @returns Absolute paths of skill root directories
 */
export function findSkillDirectories(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (entry.name === "node_modules" || entry.name.startsWith(".")) {
      continue;
    }
    const full = path.join(dir, entry.name);
    const skillMd = path.join(full, "SKILL.md");
    if (fs.existsSync(skillMd)) {
      results.push(full);
    } else {
      results.push(...findSkillDirectories(full));
    }
  }
  return results.sort((a, b) => a.localeCompare(b));
}

/**
 * Extracts referenced relative paths from markdown body for existence checks.
 *
 * @param body - Markdown body after frontmatter
 * @returns Unique relative path candidates under references/scripts/assets/tests
 */
export function collectLocalReferences(body: string): string[] {
  const found = new Set<string>();
  const patterns = [
    /\]\((?!https?:\/\/)(?!mailto:)([^)#\s]+)\)/g,
    /`(references\/[^`\s]+|scripts\/[^`\s]+|assets\/[^`\s]+|tests\/[^`\s]+)`/g,
  ];
  for (const re of patterns) {
    for (const match of body.matchAll(re)) {
      const raw = match[1];
      if (!raw) continue;
      const cleaned = raw.replace(/^\.?\//, "");
      if (
        cleaned.startsWith("references/") ||
        cleaned.startsWith("scripts/") ||
        cleaned.startsWith("assets/") ||
        cleaned.startsWith("tests/")
      ) {
        found.add(cleaned.split("#")[0] ?? cleaned);
      }
    }
  }
  return [...found];
}

/**
 * Validates a single skill directory.
 *
 * @param skillDir - Absolute skill directory
 * @param rootDir - Repository root (for relative reporting)
 * @returns Validation result including issues
 */
export function validateSkillDirectory(
  skillDir: string,
  rootDir: string,
): SkillValidationResult {
  const rel = path.relative(rootDir, skillDir).replaceAll("\\", "/");
  const issues: ValidationIssue[] = [];
  const skillMdPath = path.join(skillDir, "SKILL.md");
  const dirName = path.basename(skillDir);

  if (!fs.existsSync(skillMdPath)) {
    issues.push({
      severity: "error",
      skillPath: rel,
      code: "MISSING_SKILL_MD",
      message: "SKILL.md is missing",
    });
    return { skillDir: rel, name: null, issues };
  }

  const content = fs.readFileSync(skillMdPath, "utf8");
  const block = extractFrontmatterBlock(content);
  if (!block) {
    issues.push({
      severity: "error",
      skillPath: rel,
      code: "MISSING_FRONTMATTER",
      message: "SKILL.md must start with YAML frontmatter delimited by ---",
    });
    return { skillDir: rel, name: null, issues };
  }

  let parsed: unknown;
  try {
    parsed = YAML.parse(block.yaml);
  } catch (err) {
    issues.push({
      severity: "error",
      skillPath: rel,
      code: "INVALID_YAML",
      message: `Frontmatter YAML parse error: ${(err as Error).message}`,
    });
    return { skillDir: rel, name: null, issues };
  }

  const result = skillFrontmatterSchema.safeParse(parsed);
  if (!result.success) {
    for (const issue of result.error.issues) {
      issues.push({
        severity: "error",
        skillPath: rel,
        code: "FRONTMATTER_SCHEMA",
        message: `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      });
    }
    return { skillDir: rel, name: null, issues };
  }

  const fm: SkillFrontmatter = result.data;
  if (fm.name !== dirName) {
    issues.push({
      severity: "error",
      skillPath: rel,
      code: "NAME_DIR_MISMATCH",
      message: `frontmatter name "${fm.name}" must match directory name "${dirName}"`,
    });
  }

  if (fm.description.trim().length < 40) {
    issues.push({
      severity: "warning",
      skillPath: rel,
      code: "DESCRIPTION_TOO_SHORT",
      message: "description is very short; prefer WHAT + WHEN with trigger terms",
    });
  }

  for (const ref of collectLocalReferences(block.body)) {
    const target = path.join(skillDir, ref);
    if (!fs.existsSync(target)) {
      issues.push({
        severity: "error",
        skillPath: rel,
        code: "BROKEN_REFERENCE",
        message: `Referenced path does not exist: ${ref}`,
      });
    }
  }

  return { skillDir: rel, name: fm.name, issues };
}

/**
 * Validates all skills under the repository skills directory.
 *
 * @param options - Root and skills folder options
 * @returns Per-skill results plus duplicate-name issues
 * @throws {Error} When skills directory path is invalid as a non-directory file
 */
export function validateAllSkills(options: ValidateSkillsOptions): {
  results: SkillValidationResult[];
  issues: ValidationIssue[];
} {
  const rootDir = path.resolve(options.rootDir);
  const skillsRoot = path.join(rootDir, options.skillsDirName ?? "skills");
  const results = findSkillDirectories(skillsRoot).map((dir) =>
    validateSkillDirectory(dir, rootDir),
  );

  const issues: ValidationIssue[] = results.flatMap((r) => r.issues);
  const byName = new Map<string, string[]>();
  for (const r of results) {
    if (!r.name) continue;
    const list = byName.get(r.name) ?? [];
    list.push(r.skillDir);
    byName.set(r.name, list);
  }
  for (const [name, dirs] of byName) {
    if (dirs.length > 1) {
      issues.push({
        severity: "error",
        skillPath: dirs.join(", "),
        code: "DUPLICATE_NAME",
        message: `Duplicate skill name "${name}" in: ${dirs.join(", ")}`,
      });
    }
  }

  if (!fs.existsSync(skillsRoot)) {
    issues.push({
      severity: "warning",
      skillPath: "skills",
      code: "SKILLS_DIR_MISSING",
      message: `Skills directory not found: ${skillsRoot}`,
    });
  }

  return { results, issues };
}

/**
 * Formats a human-readable validation report.
 *
 * @param issues - Aggregated issues
 * @param skillCount - Number of skills scanned
 * @returns Multi-line report string
 */
export function formatReport(issues: ValidationIssue[], skillCount: number): string {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const lines: string[] = [
    `Skill Validator: scanned ${skillCount} skill(s)`,
    `Errors: ${errors.length}  Warnings: ${warnings.length}`,
  ];
  for (const issue of issues) {
    lines.push(`[${issue.severity.toUpperCase()}] ${issue.code} @ ${issue.skillPath}: ${issue.message}`);
  }
  if (issues.length === 0) {
    lines.push("All checks passed.");
  }
  return lines.join("\n");
}
