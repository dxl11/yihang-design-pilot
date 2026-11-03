# 开源策略

> yihang-design-pilot 作为长期维护的本地开源工具的协作与发布策略。

---

## 1. 许可证候选

| 候选 | 优点 | 风险 | 建议 |
|---|---|---|---|
| **MIT** | 与 Huashu 可复用脚本兼容；贡献门槛低 | 专利/商标需另声明 | **默认推荐** |
| Apache-2.0 | 专利条款更明确 | 与部分素材说明组合更冗长 | 备选 |
| GPL-3.0 | 强传染 | 阻碍企业内网改用；与 MIT 依赖组合麻烦 | **不推荐** |

**决策草案**：源代码 **MIT**；文档 CC BY 4.0 可选；字体/音频等资产 **禁止**在未单独授权时按 MIT 理解。

保留上游版权声明：凡 DIRECT_REUSE / MODIFICATION 自 Huashu 的文件，在文件头与 `NOTICE` 列出。

---

## 2. 仓库与工程基础文件（分期）

| 文件 | P1 | P5 |
|---|---|---|
| README.md | ✓ | ✓ |
| LICENSE | ✓ | ✓ |
| NOTICE | ✓（若已复用） | ✓ |
| CONTRIBUTING.md | 简版 | 完整 |
| CODE_OF_CONDUCT.md | 可选 | ✓ |
| SECURITY.md | 简版（本地工具威胁模型） | ✓ |
| CHANGELOG.md | ✓ | ✓ |
| .gitignore / .editorconfig | ✓ | ✓ |
| .env.example | 仅当有可选云插件时 | ✓ |
| package.json / pnpm-workspace | ✓ | ✓ |
| Issue / PR 模板 | — | ✓ |

---

## 3. 文档体系规划

| 文档 | 受众 |
|---|---|
| README 快速开始 | 所有用户 |
| docs/install.md | 安装与 doctor |
| docs/architecture.md（可由 SYSTEM_ARCHITECTURE 精简发布） | 开发者 |
| docs/adapters/*.md | Agent 接入 |
| docs/engines/*.md | 各引擎 |
| docs/protocol.md | CLI/JSON 协议 |
| docs/plugins.md | 扩展边界（后期） |
| docs/data.md | 本地 `.ydp` 布局与备份 |
| docs/troubleshooting.md | 故障 |
| CONTRIBUTING | 贡献 |
| THIRD_PARTY_LICENSES | 合规 |

本轮已有的八份规划文档保留在 `docs/`，发布时可再导出「用户版」缩略。

---

## 4. 测试与 CI

**本地**：

- 单元：FSM、schema、fingerprint 纯函数  
- 集成：临时目录 store  
- 导出烟测：fixture HTML→PDF/PPTX（标记 `heavy`）  
- Adapter：契约测试（快照指令包含必要 CLI 名）  

**GitHub Actions 建议矩阵**：

| Job | 内容 |
|---|---|
| lint | ESLint / Prettier / typecheck |
| unit | Vitest 无浏览器 |
| heavy（可 nightly） | Playwright + 导出 |
| release | tag 时 npm 发布 CLI（若需要）或仅 GitHub Release 附件 |

不做：云端租户 E2E、付费墙测试。

---

## 5. 版本与发布

- SemVer：`0.x` 允许破坏性；`1.0` 起稳定 CLI 协议  
- Tag：`vMAJOR.MINOR.PATCH`  
- Changelog：Keep a Changelog  
- Release 说明：安装方式、破坏性变更、许可证注意  

---

## 6. 社区协作

**欢迎**：

- Bug / Windows 路径修复  
- Quality rule  
- Exporter  
- Adapter  
- Knowledge pack（须带许可声明）  
- 文档与无障碍安装  

**不欢迎 / 将关闭**：

- SaaS、账户、支付、多租户 PR  
- 未说明来源的字体/音乐/商标素材  
- 整库粘贴第三方 Skill 却无归因  
- 要求绑定单一闭源模型 API 为默认  

贡献流程：Issue 讨论 → 小组 PR → CI → Maintainer squash/merge。

---

## 7. 安全披露

- SECURITY.md：支持邮件或私有顾问报告  
- 范围：CLI 路径穿越、任意 URL 截图 SSRF 风险、依赖漏洞  
- 非范围：LLM 幻觉导致的设计内容错误  

---

## 8. 与上游 Huashu 的关系声明（建议 README 措辞）

- 本项目是独立开源引擎，**灵感与部分确定性工具策略**参考了 huashu-design（MIT）。  
- 运行时不依赖花叔 skill 目录。  
- 不是官方 fork 品牌；不代表原作者背书。  

---

## 9. 商标与命名

- 代码名：`yihang-design-pilot`  
- 避免在营销中使用「Claude Design」「花叔」等第三方商标暗示官方关系（致谢除外）  

---

## 10. 维护策略

- 小核心：优先修导出/质检/安装  
- 知识包可社区高频贡献，核心 FSM 谨慎变更  
- 每年依赖升级窗口；Playwright 大版本单独验证  
- 若维护者精力不足：冻结功能，只收安全补丁，并在 README 标明 status  

---

## 11. 待用户确认

1. 最终许可证是否 MIT？  
2. 是否使用 GitHub 作为主托管（或 Gitee 镜像）？  
3. 是否需要组织账号/个人账号发布？  
4. CoC 是否采用 Contributor Covenant 标准文本？
