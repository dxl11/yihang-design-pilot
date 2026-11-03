# 核心能力实施决策矩阵

> 分类仅允许：DIRECT_REUSE / REUSE_WITH_MODIFICATION / REFACTOR / REBUILD / DEFER / REJECT  
> 审计对象路径前缀：`HD = C:\Users\dxl19\.cursor\skills\huashu-design`  
> 新项目目标根：`YDP = yihang-design-pilot`

---

## 决策总表

| ID | 能力 | 决策 | 迁移工作量 | 目标位置 |
|---|---|---|---|---|
| D01 | design_lint.py（事实体检/指纹/ledger） | REUSE_WITH_MODIFICATION | M | `packages/quality-engine` |
| D02 | verify.py（截图/控制台） | DIRECT_REUSE | S | `packages/quality-engine` |
| D03 | html2pptx.js + export_deck_pptx.mjs | REUSE_WITH_MODIFICATION | M | `packages/export-engine` |
| D04 | pptx_from_rendered.py | REUSE_WITH_MODIFICATION | M | `packages/export-engine` |
| D05 | export_deck_pdf.mjs / stage pdf | DIRECT_REUSE | S | `packages/export-engine` |
| D06 | gen_deck_thumbs.mjs | DIRECT_REUSE | S | `packages/export-engine` |
| D07 | ref_board.py | REUSE_WITH_MODIFICATION | S | `packages/creative-strategy` |
| D08 | learn.py 记忆模型 | REFACTOR | M | `packages/project-store` |
| D09 | capabilities.py | REFACTOR | S | `packages/core` / CLI doctor |
| D10 | deck_index.html / deck_stage.js | REUSE_WITH_MODIFICATION | M | `packages/presentation-engine/templates` |
| D11 | browser/ios/macos frame JSX | REUSE_WITH_MODIFICATION | S | `packages/web-engine/shells` |
| D12 | animations.jsx / motion 渲染链 | DEFER | — | 后续 `motion-engine` |
| D13 | SFX / BGM 资产 | REJECT（再分发） | — | 用户本地可选 |
| D14 | cloud TTS / AI review | DEFER | — | 可选 plugin |
| D15 | 三方向方法论（directions.md） | REFACTOR | M | Knowledge + Creative Strategy 协议 |
| D16 | brand-asset-protocol.md | REFACTOR | M | Brand Engine 流程规范 |
| D17 | Brand DNA / 版本库 | REBUILD | L | `packages/brand-engine` |
| D18 | design-styles 84 + specimens | REUSE_WITH_MODIFICATION | L | `packages/knowledge`（许可证审查后） |
| D19 | typography / content-guidelines | REUSE_WITH_MODIFICATION | S | `packages/knowledge` |
| D20 | SKILL.md 工作室角色全文 | REFACTOR | M | Agent Adapter prompts（去作者绑定） |
| D21 | Web/PPT「页面生成」 | REBUILD | L | Agent + 模板/约束，非抄整库 prompt |
| D22 | 任务状态机 / DesignTask | REBUILD | M | `packages/core` |
| D23 | fetch_images.py | REUSE_WITH_MODIFICATION | S | 可选 tool plugin |
| D24 | design-gate-hook.sh | REUSE_WITH_MODIFICATION | S | core hooks（跨平台改写） |
| D25 | about-author / 版本检查广告 | REJECT | — | 不进入产品核心 |
| D26 | SaaS/账户/计费 | REJECT | — | — |
| D27 | huashu-art-motion 整库 | DEFER | — | 未来集成评估 |
| D28 | demos/ / showcases 营销页 | REJECT（作运行时） | S 可选 docs 引用 | 文档截图需授权 |

工作量：S < 2 人日；M 3–10 人日；L > 10 人日（含测试与文档）。

---

## 逐项说明

### D01 design_lint — REUSE_WITH_MODIFICATION

1. **原路径**：`HD/scripts/design_lint.py`，测试 `HD/scripts/tests/test_design_lint.py` + fixtures  
2. **实现**：Playwright 采集 DOM 事实；红/黄灯规则；fingerprint/compare；ledger.jsonl  
3. **理由**：确定性质量门禁，新项目刚需；算法已有回归意图  
4. **问题**：强依赖 Python Playwright；本机未 VERIFIED 完整跑通  
5. **许可**：MIT 主体脚本，保留版权  
6. **工作量**：M（改存储路径前缀、JSON 报告 schema、包名）  
7. **目标**：`packages/quality-engine`  
8. **验收**：fixtures 全绿；compare 能抓换皮；CLI 输出 QualityReport JSON

