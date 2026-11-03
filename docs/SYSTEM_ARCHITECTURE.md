# yihang-design-pilot 系统架构

> 独立于 Huashu Design 宿主形态的本地开源架构。  
> 不做 SaaS、不做多租户、不做商业中台。

---

## 1. 设计原则

1. **核心设计引擎独立于具体 Agent**  
2. Agent 负责理解、规划、调度；引擎负责执行、校验、导出  
3. 确定性工具（渲染/转换/检查）与概率性生成（LLM）边界清晰  
4. 统一数据模型 + JSON Schema 校验  
5. 模块可扩展，第一阶段不造插件市场  
6. 默认本地文件系统持久化  
7. 外部模型/API 仅经适配层  
8. 不为虚构的云商业需求增加组件  

---

## 2. 逻辑视图

```text
┌─────────────────────────────────────────────────────────────┐
│                     Agent Adapter Layer                      │
│   Cursor Adapter │ Claude Code Adapter │ Codex Adapter …    │
│   (SKILL/指令包 + 工具调用约定；无业务状态真相)                    │
└───────────────────────────┬─────────────────────────────────┘
                            │ Design Capability Protocol (CLI/JSON)
┌───────────────────────────▼─────────────────────────────────┐
│                        Core Engine                           │
│  Task FSM · Schema Validation · Orchestration Hooks          │
└───┬─────────┬─────────┬─────────┬─────────┬─────────┬───────┘
    │         │         │         │         │         │
    ▼         ▼         ▼         ▼         ▼         ▼
 Brand    Creative   Web       Presentation Quality  Export
 Engine   Strategy   Design    Engine       Engine   Engine
          Engine     Engine
    │         │         │         │         │         │
    └─────────┴─────────┴────┬────┴─────────┴─────────┘
                             ▼
                      Knowledge Engine
                   (styles, rules, runbooks)
                             │
                             ▼
                       Project Store
              (fs + JSON/SQLite · 本地可备份)
```

逻辑模块 ≠ 必须多进程或多 npm publish；Phase 1 可用 monorepo packages 或 `src/modules/*`。

---

## 3. Agent 适配层

### 3.1 职责

| 适配器 | 职责 | 不职责 |
|---|---|---|
| Cursor / Claude Code / Codex | 把用户话术译为 DesignTask；按协议调 CLI；展示方向卡与截图；写会话内说明 | 私自实现导出/质检；绕过状态机 |

### 3.2 统一能力协议（草案）

所有宿主最终都调用同一组命令（名称可调整）：

```text
ydp task create --brief brief.json
ydp brand analyze --input ./brand-raw --out brand-profile.json
ydp direction propose --task <id>
ydp direction approve --task <id> --choice <n>
ydp design run --task <id>
ydp quality check --artifact <path>
ydp export --task <id> --format pdf|pptx|html-zip
ydp doctor
```

输出：stdout JSON + 退出码；人工可读摘要走 stderr 或 `--human`。

### 3.3 差异处理

- Cursor：`.cursor/skills` 或项目 rules 指向 Adapter 文档  
- Claude Code：`SKILL.md` 精简版  
- Codex：`AGENTS.md` / skills 映射  

**禁止**核心包 `import` 任何宿主私有 SDK。

---

## 4. 模块职责

| 模块 | 职责 | Phase 1 |
|---|---|---|
| Core | Task FSM、ID、校验、日志 | 必做 |
| Brand | 资产收集清单、BrandProfile、色板/字体记录、版本 | MVP：手工+半自动 |
| Creative Strategy | 多方向提案、差异维度、审批记录 | MVP：协议+compare |
| Web Design | 页面约束、响应式检查挂钩、交付目录规范 | MVP：模板+质检，生成靠 Agent |
| Presentation | Deck 结构、HTML deck 模板、页角色 | MVP |
| Quality | lint/verify/报告 | MVP（优先迁移） |
| Export | PDF/PPTX/ZIP | MVP |
| Knowledge | 风格包、排印规则、模块 runbook | MVP 子集 |
| Project Store | 项目树、历史、品牌库 | MVP：文件系统+JSON |
| Motion/Poster… | 扩展点 | 仅接口 |

---

## 5. 统一数据模型

### 5.1 DesignTask

- `id`, `type` (`brand`|`web`|`presentation`|…), `status`, `createdAt`, `updatedAt`  
- `briefRef`, `brandRef?`, `directionRef?`, `artifactRefs[]`, `qualityReportRefs[]`  

