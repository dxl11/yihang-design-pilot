# Huashu Design 能力审计与代码复用分析

> 审计对象：`C:\Users\dxl19\.cursor\skills\huashu-design`（本地 skill 安装副本）  
> 官方仓库：https://github.com/alchaincyf/huashu-design（本机副本**不是** git clone）  
> 审计日期：2026-11-03  
> 原则：每项结论必须有代码/路径依据；未运行验证的能力不得标 VERIFIED。

---

## 0. 工作区与研究对象边界

| 路径 | 性质 | 是否可修改 |
|---|---|---|
| `D:\startUpBusiness\yihang-design-pilot` | 新项目（当前为空，无 `.git`） | 可写规划与后续代码 |
| `C:\Users\dxl19\.cursor\skills\huashu-design` | Huashu Design skill 完整副本 | **只读审计，禁止修改** |
| `D:\startUpBusiness\宣传\huashu-design` | 用户交付物（火柴人动画、论文模拟人生成片），非源码仓库 | 只读参考 |
| `C:\Users\dxl19\.agents\skills\huashu-art-motion` | 兄弟 skill（艺术动画），非本阶段核心 | 只读参考 |

**本机实测环境（capabilities.py）**

- 状态：`IMPLEMENTED_BUT_NOT_VERIFIED`（脚本已运行）→ 输出已记录
- Node / ffmpeg / npx：✓
- Python Playwright：✗（未安装）→ 依赖浏览器的 lint/verify/PPTX 测试未能完整跑通
- 兄弟 skill：检测到 `huashu-art-motion`
- 本机经验：`~/.huashu-design/experience.md` 已有 8 条 preference

---

## 1. 仓库整体结构（真实架构，非目录名复述）

### 1.1 形态结论

Huashu Design **不是**传统「可独立运行的设计引擎库」，而是：

1. **Agent Skill 指令层**：`SKILL.md` + `references/**`（方法论、模块手册、风格库）
2. **确定性工具层**：`scripts/**`（截图、体检、导出、记忆）
3. **资产与样张层**：`assets/**`（JSX 组件壳、风格样张、SFX/BGM、showcase）
4. **演示层**：`demos/**`（能力展示 HTML，非引擎 API）

业务设计（写 HTML、选风格、理解品牌）主要发生在 **LLM Agent 按 prompt 执行**；脚本负责可核对的机械步骤。

### 1.2 目录与入口

| 区域 | 路径 | 作用 | 状态 |
|---|---|---|---|
| Skill 入口 | `SKILL.md` | 角色定义、窄桥流程、模块路由、gate 文件 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 依赖声明 | `package.json` | `playwright` `pptxgenjs` `sharp` `pdf-lib` | DOCUMENTED；本机无 `node_modules` |
| 安全声明 | `SECURITY.md` | 网络出口、云能力隔离、本机记忆路径 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 许可证 | `LICENSE` | MIT，Copyright 2026 alchaincyf | VERIFIED（文件内容已读） |
| 测试 | `scripts/tests/` | design_lint / pptx_from_rendered 单测 | NOT_TESTED（缺 playwright / python-pptx） |
| 手工用例 | `test-prompts.json` | 6 条期望行为描述 | DOCUMENTED_BUT_NOT_VERIFIED |

### 1.3 运行方式

- 安装：`npx skills add alchaincyf/huashu-design`（README 宣称）
- 运行：由 Cursor / Claude Code / Codex 等 Agent **读取 SKILL.md 后执行**；无独立 daemon / HTTP API
- 构建：无应用构建流水线；导出脚本按需 `npm install` + `pip install`
- 部署：本地 skill 目录；明确不做 SaaS

---

## 2. Agent 系统审计

### 2.1 发现

| 问题 | 证据 | 结论 |
|---|---|---|
| Agent 数量 | `SKILL.md` 角色表：艺术总监/品牌研究员/视觉设计师/动效设计师/前端工程师/文案 | **角色分工是 prompt 约定**，不是进程级多 Agent |
| 协作机制 | `references/directions.md`：支持 subagent 并行三方向；弱 runtime 串行降级 | 依赖宿主 Agent 能力，无自有编排运行时 |
| 工具调用 | Skill 指示 Agent 调用 `scripts/*.py|mjs|js|sh` | 工具是 CLI，不是 MCP/SDK 注册表 |
| 记忆 | `learn.py` → `~/.huashu-design/experience.md`；`design_lint.py ledger` → `ledger.jsonl` | 本机文件记忆，非向量库 |
| 平台绑定 | README / SKILL：agent-agnostic；版本检查用 git ls-remote | **设计意图解耦**；实现上仍是「Skill 文件被宿主加载」 |

