# Agent 兼容性规范

> P1.5（2026-11-03）已对照官方文档重核。实测细节见 `HOST_COMPATIBILITY_REPORT.md`。

验证级别：`SPEC_REVIEWED` → `STRUCTURE_VALIDATED` → `INSTALLATION_TESTED` → `HOST_RUNTIME_VERIFIED`。

## 统一原则

1. **`skills/` 为唯一权威源**，禁止维护三套分叉正文。  
2. 宿主只扫描各自发现根；需安装/复制。  
3. Frontmatter 最小集：`name` + `description`（目录名一致）。  
4. 未验证项不得标为已验证。

## Cursor

| 项 | 内容 |
|---|---|
| 文档 | https://cursor.com/docs/skills （Agent Skills，2026-11-03 查阅） |
| 发现根 | `.cursor/skills/`、`.agents/skills/`；用户级 `~/.cursor/skills`、`~/.agents/skills` |
| 嵌套 | **支持**递归分类目录 |
| 兼容加载 | 亦加载 `.claude/skills`、`.codex/skills` 等 |
| 调用 | `/skill-name` 或上下文自动匹配 description |
| P1.5 级别 | SPEC_REVIEWED + STRUCTURE_VALIDATED + INSTALLATION_TESTED；RUNTIME **PARTIAL** |

## Claude Code

| 项 | 内容 |
|---|---|
| 文档 | https://code.claude.com/docs/en/skills （2026-11-03 查阅） |
| 发现根 | `.claude/skills/<name>/SKILL.md`；`~/.claude/skills/` |
| 嵌套 | 官方示例为扁平名；支持 symlink；另有 monorepo 子目录 `.claude/skills` 规则 |
| 安装脚本策略 | **扁平**叶目录 |
| P1.5 级别 | SPEC_REVIEWED + STRUCTURE_VALIDATED + INSTALLATION_TESTED（fixture）；RUNTIME **BLOCKED**（CLI 未装） |

## Codex

| 项 | 内容 |
|---|---|
| 文档 | https://developers.openai.com/codex/skills （2026-11-03 查阅） |
| 发现根 | `.agents/skills`（CWD 向上至 repo root）；`~/.agents/skills` |
| 嵌套 | 官方以 skill 叶目录为主；支持 symlink |
| 安装脚本策略 | **扁平**叶目录 |
| P1.5 级别 | SPEC_REVIEWED + STRUCTURE_VALIDATED + INSTALLATION_TESTED（fixture）；RUNTIME **BLOCKED**（CLI 未装） |

## 安装入口

见 `scripts/install/README.md` 与根 `README.md`。
