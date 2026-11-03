# 贡献指南

感谢关注 yihang-design-pilot。本项目是**专业设计 Skills** 开源库，不是 Agent 框架，也不是 SaaS。

## 开始之前

1. 阅读 `README.md`、`docs/SKILL_AUTHORING_GUIDE.md`、`docs/WORKFLOW_AUTHORING_GUIDE.md`。  
2. 阅读 `docs/DECISION_LOG.md`，理解当前「Skills 优先」定位。  
3. 不要提交账户系统、计费、多租户、Agent Runtime 相关 PR（将被关闭）。  
4. 不要提交许可证未确认的字体/音乐/商标素材。

## 开发环境

- Node.js 22+  
- pnpm 9+  

```bash
pnpm install
pnpm verify
```

## 贡献类型（欢迎）

| 类型 | 说明 |
|---|---|
| Skill 内容 | 独立专业 Skill / 工作流 Skill |
| 知识包 | `knowledge/` 下可执行风格与规则（须含许可信息） |
| 脚本 | `scripts/` 确定性工具 + 测试 |
| 文档 / 安装适配 | Agent 兼容说明 |
| Bug / Windows 路径 | 校验器与 CI |

## Skill PR 检查清单

- [ ] 目录名 = frontmatter `name` = kebab-case  
- [ ] `description` 含 WHAT + WHEN，第三人称  
- [ ] 职责边界清晰；工作流依赖未实现 Skill 已标 `planned`  
- [ ] `pnpm validate:skills` 通过  
- [ ] 新增测试（若改校验器或脚本）  

## 提交流程

1. Fork / 开分支。  
2. 本地 `pnpm verify`。  
3. 开 PR，用仓库模板说明动机与测试。  
4. 等待 CI 与维护者审阅。

## Git 提交规范（长期有效）

每个明确完成的开发任务或逻辑完整的修改批次，**必须**提交 Git。禁止只改代码不 commit。

### 开始任务前

```bash
git status
git branch --show-current
git log -5 --oneline
```

工作区若不干净：先识别修改归属。不得擅自丢弃、覆盖或提交不属于当前任务的用户改动。

### 提交前检查清单

1. 核对 `git status` / `git diff` 范围。  
2. 运行相关测试与 `pnpm verify`。  
3. 确认无密钥、Token、临时垃圾文件。  
4. 使用 Conventional Commits 编写可读 message。  
5. commit 后用 `git status` / `git log -1` 确认结果。

### Commit Message 格式

```text
<type>(<scope>): <简洁主题>

<body：说明为何修改、改了什么、测试结果、已知限制>
```

常用 `type`：`feat` / `fix` / `docs` / `test` / `refactor` / `chore` / `build` / `ci`。

禁止无信息备注：`update`、`modify`、`fix`、`完成`、`优化` 等。

### 提交边界

- 一个 commit 对应一个完整逻辑批次（例如「双语 README」或「某一个 Skill」）。  
- 不要混入不相关改动；也不要为刷数量拆无意义小提交。

### 安全

禁止未经授权的 `git reset --hard`、`git clean -fd`、强制推送、重写已推送历史。  
禁止提交密钥与密码。除非维护者明确要求，不要 amend 他人或已推送提交。

### 双语文档

修改 `README.md` 或 `README.en.md` 时必须检查另一语言版本是否需同步（安装、Skills 列表、兼容性、许可证等）。

## 行为准则

见 `CODE_OF_CONDUCT.md`。