**判断**：业务能力（设计方法论 + 工具脚本）可迁移；「如何被 Cursor 加载」属于适配层，不应进入核心引擎。

状态：`IMPLEMENTED_BUT_NOT_VERIFIED`（角色协作无自动化测试）

---

## 3. 需求理解与设计任务规划

| 能力 | 实现位置 | 实现形态 | 状态 | 复用初判 |
|---|---|---|---|---|
| 需求解析 | `references/directions.md` Phase 1–3 | Prompt：最多 3 问 + spec 文件 | DOCUMENTED_BUT_NOT_VERIFIED | REFACTOR → 结构化 DesignBrief |
| 任务分类 | `SKILL.md` 模块路由表 | Prompt 路由到 web/deck/motion… | DOCUMENTED_BUT_NOT_VERIFIED | REUSE_WITH_MODIFICATION |
| Brief / 约束 | `directions.md` Phase 3「固化 spec」 | Markdown 文件约定 | DOCUMENTED_BUT_NOT_VERIFIED | REBUILD（数据模型） |
| 流程 / Gate | `SKILL.md` Gate 表 + `design-gate-hook.sh` | 文件存在性检查 | IMPLEMENTED_BUT_NOT_VERIFIED | REUSE_WITH_MODIFICATION |

**缺口**：无独立 `DesignTask` 状态机代码；流程靠 Agent 自觉写 gate 文件。

---

## 4. 创意方向探索

| 能力 | 证据 | 状态 |
|---|---|---|
| 三方向门（强制） | `SKILL.md` §3；`references/directions.md` | DOCUMENTED_BUT_NOT_VERIFIED |
| 六候选→挑三 | 三套逻辑：最佳设计师 / 现实参照 / 秒数轮盘 | DOCUMENTED_BUT_NOT_VERIFIED |
| 实质视觉差异 | 强调骨架差异；`design_lint.py compare` 用布局指纹防换皮 | IMPLEMENTED_BUT_NOT_VERIFIED（算法在代码中；本机缺 Playwright 未跑 compare） |
| 用户确认 | `direction-approved.md` gate | DOCUMENTED_BUT_NOT_VERIFIED |
| 参考板截图 | `scripts/ref_board.py` | IMPLEMENTED_BUT_NOT_VERIFIED |

**价值**：三方向方法论 + compare 指纹是高价值资产，应进入 Creative Strategy / Quality 模块，但要从「Agent 自觉」升级为「引擎可校验步骤」。

---

## 5. 品牌系统

| 能力 | 证据 | 状态 | 说明 |
|---|---|---|---|
| 品牌资料协议 | `references/brand-asset-protocol.md` | DOCUMENTED_BUT_NOT_VERIFIED | 五步：问→搜→下载→核验→`brand-spec.md` |
| Logo / 产品图 / UI 优先于色值 | 同上「资产 > 规范」 | DOCUMENTED_BUT_NOT_VERIFIED | 方法论成熟，无自动化管线 |
| 色彩提取 | 协议要求从 logo/真图采样；风格库有 oklch 推导 | DOCUMENTED；`design_lint` 有 oklab 距离 | **无独立 Brand 吸色 CLI** |
| 字体识别 | `references/typography.md` | DOCUMENTED_BUT_NOT_VERIFIED | 知识文档，非识别引擎 |
| Brand DNA / 版本管理 | 未发现结构化 schema / 版本库 | NOT_FOUND | 仅 `brand-spec.md` 约定 |
| 品牌资产存储 | 项目目录约定 + 本机记忆 | DOCUMENTED | 非统一 Project Store |

**结论**：品牌「协议」可借鉴；Brand DNA 引擎需 **REBUILD**。

---

## 6. 风格库与设计知识库

| 项 | 证据 | 状态 |
|---|---|---|
| 数量 | README / `design-styles.md`：网页20+PPT20+信息图20+App12+东亚12=**84** | VERIFIED（样张文件计数：jpg/html 各分区一致） |
| 样张 | `assets/style-specimens/{web,ppt,info,app,east}/*.jpg|.html` + `sheet-*.jpg` | VERIFIED（目录存在且数量匹配） |
| 与生成逻辑关联 | 秒数轮盘按秒数取编号；Agent 读条目后手写 HTML | DOCUMENTED_BUT_NOT_VERIFIED |
| 可扩展性 | Markdown 追加条目 + 样张 HTML | 可行，但缺 schema / 校验 |

