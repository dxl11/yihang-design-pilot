# Skills

专业设计 Skills 源目录（单一真相源）。

## 布局

```text
skills/
  <domain>/
    <skill-name>/
      SKILL.md
      references/ …
```

安装到 Cursor / Claude Code / Codex 时，请将**叶目录** `<skill-name>/` 放到各宿主 skills 发现路径（见 `docs/AGENT_COMPATIBILITY.md`）。

## 当前（P2.0 Web 第一批）

| Skill | 类型 | 路径 |
|---|---|---|
| web-design-brief | atomic | `web/web-design-brief/` |
| web-information-architecture | atomic | `web/web-information-architecture/` |
| web-visual-direction | atomic | `web/web-visual-direction/` |
| web-design-system | atomic | `web/web-design-system/` |
| web-design-workflow | workflow | `web/web-design-workflow/` |

其他 domain 目录仅作规划占位说明，**不**创建空壳 SKILL.md（含尚未开发的 `web-page-design` 等）。
