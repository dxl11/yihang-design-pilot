# 实施路线图

> 从空仓库到可维护的开源稳定版。  
> **2026-11-03 更新**：P1 按 Prompt 1 收敛为 **Skills 项目初始化**（见 `DECISION_LOG.md` D-001）。下文 P1「空心引擎 / ydp CLI」段落保留为 Prompt 0 历史方案，**不再作为当前实施目标**；当前 P1 以 Skills 规范、Validator、示例 Skills 与 CI 为准。

---

## 总览

```text
P0 审计规划 → P1 Skills 工程初始化 → P1.5 MIT/安装/宿主兼容
    → P2.0 Web Design Skills 第一批（Brief / IA / Design System）
    → P2.1 web-page-design + 工作流整合
    → P2.2 web-responsive-design + 工作流整合 ← 当前完成待审
    → P2.3 web-design-review（未开始）
    → 质检/导出脚本与品牌/PPT Skills（按需，见下文历史编号）
```

---

## P2.0 — Web Design Skills 第一批（Prompt 2.0）

**目标**：交付真正可独立调用的专业 Web 原子 Skills，而非空壳 Prompt。

| Skill | 状态 |
|---|---|
| `web-design-brief` | **已完成** |
| `web-information-architecture` | **已完成** |
| `web-design-system` | **已完成** |
| `web-visual-direction` | 既有；已做交接路径最小更新 |
| `web-design-workflow` | 既有；依赖状态已更新（P2.1 再更新 page-design） |

验收：`pnpm verify`；`examples/web/online-education-site` 贯穿案例；D-006。

**本阶段不做**：Agent Runtime、设计引擎、SaaS、Huashu 风格全量迁移。

---

## P2.1 — Web Page Design（Prompt 2.1）

**目标**：页面级专业设计 Skill，继承 Brief/IA/方向/系统，输出可交接页面规格。

| Skill | 状态 |
|---|---|
| `web-page-design` | **已完成** |
| `web-design-workflow` | 阶段 6 → available |
| `web-design-review` | **未开始**（禁止空壳；见 P2.3） |

验收：三页案例（首页/课程详情/价格策略）；结构+案例测试；`pnpm verify`；D-007。

---

## P2.2 — Web Responsive Design（Prompt 2.2）

**目标**：在 Page Design 与 Design System 之上交付跨视口专业响应式规格。

| Skill | 状态 |
|---|---|
| `web-responsive-design` | **已完成** |
| `web-design-workflow` | 阶段 7 → available |
| `web-design-review` | **未开始**（禁止空壳） |

验收：三页差异化响应式案例；NOT TESTED 诚实标记；`pnpm verify`；D-008。

---

## P0 — 审计与规划

**产出**：`docs/` 八份文档  
**完成定义**：用户确认「可进入正式开发」  
**不做**：业务代码、复制 HD 整库  

状态：已完成；作为决策依据保留。

---

## P1 — Skills 工程初始化（Prompt 1 · 已完成）

**目标**：可校验的开源 Skills 仓库骨架。

任务：

1. Git + 基础工程（pnpm / TypeScript / ESLint / Vitest / CI）  
2. Skill / Workflow / Agent 兼容规范文档  
3. Skill 与 Workflow 模板  
4. Skill Validator  
5. 示例：`web-visual-direction`、`web-design-workflow`  
6. 不添加账户/SaaS；不开发 Agent Runtime；不开发独立设计引擎平台  

验收：

- `pnpm verify` 通过  
- `pnpm validate:skills` 无 error  

### Prompt 0 原 P1 方案（历史保留 · 已由 D-001 搁置）

原目标：可安装的空心引擎，证明架构独立。

1. 初始化 git、MIT LICENSE、README、package 管理（建议 pnpm + TypeScript）  
2. `apps/cli`：`ydp doctor` / `ydp task create` / 状态展示  
3. `packages/core`：DesignTask FSM + JSON Schema  
4. `packages/project-store`：`.ydp/` 目录约定  
5. CI：lint + typecheck + unit（无浏览器）  
6. 明确 **不** 添加账户/SaaS 代码  