**评价**：专业度高、可复用性强；不宜整库无差别复制进新项目而不做许可证与品牌剥离审查。

---

## 7. Web 设计引擎

| 能力 | 证据 | 状态 |
|---|---|---|
| HTML/CSS/JS 生成 | Agent 按 `modules/web.md` 写文件；无 codegen API | DOCUMENTED_BUT_NOT_VERIFIED |
| 组件壳 | `assets/browser_window.jsx` 等 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 响应式检查 | `verify.py --viewports` | IMPLEMENTED_BUT_NOT_VERIFIED |
| 截图 | `verify.py` Playwright | IMPLEMENTED_BUT_NOT_VERIFIED |
| 质量检查 | `design_lint.py check` | IMPLEMENTED_BUT_NOT_VERIFIED |
| 自动修改 | Prompt 指示修红灯；无自动修复器 | DOCUMENTED_BUT_NOT_VERIFIED |
| 设计系统建立 | `design-context.md` 指引读用户 codebase | DOCUMENTED_BUT_NOT_VERIFIED |

**结论**：确定性部分是 verify + lint；页面生成是 Agent 能力。新项目应把「渲染/检查」产品化，把「生成」留在 Agent + Knowledge，而不是假称已有 Web Design Engine API。

---

## 8. PPT 设计引擎

| 能力 | 证据 | 状态 |
|---|---|---|
| HTML Deck 架构 | `modules/deck.md` + `assets/deck_index.html` + `deck_stage.js` | IMPLEMENTED_BUT_NOT_VERIFIED |
| Slide Spec | Prompt/workflow form 五问；无 JSON Schema | DOCUMENTED_BUT_NOT_VERIFIED |
| 可编辑 PPTX 路线 A | `html2pptx.js` + `export_deck_pptx.mjs` + pptxgenjs；4 条硬约束 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 可编辑 PPTX 路线 B | `pptx_from_rendered.py` + python-pptx；读渲染坐标 | IMPLEMENTED_BUT_NOT_VERIFIED |
| PDF | `export_deck_pdf.mjs` / `export_deck_stage_pdf.mjs` + pdf-lib | IMPLEMENTED_BUT_NOT_VERIFIED |
| 缩略图 | `gen_deck_thumbs.mjs` | IMPLEMENTED_BUT_NOT_VERIFIED |
| 测试 | `test_pptx_from_rendered.py` | NOT_TESTED（缺 `pptx` 模块） |

**html2pptx.js 版权头**：声明 MIT、独立按规格实现，依赖 Playwright + pptxgenjs。适合作为迁移候选，需保留版权声明并做 API 包装。

---

## 9. Motion 与其他能力

| 能力 | 证据 | 成熟度判断 | 状态 |
|---|---|---|---|
| HTML 时间轴动画 | `assets/animations.jsx` + motion 模块文档 | 示例+手册成熟；非通用引擎 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 视频导出 | `render-video.js` / `render-video-seek.js` + ffmpeg | 有脚本 | IMPLEMENTED_BUT_NOT_VERIFIED |
| SFX/BGM | `assets/sfx`（37）+ `assets/bgm-*.mp3`（6） | 资产齐，许可证需单独审 | DOCUMENTED；资产存在 VERIFIED |
| TTS / AI 看片 | `scripts/cloud/*` | 可选云能力，需同意门 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 兄弟 art-motion | 独立 skill | 超出本仓库 | 外部 |

**第一阶段建议**：DEFER 完整 Motion；仅保留架构扩展点。

---

## 10. 质量检查机制

| 检查类型 | 是否真正执行 | 证据 |
|---|---|---|
| 字号 / 对比度 / 裂图 / 控制台 | **确定性**（Playwright DOM + 像素色） | `design_lint.py` COLLECT_JS + judge |
| AI slop 模板装饰 | **启发式规则** | eyebrows / arrows / 01-02-03 等 |
| 三方向换皮 | **指纹相似**（布局向量+色板+字体） | `compare` / `similar` |
| 外观账本撞车 | **本机 ledger.jsonl** | `ledger check` |
| 「好不好看」 | **不判断**（文档明确品味归用户） | 文件头注释 |
| 品牌一致性 | 部分：`--brand` 只比骨架 | 非完整 Brand DNA 校验 |
| 自动修复 | 无自动 patch 引擎 | Agent 手工改 |

本机验证：

