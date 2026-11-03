# 工作流 Skill 编写规范

工作流 Skill 负责**编排**多个独立专业 Skills，完成一项端到端设计任务。  
它本身不是新的 Agent，也不实现私有调度 Runtime。

---

## 1. 与独立 Skill 的区别

| | 独立 Skill（atomic） | 工作流 Skill（workflow） |
|---|---|---|
| 职责 | 一个清晰专业任务 | 多阶段编排与交接 |
| 输出 | 该任务的专业产物 | 阶段产物集合 + 最终交付清单 |
| 依赖 | 尽量少 | 显式列出原子 Skill |
| `metadata.ydp.kind` | `atomic` | `workflow` |

禁止把「整站从需求到上线」全写进一个无阶段边界的巨型 atomic Skill。

---

## 2. 命名与位置

- 目录与 `name`：`*-workflow` 后缀优先，例如 `web-design-workflow`。  
- 位置：`skills/<domain>/<name>/` 或 `skills/complete-design-workflow/`（跨域总控时）。

---

## 3. 阶段定义（强制要素）

每个阶段必须写清：

1. **阶段目标**  
2. **输入**（来自用户或前序阶段）  
3. **调用的 Skill**（`name` + 路径）  
4. **输出**（文件/字段）  
5. **是否需要用户确认**（是/否 + 确认物）  
6. **可否自动继续**  
7. **失败/回退**：何时重做前序阶段  

不能只罗列 Skill 名称。

---

## 4. 依赖与「未实现」标注

若依赖的原子 Skill **尚未存在于仓库**：

- 在工作流中标记状态：`planned`。  
- 提供 **fallback**：指导 Agent 阅读本工作流内嵌的最小步骤，或暂停并告知用户。  
- **禁止**假装 Skill 已实现。

已存在则标记：`available`，并给出相对仓库路径。

---

## 5. 数据交接

推荐约定（可按品类调整）：

```text
<user-project>/
  design-brief.md
  ia.md
  brand-profile.md          # 可选
  design-system.md
  visual-direction.md       # 或 directions/ + direction-approved.md
  pages/
  review-report.md
  delivery/
```

工作流应说明：

- 文件命名。  
- 哪些字段为下一阶段必读。  
- 用户确认节点产物（如 `direction-approved.md` 须含用户原话）。

---

## 6. 宿主不支持「自动调用其他 Skill」时

不要依赖某一 Agent 的私有 Skill API。

统一写法：

1. 根据阶段打开并遵循对应 `skills/.../SKILL.md`。  
2. 若宿主无法发现该 Skill，使用仓库相对路径 **Read** 该文件。  
3. 按该 Skill 的输出要求写文件后，再进入下一阶段。

---

## 7. 用户确认节点（设计类默认）

以下节点**默认需要确认**（除非用户明确跳过并记录理由）：

- 视觉方向选定。  
- 信息架构大幅变更。  
- 品牌规范与业务冲突时的取舍。  

确认前：**摆出可见产物后停止**，等待用户选择。

---

## 8. 循环与修改迭代

质量检查失败时：

- 标明回到哪一阶段（通常是页面设计，而非推翻 brief）。  
- 限制无意义循环：同一红线连续失败 N 次应升级询问用户。  
- 禁止「工作流 Skill 调用自己」形成隐式死循环。

---

## 9. 完成标准

工作流结束时必须给出：

- 最终交付文件列表。  
- 已执行的检查项。  
- 已知限制 / assumptions。  
- 未完成的 planned 依赖（如有）。

---

## 10. 质量自检（作者）

- [ ] 每个阶段有输入/输出/Skill/确认策略  
- [ ] planned 依赖已标明  
- [ ] 无宿主私有 API  
- [ ] `pnpm validate:skills` 通过  
- [ ] 与原子 Skill 职责无矛盾
