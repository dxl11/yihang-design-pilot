# Skill 编写规范

本规范适用于 yihang-design-pilot 中的**独立专业 Skill**。工作流 Skill 另见 `WORKFLOW_AUTHORING_GUIDE.md`。

兼容目标：Agent Skills 开放规格（[agentskills.io/specification](https://agentskills.io/specification)）以及 Cursor / Claude Code / Codex 的 `SKILL.md` 约定。

---

## 1. Skill 定义

Skill 是一个目录，至少包含 `SKILL.md`，用于教 AI Agent **如何完成一个边界清晰的专业设计任务**。

它不是：

- 通用聊天人格设定。
- 完整产品应用。
- Agent Runtime。
- 「生成好看设计」的空话集合。

---

## 2. 目录与命名

### 2.1 仓库内位置

```text
skills/<domain>/<skill-name>/
  SKILL.md
  references/     # 可选
  scripts/        # 可选
  assets/         # 可选
  tests/          # 可选
```

`domain` 示例：`brand` | `web` | `presentation` | `creative` | `quality`。

### 2.2 命名规则（强制）

- 小写英文 **kebab-case**。  
- 仅 `a-z`、`0-9`、`-`。  
- 不以 `-` 开头或结尾；无连续 `--`。  
- 最长 64 字符。  
- **目录名必须等于** frontmatter `name`。  
- 名称描述任务，避免 `helper`、`utils`、`design` 等含糊名。

合法：`web-visual-direction`、`ppt-quality-review`。  
非法：`WebDirection`、`-web`、`web--ui`。

---

## 3. SKILL.md Frontmatter

### 3.1 本项目强制字段

| 字段 | 要求 |
|---|---|
| `name` | 同上命名规则；与目录名一致 |
| `description` | 非空；≤1024 字符；第三人称；同时写清 **WHAT** 与 **WHEN** |

### 3.2 可选字段（宿主支持时再用）

| 字段 | 说明 | 备注 |
|---|---|---|
| `license` | 技能许可说明 | Agent Skills 规格支持 |
| `metadata` | 字符串键值（如 `version`, `ydp.kind`） | 用于本仓库分类；勿发明宿主必读私有字段 |
| `compatibility` | 环境要求 | 规格支持 |
| `allowed-tools` | 预批准工具 | 实验性；各宿主支持不一 |
| `disable-model-invocation` | Cursor/Claude 等可能支持 | **非**跨宿主必填 |

`metadata.ydp.kind` 建议：

- `atomic` — 独立专业 Skill  
- `workflow` — 工作流 Skill  

不要堆砌宿主无法识别且无文档依据的字段。

### 3.3 description 写法

```yaml
description: >-
  Defines website visual direction including strategy, color, type, layout,
  and image language. Use when exploring visual directions for a marketing site
  or landing page before page production, or when the user asks for visual
  direction, art direction, or design directions for web.
```

禁止：`生成高质量设计`、`帮助用户做设计` 等空洞句。

---

## 4. 正文建议结构

允许专业差异，但独立 Skill 通常应覆盖：

| 区块 | 内容 |
|---|---|
| A. 定位 | 解决什么问题 |
| B. 触发场景 | 何时使用 |
| C. 不适用 | 何时不要用 |
| D. 输入 | 用户须提供什么；缺省如何问 |
| E. 任务理解 | 如何解析目标/约束 |
| F. 执行流程 | 有序步骤 + 判断条件 |
| G. 工具调用 | 脚本、知识文件、其他 Skills |
| H. 输出 | 文件名、格式、字段 |
| I. 质量检查 | 可验证标准 |
| J. 失败处理 | 缺资料/工具失败等 |
| K. 示例 | 真实输入→输出摘要 |

原则：

- 步骤可执行、可检查。  
- 专业规则写成「必须 / 禁止 / 阈值」，而非形容词堆砌。  
- `SKILL.md` 建议控制在约 500 行内；细则放入 `references/`。

---

## 5. references / scripts / assets

| 目录 | 用途 |
|---|---|
| `references/` | 方法论、规则表、长示例；按需加载 |
| `scripts/` | 确定性脚本；须可独立运行并有校验 |
| `assets/` | 模板、示意图；注意许可证 |

引用使用**相对 skill 根目录**的路径，且尽量一层深度：

```markdown
详见 [methodology.md](references/methodology.md)。
```

`SKILL.md` 中引用的相对路径必须真实存在（由 Validator 检查 markdown 链接与反引号路径中的 `references/`、`scripts/`、`assets/`）。

---

## 6. 输入 / 输出约定

### 输入

- 列出必填 / 可选。  
- 说明可接受形式（文件路径、URL、粘贴文本）。  
- 缺必填时：先问用户或写明 assumption，禁止静默编造品牌资产。

### 输出

- 指定落盘路径约定（相对用户项目，而非 skill 仓库）。  
- 推荐结构化产物（如 `visual-direction.md`）字段表。  
- 若有多候选方向：说明如何编号、如何请用户确认。

---

## 7. 脚本调用规范

- 写明工作目录假设与命令示例。  
- Windows：注明 `python` vs `python3` 若涉及。  
- 脚本默认**不覆盖**用户原文件；破坏性操作须显式标志。  
- P1 优先把跨 Skill 脚本放在仓库 `scripts/`，Skill 内仅保留薄包装说明。

---

## 8. 质量检查规范

每个独立 Skill 至少定义：

1. **完成定义**（Definition of Done）。  
2. **红线**（不满足则不得宣称完成）。  
3. 可选：调用仓库校验脚本或后续设计 lint。

内容质量反模式：

- 一个 Skill 同时做 briefing + 全站开发 + 部署。  
- 只有「要专业」「要高级」无参数。  
- 输出无文件约定，只聊天。  
- 与同仓库其他 Skill 职责重叠却不声明关系。

---

## 9. 与其他 Skills 的关系

在 SKILL.md 中声明：

- **上游**：通常需要先完成的 Skill。  
- **下游**：本输出供谁使用。  
- **冲突**：不应同时作为主 Skill 的场景。

---

## 10. 校验

提交前运行：

```bash
pnpm validate:skills
```

Validator 检查结构与 frontmatter，**不**评价设计品味。
