# 宿主兼容性报告（P1.5）

- 测试日期：2026-11-03（UTC+8）  
- 仓库：`yihang-design-pilot`  
- Skills：`web-visual-direction`、`web-design-workflow`  

## 1. 测试环境

| 项 | 值 |
|---|---|
| OS | Windows 10 / 11（win32 10.0.26200） |
| Node | v24.15.0（engines 要求 ≥22） |
| pnpm | 9.15.9 |
| Cursor | 3.27.22（`cursor --version`；git `b1aa50cb6d...`） |
| Claude Code | **NOT_INSTALLED**（`claude` 命令不存在） |
| Codex | **NOT_INSTALLED**（`codex` 命令不存在；`~/.codex` 目录存在但不代表 CLI 可用） |

## 2. 官方规范核实（重新查阅，非照搬 P1）

| 宿主 | 文档标题 | URL | 查阅日 | 发现路径摘要 |
|---|---|---|---|---|
| Cursor | Agent Skills | https://cursor.com/docs/skills | 2026-11-03 | `.cursor/skills/`、`.agents/skills/`、用户级 `~/.cursor/skills` / `~/.agents/skills`；**递归**发现分类子目录；兼容加载 `.claude/skills`、`.codex/skills` |
| Claude Code | Extend Claude with skills | https://code.claude.com/docs/en/skills | 2026-11-03 | 项目 `.claude/skills/<name>/SKILL.md`；个人 `~/.claude/skills/`；支持 symlink；示例为扁平 skill 名 |
| Codex | Build skills | https://developers.openai.com/codex/skills | 2026-11-03 | 仓库 `.agents/skills`（CWD→root）；用户 `~/.agents/skills`；支持 symlink；`name`+`description` 必填 |

### Frontmatter（跨宿主最小集）

- 强制：`name`、`description`（与叶目录名一致）  
- Cursor 额外可选：`paths`、`disable-model-invocation`、`icon`、`color`  
- Claude 额外可选：`when_to_use`、`allowed-tools` 等  
- Codex 额外可选：`agents/openai.yaml`  

本仓库策略：只强制跨宿主最小集；扩展字段可选。

### 关于 `skills/web/` 源目录

权威源 `skills/<domain>/<skill>/` **不会**被三宿主默认扫描。必须安装/复制到各自发现根。Cursor 支持在发现根下保留 `web/` 分类嵌套；Claude/Codex 安装脚本使用扁平叶目录以贴合官方示例。

## 3. 结构检查

| 检查 | 结果 |
|---|---|
| `pnpm validate:skills` | PASS（2 skills，0 errors） |
| Frontmatter / 引用 | PASS（Vitest） |

级别：三者均 **STRUCTURE_VALIDATED**（内容结构，非宿主安装）。

## 4. 安装测试（隔离 fixture）

命令（已执行）：

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

| 宿主 | 目标 | 结果 |
|---|---|---|
| Cursor | `tests/fixtures/.../cursor-project/.cursor/skills/web/<skill>/` | **INSTALLATION_TESTED = PASS** |
| Claude Code | `.../claude-code-project/.claude/skills/<skill>/` | **INSTALLATION_TESTED = PASS**（布局） |
| Codex | `.../codex-project/.agents/skills/<skill>/` | **INSTALLATION_TESTED = PASS**（布局） |

覆盖保护：对已存在目录再次安装 → 拒绝（自动化测试覆盖）。

**未**向 `~/.cursor/skills`、`~/.claude/skills`、`~/.agents/skills` 写入（避免污染用户全局 Skills；用户目录已存在 huashu-design 等）。

## 5. 运行验证

统一任务提示词：

> 请使用 web-visual-direction Skill，为一个面向年轻专业人士的在线教育品牌提出三个具有实质差异的网站视觉方向，并输出每个方向的色彩、字体、布局和图像策略。

| 宿主 | 结果 | 说明 |
|---|---|---|
| Cursor | **PARTIAL → 见下** | 本会话为 Cursor Agent；已 Read 权威源/`SKILL.md` 与 references，并按 Skill 产出三方向结构化结果（写入 fixture 证据文件）。**未**在独立 Cursor GUI 中验证 `/web-visual-direction` 菜单自动发现（需用户在 UI 的 Skills 面板确认）。 |
| Claude Code | **BLOCKED** | CLI 未安装，无法启动宿主会话 |
| Codex | **BLOCKED** | CLI 未安装，无法启动宿主会话 |

证据文件：`tests/fixtures/host-compatibility/cursor-runtime-evidence.md`（若被 gitignore 规则挡住，则以报告内嵌摘要为准；该文件放在 fixtures 根并由 README 说明）。  

为避免被 `tests/fixtures/host-compatibility/**` ignore 吃掉，证据写入 `docs/evidence/cursor-runtime-web-visual-direction.md`。

## 6. 汇总表

| 宿主 | 规范核实 | 结构检查 | 安装测试 | 运行测试 |
|---|---|---|---|---|
| Cursor | SPEC_REVIEWED | STRUCTURE_VALIDATED | INSTALLATION_TESTED | PARTIAL（Agent 遵从 Skill 指令；UI 自动发现未单独证实） |
| Claude Code | SPEC_REVIEWED | STRUCTURE_VALIDATED | INSTALLATION_TESTED（fixture 布局） | BLOCKED（NOT_INSTALLED） |
| Codex | SPEC_REVIEWED | STRUCTURE_VALIDATED | INSTALLATION_TESTED（fixture 布局） | BLOCKED（NOT_INSTALLED） |

## 7. 问题与影响

| 问题 | 原因 | 处理 |
|---|---|---|
| 源目录 `skills/` 不被默认发现 | 宿主只扫固定根 | 安装脚本 + README |
| Claude/Codex 运行未测 | 本机无 CLI | 标记 BLOCKED，不伪造成 PASS |
| Cursor UI 发现未测 | 自动化无法可靠驱动 Skills 面板 | 标记 PARTIAL |
| 用户全局已有大量 Skills | 覆盖风险 | 默认只用 fixture / 显式 TargetRoot |

## 8. 结论

P1.5 宿主兼容性整体为 **PARTIAL PASS**：规范与隔离安装达标；完整三宿主 RUNTIME 未完成。
