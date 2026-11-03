[简体中文](README.md) | [English](README.en.md)

# yihang-design-pilot

开源的**专业 AI Design Skills** 项目（[MIT License](LICENSE)）。

面向 **Cursor / Claude Code / Codex** 等 AI Agent 宿主，提供可独立调用的设计 Skills，以及可组合的端到端设计工作流。目标是让 Agent 按专业设计流程完成真实工作，而不是只生成泛泛建议。

> **本项目不是** Agent Runtime、多 Agent 调度系统、独立设计引擎、SaaS、账户系统或云端设计平台。  
> **核心价值**在于：专业方法论、可验证的 Skill 质量、工作流编排、确定性辅助脚本，以及可持续维护的知识资产。

## 目录

- [项目定位](#项目定位)
- [项目能力](#项目能力)
- [支持的 Agent 宿主](#支持的-agent-宿主)
- [当前 Skills](#当前-skills)
- [安装指南](#安装指南)
- [使用指南](#使用指南)
- [仓库结构](#仓库结构)
- [项目开发状态](#项目开发状态)
- [参与贡献](#参与贡献)
- [文档与语言维护](#文档与语言维护)
- [License](#license)

---

## 项目定位

| 问题 | 本项目如何回答 |
|---|---|
| Agent 设计结果经常空泛、不可交接 | 用专业 Skill 规定输入、方法、步骤、输出与质量检查 |
| 想要完整官网流程，又怕能力耦合 | 原子 Skill 可单独调用；工作流 Skill 负责编排 |
| 担心变成「又一个 Agent 框架」 | Skills-first：只交付 Skill、脚本与规范，不交付 Runtime |

为什么采用 Skills 形式：

1. 可被多种宿主发现与调用，不绑定单一产品。  
2. 职责边界清晰，便于开源协作与质量校验。  
3. 方法论写进 Skill，结果可审查、可回归。

---

## 项目能力

| 能力 | 说明 |
|---|---|
| **独立专业 Skills（Standalone Skills）** | 完成一个边界清晰的专业步骤，例如 Design Brief、信息架构、视觉方向、设计系统 |
| **完整设计工作流（Workflow Skill）** | 按阶段编排多个 Skills，并标明确认点与 planned 依赖 |
| **专业设计方法论** | 事实/假设标记、任务优先于部门结构、语义化 Design Tokens 等 |
| **确定性辅助工具** | 安装/卸载脚本、Skill Validator、自动化测试；**不是**独立设计引擎 |

---

## 支持的 Agent 宿主

| 宿主 | 官方 Skills 规范 | 隔离安装测试 | 真实运行验证 |
|---|---|---|---|
| **Cursor** | 已按官方文档核实 | **PASS**（布局与覆盖保护） | **PARTIAL**：Agent 可按 Skill 执行；UI 自动发现未在独立 GUI 中完整证明 |
| **Claude Code** | 已按官方文档核实 | **PASS**（布局） | **BLOCKED**：本机未安装 `claude` CLI |
| **Codex** | 已按官方文档核实 | **PASS**（布局） | **BLOCKED**：本机未安装 `codex` CLI |

详情见 [`docs/HOST_COMPATIBILITY_REPORT.md`](docs/HOST_COMPATIBILITY_REPORT.md) 与 [`docs/AGENT_COMPATIBILITY.md`](docs/AGENT_COMPATIBILITY.md)。

请勿将上表理解为「三宿主生产级完全支持」。安装布局已验证；运行验证请以报告为准。

---

## 当前 Skills

权威源目录：`skills/`。状态以各 Skill / Workflow 的 `SKILL.md` 为准。

### Web Design

| Skill | 说明 | 状态 |
|---|---|---|
| `web-design-brief` | 商业目标与设计需求分析 → `design-output/01-design-brief.md` | **Available** |
| `web-information-architecture` | 信息架构、Sitemap、导航与用户路径 → `02-information-architecture.md` | **Available** |
| `web-visual-direction` | 网站视觉方向探索与选定 | **Available** |
| `web-design-system` | Design Tokens、组件与实现规则 → `03-design-system.md` + `design-tokens.json` | **Available** |
| `web-page-design` | 页面级结构/布局/交互/内容规格 → `04-page-design/` | **Available** |
| `web-responsive-design` | 跨视口布局/导航/组件与验证策略 → `05-responsive-design/` | **Available** |
| `web-design-workflow` | 编排 Brief → IA ∥ Visual → System → Page → Responsive →（审查） | **Available**（Design Review 仍为 Planned） |

### Planned（未创建空壳目录）

| Skill | 说明 | 状态 |
|---|---|---|
| `web-design-review` | 设计质量审查 | **Planned** |

品牌（Brand）、演示文稿（Presentation）等品类目录仅为规划占位说明，**尚未**提供可用 Skill。

贯穿样例：[`examples/web/online-education-site/`](examples/web/online-education-site/)。

---

## 安装指南

### 环境要求

- Node.js **22+**（开发与 `pnpm verify`）  
- [pnpm](https://pnpm.io/) **9+**（见 `packageManager` 字段）  
- 安装 Skills 到宿主：Windows 上推荐 **PowerShell**（`install.ps1` 已在本机验证）；Bash 脚本结构对称，**本机 Windows 上未作为宿主运行验证**

### 克隆仓库

```bash
git clone <your-fork-or-upstream-url>/yihang-design-pilot.git
cd yihang-design-pilot
```

开发依赖（可选，用于校验与贡献）：

```bash
pnpm install
pnpm verify
```

### 重要约定

- **`skills/` 是唯一权威源**。不要维护多套拷贝内容。  
- 安装脚本只负责复制到宿主发现目录。  
- 默认安装到隔离 fixture，**不会**写入 `~/.cursor/skills` 等用户全局目录（除非你显式传入 `-TargetRoot`）。  
- 目标目录已存在时默认**拒绝覆盖**；PowerShell 可用 `-ForceBackup` 先备份再替换。

### 推荐：先装到隔离测试目录（已验证）

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

仅预览：

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -WhatIf
```

### 安装单个 Skill（已验证参数）

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -Skill web-design-brief
```

可按领域过滤：

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -Domain web
```

### 安装到指定宿主的项目级路径（已验证命令；目录被 gitignore）

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName claude -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName codex -ProjectInstall
```

### 安装全部可用 Skills 到隔离 fixture

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

### Bash（Linux / macOS；结构对称，宿主运行未在本机验证）

```bash
bash scripts/install/install.sh cursor
bash scripts/install/install.sh all
```

### 手动安装（路径已按官方文档核对；请在目标宿主自测）

将叶目录（含 `SKILL.md`）复制到宿主发现根。示例以 `web-design-brief` 为例：

| 宿主 | 目标路径示例 |
|---|---|
| Cursor | `.cursor/skills/web/web-design-brief/`（允许分类嵌套）或 `.cursor/skills/web-design-brief/` |
| Claude Code | `.claude/skills/web-design-brief/`（扁平） |
| Codex | `.agents/skills/web-design-brief/`（扁平） |

### 更新

1. 在源仓库 `git pull`。  
2. 重新运行安装脚本。  
3. 若目标已存在且需替换：PowerShell 加 `-ForceBackup`。

### 卸载

仅删除带 `.ydp-installed.json` 标记的目录：

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot .cursor/skills
```

隔离 fixture 示例：

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot tests/fixtures/host-compatibility/cursor-project/.cursor/skills
```

### 验证安装结果

1. 目标路径存在 `SKILL.md`。  
2. 源仓执行 `pnpm validate:skills`。  
3. 在宿主中显式要求使用某一 Skill（例如「使用 `web-design-brief` Skill …」）。

更多细节：[`scripts/install/README.md`](scripts/install/README.md)。

---

## 使用指南

下面以「从零建设营销官网」为例。权威步骤以各 Skill 的 `SKILL.md` 为准；仓库内完整样例见 `examples/web/online-education-site/`。

### 推荐顺序

```text
原始项目资料
    → web-design-brief          → design-output/01-design-brief.md
    → web-information-architecture  → design-output/02-information-architecture.md
    → web-visual-direction（可与 IA 并行）→ visual-directions.md → 选定后 visual-direction.md + direction-approved.md
    → web-design-system         → design-output/03-design-system.md + design-tokens.json
    → web-page-design           → design-output/04-page-design/<page-id>/page-design.md
    → web-responsive-design     → design-output/05-responsive-design/<page-id>/responsive-design.md
    → web-design-review        （Planned）
```

也可直接调用 `web-design-workflow`，由 Agent **Read** 各阶段 `SKILL.md` 执行（本项目不提供多 Agent Runtime）。

### 示例对话（概念）

1. **Brief**  
   「请使用 `web-design-brief` Skill，根据我提供的业务介绍整理 Design Brief，区分事实与假设。」  
   → 产出 `design-output/01-design-brief.md`

2. **信息架构**  
   「请使用 `web-information-architecture`，基于 `01-design-brief.md` 设计 Sitemap、导航与核心用户路径。」  
   → 产出 `design-output/02-information-architecture.md`

3. **视觉方向**  
   「请使用 `web-visual-direction`，基于 Brief 提出三个实质差异方向；选定前不要写完整设计系统。」  
   → 产出探索稿后，用户确认并写入 `direction-approved.md`

4. **设计系统**  
   「请使用 `web-design-system`，基于 Brief、IA 与已批准视觉方向生成设计系统与 `design-tokens.json`。」  
   → 产出 `03-design-system.md` 与合法 JSON tokens

5. **页面设计**  
   「请使用 `web-page-design`，基于上述交付设计首页（及课程详情、价格策略页等），区分页面类型，继承 tokens，不要编造价格与评价。」  
   → 产出 `04-page-design/<page-id>/page-design.md`

6. **响应式设计**  
   「请使用 `web-responsive-design`，基于 page-design 与 tokens 制定断点理由、布局转换与移动导航；未跑浏览器须标 NOT TESTED。」  
   → 产出 `05-responsive-design/<page-id>/responsive-design.md`

### 输出约定

默认建议写入**用户项目**下的 `design-output/`，不要把客户项目产物提交进本 Skills 仓库（仓库内 `examples/` 仅为固定样例）。

---

## 仓库结构

```text
skills/           # 权威 Skills 源（按领域分子目录）
scripts/install/  # 安装 / 卸载
scripts/common/   # Skill Validator 等
templates/        # Skill / Workflow 编写模板
knowledge/        # 知识规范（风格库未全量迁移）
examples/         # 贯穿样例（如 online-education-site）
tests/            # 自动化测试与安装 fixture 说明
docs/             # 规范、审计、兼容性、决策日志
```

---

## 项目开发状态

| 阶段 | 状态 |
|---|---|
| P1 Skills-first 工程初始化 | 已完成 |
| P1.5 MIT、安装机制、宿主兼容性报告 | 已完成 |
| P2.0 Web Design 第一批（Brief / IA / Design System） | 已完成 |
| P2.1 `web-page-design` 与工作流整合 | 已完成 |
| P2.2 `web-responsive-design` 与工作流整合 | 已完成 |
| P2.3 `web-design-review` | **未开始** |

下一阶段建议：设计审查 Skill；并在更多宿主上补充真实运行证据。详见 [`docs/ROADMAP.md`](docs/ROADMAP.md)。

---

## 参与贡献

1. 阅读 [`CONTRIBUTING.md`](CONTRIBUTING.md)（含 **Git 提交规范**）。  
2. 编写 Skill 前阅读 [`docs/SKILL_AUTHORING_GUIDE.md`](docs/SKILL_AUTHORING_GUIDE.md) 与 [`docs/WORKFLOW_AUTHORING_GUIDE.md`](docs/WORKFLOW_AUTHORING_GUIDE.md)。  
3. 本地运行：

```bash
pnpm install
pnpm verify
```

4. 通过 Issue 讨论需求或缺陷；通过 PR 提交改进。  
5. 新增 Skill：目录名 = frontmatter `name`；依赖未实现能力须标 **planned**；禁止空壳 Skill。  
6. 遵守 [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md)。

不接受：Agent Runtime、SaaS、账户计费、未确认许可证素材等偏离项目定位的贡献。

---

## 文档与语言维护

本仓库提供：

- [`README.md`](README.md) — 简体中文主文档  
- [`README.en.md`](README.en.md) — English documentation  

两者为**同一份项目说明的两个完整语言版本**。新增能力、安装方式、兼容性状态或 Skill 列表时，**必须同步更新**两个文件，避免中英文长期不一致。

---

## License

[MIT](LICENSE) © 2026 yihang-design-pilot contributors。

第三方依赖与未迁入素材的限制见 [`docs/THIRD_PARTY_LICENSES.md`](docs/THIRD_PARTY_LICENSES.md) 与 [`NOTICE`](NOTICE)。  
**MIT 不等于** 可再分发许可证未确认的第三方资源（例如部分音频素材）。
