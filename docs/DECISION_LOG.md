# 决策日志

记录 Prompt / 审计文档之间的冲突与本项目最终裁定。不得静默改写历史审计结论。

---

## 2026-11-03 · D-001：项目形态从「设计引擎」收敛为「Skills 项目」

### 冲突来源

| 来源 | 表述 |
|---|---|
| Prompt 0 / `SYSTEM_ARCHITECTURE.md` / `ROADMAP.md` P1 | 独立 Core Engine、`ydp` CLI、packages 多引擎、FSM |
| Prompt 1（本阶段） | **开源专业设计 Skills 项目**；禁止开发 Agent / Runtime / 独立设计引擎平台 |

### 裁定（以 Prompt 1 为准）

1. **核心交付物** = Skills + 方法论 + 工作流 + 知识 + 模板 + 辅助脚本 + 质量规则。  
2. 确定性脚本是 Skills 的工具，**不是**独立设计引擎产品。  
3. Prompt 0 中的引擎/FSM/CLI 规划保留为**历史参考与远期可选能力**，P1 **不实现** `apps/cli`、`packages/core` 等引擎骨架。  
4. 不删除、不覆盖 Prompt 0 八份审计文档；其复用/许可证结论仍然有效。  
5. `IMPLEMENTATION_DECISIONS.md` 中目标路径（如 `packages/quality-engine`）在 Skills 形态下映射为：`scripts/` + 相关 Skill 的 `scripts/`，待后续阶段再迁。

### 影响

- P1 目录以 `skills/`、`knowledge/`、`templates/`、`scripts/` 为主。  
- Agent 兼容通过「同一套 SKILL.md + 安装到各宿主发现路径」实现，而非 Adapter SDK。

---

## 2026-11-03 · D-002：开源许可证暂不落盘为已确认 MIT

### 依据

- `OPEN_SOURCE_STRATEGY.md`：MIT 为推荐，待用户确认。  
- Prompt 1：未批准前不得宣称已采用 MIT；可写 `LICENSE_DECISION.md`。

### 裁定

- 创建 `LICENSE_DECISION.md`，**暂不**添加宣称生效的 `LICENSE` 文件正文为项目已选定许可证。  
- README 写明「推荐 MIT，最终以 LICENSE_DECISION 确认结果为准」。

---

## 2026-11-03 · D-003：不默认复制 Huashu BGM/SFX/整库风格

### 依据

- `THIRD_PARTY_LICENSES.md`：BGM/SFX 为 `LICENSE_UNCONFIRMED`。  
- Prompt 1：P1 不迁移全部 84 风格。

### 裁定

- P1 仅建立 `knowledge/` 组织规范与筛选标准。  
- 零音频资产迁入。  
- Huashu 目录只读。

---

## 2026-11-03 · D-002 确认：正式采用 MIT

### 依据

- 维护者在 Prompt 1.5 中明确：开源许可证 = MIT。  
- 历史 D-002（暂不落盘）保留上文，不被删除。

### 裁定

1. 根目录添加标准 MIT `LICENSE`（Copyright (c) 2026 yihang-design-pilot contributors）。  
2. 更新 `LICENSE_DECISION.md` 为已确认。  
3. README / NOTICE / THIRD_PARTY 明确：MIT 不覆盖未确认第三方素材。  
4. BGM/SFX 等仍禁止默认分发。

---

## 2026-11-03 · D-004：Git 基线与安装策略

### 裁定

1. 在许可证落地与敏感信息检查后建立首次 commit：`chore: establish MIT open-source baseline`。  
2. `skills/` 为唯一权威源；安装脚本仅复制到宿主发现目录。  
3. Cursor 安装保留 domain 嵌套（官方支持递归发现）；Claude Code / Codex 安装为扁平叶目录。  
4. 默认安装目标为隔离 fixture；禁止静默覆盖；用 `.ydp-installed.json` 标记可安全卸载。

---

## 2026-11-03 · D-005：宿主兼容性结论（P1.5）

详见 `docs/HOST_COMPATIBILITY_REPORT.md`。

摘要：

