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

## 行为准则

见 `CODE_OF_CONDUCT.md`。
