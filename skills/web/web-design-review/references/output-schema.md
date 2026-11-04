# design-review.md 结构

```markdown
# Design Review — <页面名> (<path>)

- Skill: web-design-review
- 日期: <ISO date>
- 结论: APPROVED | APPROVED_WITH_NOTES | NEEDS_REVISION | BLOCKED | INSUFFICIENT_EVIDENCE
```

## 必需章节

1. **Review Overview** — 目的、结论摘要  
2. **Review Scope** — 审什么/不审什么；验证页声明  
3. **Input Inventory** — 读到的文件列表  
4. **Evidence Coverage** — 类型覆盖表 + 可信度  
5. **Overall Result** — 结论 + 否决逻辑（CRITICAL 等）  
6. **Dimension Results** — 九维状态表（可附可选分数）  
7. **Issue Summary** — 按严重度计数  
8. **Detailed Findings** — Issue 详情（见字段）  
9. **Recommended Actions** — 优先整改序  
10. **Unverified Items** — NOT TESTED 清单与补证要求  
11. **Acceptance Criteria** — 下次审查通过条件  
12. **Review Limitations** — 工具/宿主/证据限制  

## Issue 字段（Detailed Findings）

- ID（如 `HOME-DS-01`）  
- 标题、维度、描述  
- 证据 + 来源类型 + 位置  
- 严重度、影响  
- 整改建议、验收标准、状态（open/demo）  