- `design_lint.bg_class((0xF4,0xF1,0xEA))` → `浅·暖纸`：**VERIFIED**
- Playwright 依赖测试：多数失败/跳过：**NOT_TESTED** 完整链路

---

## 11. 记忆与项目资产

| 存储 | 路径 | 内容 | 状态 |
|---|---|---|---|
| 用户偏好/经验 | `~/.huashu-design/experience.md` | Markdown 条目 | VERIFIED（本机存在且 learn status 可读） |
| 外观账本 | `~/.huashu-design/ledger.jsonl` | 交付指纹 | IMPLEMENTED_BUT_NOT_VERIFIED |
| 项目产物 | 用户项目目录约定（design-demos、gate 文件） | 文件系统 | DOCUMENTED |
| 随 skill 分发经验 | `references/experience.md` | 通用教训 | IMPLEMENTED_BUT_NOT_VERIFIED |

**缺口**：无统一 ProjectMemory schema、无任务历史状态机、无品牌版本库。

---

## 12. 能力状态总表（摘要）

| ID | 能力 | 状态 | 建议处置（详见 IMPLEMENTATION_DECISIONS） |
|---|---|---|---|
| A1 | Skill/Prompt 工作室角色 | DOCUMENTED_BUT_NOT_VERIFIED | REFACTOR → Adapter 指令包 |
| A2 | 三方向方法论 | DOCUMENTED_BUT_NOT_VERIFIED | REUSE_WITH_MODIFICATION |
| A3 | Brand 资产协议 | DOCUMENTED_BUT_NOT_VERIFIED | REFACTOR → Brand Engine 流程 |
| A4 | Brand DNA 存储 | NOT_FOUND | REBUILD |
| A5 | 84 风格库+样张 | VERIFIED（文件存在） | REUSE_WITH_MODIFICATION（许可证审查后） |
| A6 | design_lint | IMPLEMENTED_BUT_NOT_VERIFIED | DIRECT_REUSE / 轻改 |
| A7 | verify 截图 | IMPLEMENTED_BUT_NOT_VERIFIED | DIRECT_REUSE |
| A8 | html2pptx / export pptx | IMPLEMENTED_BUT_NOT_VERIFIED | REUSE_WITH_MODIFICATION |
| A9 | pptx_from_rendered | IMPLEMENTED_BUT_NOT_VERIFIED | REUSE_WITH_MODIFICATION |
| A10 | PDF export | IMPLEMENTED_BUT_NOT_VERIFIED | DIRECT_REUSE |
| A11 | learn / ledger 记忆 | IMPLEMENTED_BUT_NOT_VERIFIED | REFACTOR → Project Storage |
| A12 | Web/PPT 页面生成引擎 | DOCUMENTED（Agent 生成） | REBUILD（协议+模板，非抄 prompt） |
| A13 | Motion 全链路 | IMPLEMENTED_BUT_NOT_VERIFIED | DEFER |
| A14 | Cloud TTS/AI review | IMPLEMENTED_BUT_NOT_VERIFIED | DEFER / 可选插件 |
| A15 | SaaS/账户 | NOT_FOUND | REJECT |

---

## 13. 原项目架构缺陷（基于代码）

1. **引擎与 Agent 未分离**：核心是 Skill 文档，无法 `import` 后无 Agent 跑通设计任务。
2. **无统一数据模型**：Brief/Direction/Brand/Quality 均为 Markdown 约定。
3. **无任务状态机**：依赖 gate 文件与 Agent 自觉。
4. **测试环境脆弱**：单测强依赖 Playwright Chromium / python-pptx；本机缺依赖即大面积失败。
5. **双语言工具链**（Node + Python + Shell）增加开源贡献门槛（尤其 Windows）。
6. **资产许可证不透明**：BGM 来源未在仓库内给出可再分发证明；SFX 声明 ElevenLabs 生成，商用再分发需确认。
7. **作者品牌与产品能力耦合**：about-author、版本检查、个人素材模板等对独立 fork 需剥离。

---

## 14. 审计方法局限（诚实声明）

- 未修改、未安装原仓库依赖；未对原仓库执行 `npm install` / `playwright install`。
- 未端到端生成真实 Web/PPT 交付物来验证 README 案例。
- 官方 GitHub 最新 tag 与本地 skill 版本一致性未用 `git ls-remote` 强制核对（本地非 git 仓库）。
- `宣传/huashu-design` 仅证明「用户曾用该流程交付动画」，不能证明引擎 API 存在。

下一步开发前，建议在**隔离目录**克隆官方仓库并补齐依赖后，将 A6–A10 提升为 VERIFIED。