原验收：

- 克隆后 `pnpm i && pnpm test` 通过  
- 手工创建任务可从 CREATED 走到 WAITING_FOR_APPROVAL（mock）  

---

## P2 — 质量与导出可验证迁移

**目标**：把 HD 中已证明有代码的确定性工具变成 VERIFIED。

任务：

1. 隔离目录安装 Playwright / 相关依赖（不改 HD 原目录也可 vendor 拷贝经审查的文件）  
2. 迁移 design_lint / verify / pdf / pptx 路径，改前缀与报告 schema  
3. 恢复 fixtures 回归  
4. Windows 路径与退出码规范化  

验收：

- CI 含 Chromium 烟测（可 nightly）  
- 样例 HTML → PNG + QualityReport  
- 样例 deck → PDF；至少一个 PPTX mode 成功  

---

## P3 — 设计闭环 MVP（Web + PPT）

**目标**：一条真实样例项目跑通，仍主要由 Agent 生成 HTML。

任务：

1. Creative Strategy：direction 文件格式 + approve CLI  
2. Knowledge：迁入 Web/PPT 风格子集（许可证审查后）  
3. Presentation templates：deck_index 参数化  
4. Web 交付约定 + 响应式 verify  
5. 端到端样例：`examples/landing-mvp`、`examples/pitch-mvp`  

验收：

- 文档中的「人工+Agent」步骤 30–60 分钟可复现  
- 无 Brand 时也能完成；有 Brand 时 tokens 被引用  

---

## P4 — 多 Agent 适配

任务：

1. `adapters/cursor`、`claude-code`、`codex` 最小指令包  
2. 统一只教 Agent 调用 `ydp` CLI  
3. 弱模型降级说明（串行三方向等）写入 Adapter  

验收：至少两个宿主按文档完成同一 example。

---

## P5 — 开源 v0.1 发布

任务：

1. NOTICE + 第三方许可证扫描  
2. SECURITY / CONTRIBUTING / Issue 模板  
3. GitHub Actions 发布 workflow  
4. Changelog / Tag `v0.1.0`  

验收：外部贡献者按 README 安装成功；无 `LICENSE_UNCONFIRMED` 资产被打包。

---

## P6 — 品牌引擎增强

任务：

1. BrandProfile 版本、diff  
2. 半自动吸色（基于已有 logo，可用 sharp）  
3. 质量规则：品牌主色偏离检测（启发式）  
4. Brand pack import/export  

验收：同一 Brand 下两个任务视觉 tokens 一致率可人工抽检通过。

---

## P7 — 后续品类（按需）

优先级建议：海报 → 社交媒体 → 信息图 → Motion → 电商视觉。  
每一品类：Knowledge pack + Quality rules + Export；不先写 SaaS。

---

## 最小可运行版本（MVP）应包含什么

1. CLI + Core FSM + 本地 Store  
2. Quality check + HTML 截图  
3. Deck PDF 导出  
4. PPTX 至少一种模式  
5. Direction 审批门禁  
6. 一个 Web example + 一个 PPT example  
7. 一个 Agent Adapter  
8. 干净许可证  

**显式排除**：完整 Brand DNA AI、Motion 成片、云 TTS、84 风格全量、插件市场。

---

## 依赖本轮用户确认的事项

- [ ] 技术栈：是否接受 **Node 22 + TypeScript + pnpm** 为默认，Python 仅保留 pptx_from_rendered 过渡  
- [ ] 许可证：MIT 是否最终确认  
- [ ] 是否允许在隔离环境安装 Playwright 以提升 VERIFIED 比例  
- [ ] 风格库迁移范围：全量 84 vs Web+PPT 子集  
- [ ] 项目中文名/品牌展示名是否仅用 `yihang-design-pilot`  

确认前 **不开始 P1 编码**（遵从 Prompt 0 停止条件）。