- Cursor：规范已重核；隔离安装 PASS；本机 Cursor Agent 会话对 Skill 指令执行验证为 PARTIAL（见报告）。  
- Claude Code：规范已重核；隔离布局安装 PASS；宿主 CLI **未安装** → 运行验证 BLOCKED。  
- Codex：规范已重核；隔离布局安装 PASS；宿主 CLI **未安装** → 运行验证 BLOCKED。

---

## 2026-11-03 · D-006：Web Design 原子 Skills 职责划分（P2.0）

### 裁定

| Skill | 职责边界 | 默认交付 |
|---|---|---|
| `web-design-brief` | 商业/用户/约束 → 可验证 Design Brief；不画视觉、不做 Sitemap 定稿 | `design-output/01-design-brief.md` |
| `web-information-architecture` | 内容与任务 → Sitemap/导航/路径；不定视觉 tokens | `design-output/02-information-architecture.md` |
| `web-visual-direction` | 视觉策略与方向探索；不写完整组件库 | `design-output/visual-direction*.md`（兼容旧文件名） |
| `web-design-system` | Tokens/组件/响应式/无障碍规则；不写全站页面 HTML | `design-output/03-design-system.md` + `design-tokens.json` |

并行规则：IA 与 Visual Direction 可在 Brief 之后并行；Design System 须在 **批准的视觉方向**（或显式跳过记录）之后，并建议已有 IA。

方法论基线（行业通用 + 本项目执行规范）：

- Brief：目标分层、JTBD/任务分析、假设标注、成功指标待确认。  
- IA：内容盘点、任务优先于组织部门、导航模型、路径与死路检查。  
- Design System：语义化 tokens、组件状态完备、WCAG 2.2 AA **目标**（非无证据宣称已认证）。

---

## 2026-11-03 · D-007：页面设计 Skill 边界与交付（P2.1）

### 裁定

1. `web-page-design` 只做**页面级**规格：任务/类型、信息层级、结构、布局执行、交互状态、内容结构、自检。  
2. **不**重做 Brief / 全站 IA / 视觉方向选定 / 全局 tokens；数值与组件继承 `03-design-system` 与 `design-tokens.json`。  
3. 默认输出：`design-output/04-page-design/<page-id>/page-design.md`（必需六节）；多页用 `_index.md`。  
4. 允许案例中设计 IA 尚未纳入的验证页（如定价页），但必须声明偏离，且**不得**把未确认价格写成 FACT。  
5. （历史）当时 `web-responsive-design` 与 `web-design-review` 仍为 planned；响应式已由 **D-008 / P2.2** 交付，审查仍 planned。

---

## 2026-11-03 · D-008：响应式设计 Skill 边界（P2.2）

### 裁定

1. `web-responsive-design` 只定义跨视口**如何变、为何变、如何验**；不重做 Page Design / 全局 tokens。  
2. 断点优先继承 `design-tokens.json` 的 `breakpoint.*`；须写冲突驱动理由，禁止只抄设备名。  
3. 输出：`design-output/05-responsive-design/<page-id>/responsive-design.md`（14 节）。  
4. 未跑浏览器/工具时必须标 **NOT TESTED**；禁止宣称 WCAG 已认证或真机已通过。  
5. 窄屏不得静默删除决策信息（定价权益、适合/不适合等）；可折叠或改布局。  
6. （历史）当时 `web-design-review` 仍 planned；审查已由 **D-009 / P2.3** 交付。

---

## 2026-11-04 · D-009：设计审查 Evidence 与结论（P2.3）

### 裁定

1. `web-design-review` 为独立原子 Skill；Workflow 只编排，不替代方法论。  
2. 输出：`design-output/06-design-review/<page-id>/design-review.md`（12 节）。  
3. Evidence Model 强制区分规格意图 vs 截图呈现 vs 浏览器行为；缺证 → `NOT TESTED`。  
4. 结论集：`APPROVED` | `APPROVED_WITH_NOTES` | `NEEDS_REVISION` | `BLOCKED` | `INSUFFICIENT_EVIDENCE`；CRITICAL 确证不得 APPROVED。  
5. 仓库案例可用 `CASE_DEMO` Issue 演示写法，不得伪装为线上实测。  
6. 不开发 Agent Runtime / Implementation Skill 空壳。
