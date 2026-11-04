# 输出结构

## 代码

写入**用户指定项目目录**。默认**不要**把生产页面源码放进 Skills 仓的 `design-output/`。

## 报告目录

```text
design-output/07-web-implementation/
  _index.md
  <page-id>/implementation-report.md
```

可选（有独立价值才拆）：`implementation-plan.md`、`design-to-code-map.md`、`implementation-deviations.md`、`verification-report.md`。

CASE_DEMO / 教学仓：可仅有报告与示意片段，须标 `CASE_DEMO`，不得冒充已部署生产。

## implementation-report.md 必需章节

1. Implementation Overview  
2. Project Discovery  
3. Design Input Inventory  
4. Input Readiness  
5. Implementation Scope  
6. Technology Decisions  
7. Design-to-Code Mapping  
8. Implemented Components  
9. Implemented Pages  
10. Responsive Implementation  
11. Interaction Implementation  
12. Accessibility Implementation  
13. Design Fidelity Results  
14. Verification Results  
15. Deviations and Limitations  
16. Pending Tasks  

另须：实际修改文件列表（无代码修改则明示 `NO_CODE_CHANGES` / CASE_DEMO）。

## _index.md

页面列表、准入（Review 结论）、Readiness、整体限制（如无前端工程、无浏览器）。