### D02 verify.py — DIRECT_REUSE

1. **原路径**：`HD/scripts/verify.py`  
2. **实现**：打开 HTML、多 viewport 截图、收集 pageerror/console  
3. **理由**：小而清晰，几乎可原样作为渲染探针  
4. **问题**：networkidle 对离线文件偶发慢；Windows 路径需测  
5. **许可**：随 MIT  
6. **工作量**：S  
7. **目标**：quality-engine  
8. **验收**：对样例 HTML 产出截图且 JS error 时 exit ≠ 0

### D03/D04 PPTX 双路线 — REUSE_WITH_MODIFICATION

1. **原路径**：`html2pptx.js`、`export_deck_pptx.mjs`、`pptx_from_rendered.py`  
2. **实现**：A 约束写 HTML→pptxgenjs；B 渲染后坐标→python-pptx  
3. **理由**：行业实用，重写成本高且易退化  
4. **问题**：双栈；A 约束苛刻；B 依赖 python-pptx  
5. **许可**：html2pptx 有明确 MIT 头；保留  
6. **工作量**：M  
7. **目标**：export-engine 统一 `export pptx --mode constrained|rendered`  
8. **验收**：约束样例与视觉样例各 1 套可打开编辑；丢字检测报告

### D05/D06 PDF / thumbs — DIRECT_REUSE

验收：多页 PDF 可搜文字；缩略图供 overview。

### D07 ref_board — REUSE_WITH_MODIFICATION

去 Huashu 命名；输出纳入 DesignDirection 附件。注意任意 URL 截图的安全提示（SECURITY.md 已声明）。

### D08 learn.py — REFACTOR

从「随用户全局品味」升级为：**项目级 ProjectMemory + 可选全局偏好**；字段结构化；禁止默认写死 `~/.huashu-design`。

### D09 capabilities — REFACTOR

变为 `ydp doctor`：检查 node/pnpm/playwright/ffmpeg（可选）/适配器。

### D10–D11 模板壳 — REUSE_WITH_MODIFICATION

去品牌文案；参数化项目名；纳入 presentation/web templates。

### D12 Motion — DEFER

第一阶段不做视频主路径；接口预留 `ArtifactType.MOTION`。

### D13 音频资产 — REJECT

见许可证审计；接口保留 `AudioTrack` 用户路径。

### D14 Cloud — DEFER

插件命名空间；默认不编译进核心。

### D15 三方向 — REFACTOR

沉淀为：DirectionProposal 协议 + 最少 3 个实质差异维度校验（可调用 lint compare）+ WAITING_FOR_APPROVAL 状态。不整抄叙事长文进运行时。

### D16–D17 Brand — REFACTOR + REBUILD

协议步骤可保留为 runbook；BrandProfile / BrandDNA 版本化存储必须自研。

### D18 风格库 — REUSE_WITH_MODIFICATION

审查样张许可后，改为 Knowledge pack：`id/meta/specimen/params`；宁缺毋滥，可先迁 Web+PPT 子集。

### D19 排印与内容底线 — REUSE_WITH_MODIFICATION

作为 Quality 规则与 Knowledge 条文。

### D20 Skill 角色 — REFACTOR

每个 Adapter 提供精简 system guidance；去除强作者绑定与强制 git 版本推销。

### D21 生成引擎 — REBUILD

不存在可调用的「生成服务」。新项目定义：Agent 负责生成；引擎提供模板、约束、tokens、验收。禁止宣称已有完整 codegen 服务。

### D22 状态机 — REBUILD

按 PRODUCT/ARCHITECTURE 定义枚举与合法迁移。

### D25–D26 — REJECT

作者引流、SaaS 与本开源工具目标冲突。

### D27 art-motion — DEFER

独立仓库；未来以 plugin 评估，不阻塞 Phase 1。

---

## 明确不继承的设计

1. 「无 Schema 的纯 Markdown 项目记忆」作为唯一真相源  
2. 将云 TTS 密钥流程当作默认能力  
3. 为兼容 html2pptx 而降低已完成视觉稿质量（原项目已有路线 B，应保留）  
4. 整库复制 references 而不做模块化与许可证审查  
5. 任何多租户/计费预埋

---

## 决策冻结规则

- 改变 DIRECT_REUSE → REBUILD 等重大分类，须更新本文件并记录理由。  
- 未完成许可证确认的资产，不得因「省事」改为 DIRECT_REUSE。