### 5.2 DesignBrief

- 目标、受众、交付物、尺寸/格式、约束、假设、成功标准  

### 5.3 BrandProfile

- 资产清单（logo/product/UI/color/font）路径与校验状态  
- `tokens`（色板 oklch/hex、字体栈）  
- `dnaVersion`, `notes`  
- **非**营销文案生成器  

### 5.4 DesignDirection

- 来源逻辑、骨架描述、材质策略、样张/参考板路径、差异标签  
- `approval`: pending|approved|rejected + 用户原话  

### 5.5 DesignArtifact

- `kind`: html|deck|pptx|pdf|image|bundle  
- path、hash、父 task、生成器版本  

### 5.6 QualityReport

- red/yellow/info、截图路径、fingerprint、toolVersion、timestamp  

### 5.7 ProjectMemory

- 决策记录、偏好（scoped）、外观指纹历史  

### 5.8 ExportJob

- format、mode、inputArtifacts、outputPath、status、errors  

校验：JSON Schema；CLI 写入前 validate。

---

## 6. 工作流状态机

```text
CREATED
  → ANALYZING
  → BRAND_ANALYZING（可跳过：无品牌任务）
  → DIRECTION_PROPOSING
  → WAITING_FOR_APPROVAL
  → DESIGNING
  → RENDERING
  → QUALITY_CHECKING
  → REVISION_REQUIRED ⇄ DESIGNING
  → EXPORTING
  → COMPLETED
FAILED | CANCELLED（终态）
```

扩展：子状态用 `statusReason` / `phaseDetail`，避免枚举爆炸。  
非法迁移：引擎拒绝并写错误码。

---

## 7. 本地存储布局（建议）

```text
<project>/
  .ydp/
    project.json
    tasks/<taskId>/task.json
    briefs/
    brand/<version>/
    directions/
    quality/
    memory/
  design-demos/          # 方向探索产物
  src-or-deliverables/   # 最终 HTML/deck
  exports/
```

- 默认 **JSON + 文件系统**  
- 若任务历史查询变痛，再引入 **SQLite**（单文件、可拷贝）  
- 大文件：原图/视频外置，`project.json` 只存相对路径与 hash  
- 备份：打包 `.ydp` + deliverables；迁移即拷贝目录  

---

## 8. 插件与扩展（Phase 1 边界）

扩展点（接口，不实现市场）：

1. Agent Adapter  
2. Knowledge Pack（风格/规则）  
3. Exporter  
4. Quality Rule  
5. Tool Plugin（fetch/tts…）  

发现机制（后续）：`packages/*/package.json` 的 `ydp.plugin` 字段或目录约定。  
第一阶段：文档约定 + 目录放置即可。

---

## 9. 推荐仓库结构（独立，非抄 HD）

```text
yihang-design-pilot/
  packages/
    core/
    brand-engine/
    creative-strategy/
    web-engine/
    presentation-engine/
    quality-engine/
    export-engine/
    knowledge/
    project-store/
    adapters/
      cursor/
      claude-code/
      codex/
  apps/
    cli/                 # ydp 可执行入口
  docs/
  tests/
  .github/workflows/
```

初期可先单包 `src/`，但**逻辑边界**按上表划分，避免再次变成「一个巨型 SKILL.md」。

---

## 10. 与 Huashu Design 的关系

| | Huashu Design | yihang-design-pilot |
|---|---|---|
| 形态 | Agent Skill + 脚本 | 本地工具引擎 + 多 Adapter |
| 真相源 | Prompt + Markdown gate | Task JSON + Schema + FSM |
| 运行 | 宿主 Agent 解释执行 | CLI/库可被 Agent 或人类调用 |
| 依赖原仓库 | — | **运行时零依赖** HD 目录 |

迁移策略：选择性移植脚本与知识子集（见 IMPLEMENTATION_DECISIONS），不 git submodule 强绑。

---

## 11. 安全边界

- 默认无网络；联网工具显式 opt-in  
- 不读取与项目无关的全局密钥文件  
- 截图工具对 URL 做用户确认（继承 SECURITY 精神，重写实现）  
- 云插件单独目录与同意门  

---

## 12. 非目标架构

- 控制面微服务  
- 托管渲染集群  
- 用户中心 / OAuth / 计费  
- 多租户对象存储  

若未来社区需要「团队共享品牌库」，优先 **导出/导入 BrandProfile 包**，而非云账号体系。
