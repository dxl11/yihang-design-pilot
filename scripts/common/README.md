# scripts/common

跨 Skill 共用的确定性工具。

| 文件 | 作用 |
|---|---|
| `validate-skills.ts` | CLI：校验仓库内全部 Skills |
| `validate-skills-lib.ts` | 可测试的校验逻辑 |
| `skill-frontmatter.ts` | Frontmatter Zod schema 与解析 |

运行：

```bash
pnpm validate:skills
```
