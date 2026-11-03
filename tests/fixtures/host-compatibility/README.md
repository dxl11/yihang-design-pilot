# Host compatibility fixtures

隔离安装目录，用于验证 Skills 复制到各宿主发现路径后的布局。

默认由 `scripts/install/install.ps1` 生成，**不提交**生成物（见根 `.gitignore`）。

| 子目录 | 对应宿主发现根 |
|---|---|
| `cursor-project/.cursor/skills` | Cursor 项目级 |
| `claude-code-project/.claude/skills` | Claude Code 项目级 |
| `codex-project/.agents/skills` | Codex 仓库级 |

重新生成：

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```
