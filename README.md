# yihang-design-pilot

开源的**专业 AI Design Skills** 集合（[MIT License](LICENSE)）。

通过模块化 Skills 与可组合工作流，让 **Cursor / Claude Code / Codex** 等 AI Agent 在本地完成更专业的品牌、Web、PPT 设计任务。

> **不是** Agent 框架、设计引擎平台或 SaaS。  
> 价值在于：设计方法论、Skills 质量、工作流、确定性脚本与知识资产。

## 两种用法

| 方式 | 含义 | 示例 |
|---|---|---|
| 独立 Skill | 完成一个边界清晰的专业步骤 | `web-visual-direction` |
| 工作流 Skill | 编排多个独立 Skills | `web-design-workflow`（多数依赖仍为 planned） |

## 当前可用 Skills

| Skill | 类型 | 状态 |
|---|---|---|
| `web-visual-direction` | atomic | **available** |
| `web-design-workflow` | workflow | **available**（仅方向阶段依赖 available；其余 planned） |

规划中（未创建空壳）：brand / presentation / 更多 web 原子 Skills。详见 `skills/*/README.md`。

## 支持的 Agent

| 宿主 | 规范 | 隔离安装 | 运行验证 |
|---|---|---|---|
| Cursor | 已核实 | 已测 | 部分（见兼容性报告） |
| Claude Code | 已核实 | 布局已测 | **未测**（本机未装 CLI） |
| Codex | 已核实 | 布局已测 | **未测**（本机未装 CLI） |

详情：[`docs/HOST_COMPATIBILITY_REPORT.md`](docs/HOST_COMPATIBILITY_REPORT.md)、[`docs/AGENT_COMPATIBILITY.md`](docs/AGENT_COMPATIBILITY.md)。

## 安装 Skills（唯一源：`skills/`）

不要改三套拷贝。用安装脚本把叶 Skill 复制到宿主发现目录。

### 推荐：先装到隔离测试目录（已验证）

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

### 安装到当前仓库的项目级路径（已验证命令；目录 gitignore）

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName claude -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName codex -ProjectInstall
```

### 手动安装（已按官方路径核对；请自测）

| 宿主 | 将 `skills/web/web-visual-direction` 复制为 |
|---|---|
| Cursor | `.cursor/skills/web/web-visual-direction/`（允许分类嵌套）或 `.cursor/skills/web-visual-direction/` |
| Claude Code | `.claude/skills/web-visual-direction/` |
| Codex | `.agents/skills/web-visual-direction/` |

用户级目录（`~/.cursor/skills` 等）请自行决定；**脚本默认不写入**，以免覆盖你已有 Skills。

### 更新

在源仓库 `git pull` 后重新运行安装。目标已存在时默认**拒绝覆盖**；PowerShell 可加 `-ForceBackup` 先备份再替换。

### 卸载

仅删除带 `.ydp-installed.json` 的目录：

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot .cursor/skills
```

### 验证安装

1. 目标路径存在 `SKILL.md`。  
2. `pnpm validate:skills`（校验源仓）。  
3. 在宿主中显式要求「使用 web-visual-direction Skill …」。  

## 开发者

```bash
pnpm install
pnpm verify
```

## 仓库结构

```text
skills/           # 权威 Skills 源
scripts/install/  # 安装 / 卸载
scripts/common/   # Skill Validator
templates/        # 编写模板
knowledge/        # 知识规范（风格未全量迁移）
docs/             # 规范、审计、兼容性报告
tests/            # 自动化测试
```

## 文档

| 文档 | 内容 |
|---|---|
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献 |
| [docs/SKILL_AUTHORING_GUIDE.md](docs/SKILL_AUTHORING_GUIDE.md) | Skill 编写 |
| [docs/WORKFLOW_AUTHORING_GUIDE.md](docs/WORKFLOW_AUTHORING_GUIDE.md) | 工作流编写 |
| [docs/HOST_COMPATIBILITY_REPORT.md](docs/HOST_COMPATIBILITY_REPORT.md) | 宿主实测 |
| [NOTICE](NOTICE) | 第三方说明 |
| [LICENSE](LICENSE) | MIT |

## License

[MIT](LICENSE) © 2026 yihang-design-pilot contributors。

第三方依赖与未迁入素材的限制见 [`docs/THIRD_PARTY_LICENSES.md`](docs/THIRD_PARTY_LICENSES.md) 与 [`NOTICE`](NOTICE)。**MIT 不等于** Huashu BGM/SFX 等未确认资源可再分发。
