# Skills 安装脚本

`skills/` 是唯一权威源。本脚本只把 Skill **复制**到各宿主发现目录，不维护三套内容。

## 默认行为（安全）

- 默认安装到隔离 fixture：`tests/fixtures/host-compatibility/...`  
- **拒绝覆盖**已存在目录（除非 PowerShell `-ForceBackup`）  
- 写入 `.ydp-installed.json` 标记，供安全卸载识别  
- 不触碰用户 `~/.cursor/skills` 等全局目录，除非你显式传入 `-TargetRoot`

## PowerShell（已在本机 Windows 验证安装到 fixture）

```powershell
# 预览
pwsh -File scripts/install/install.ps1 -HostName cursor -WhatIf

# 安装到隔离 fixture（推荐测试）
pwsh -File scripts/install/install.ps1 -HostName all

# 仅一个 Skill
pwsh -File scripts/install/install.ps1 -HostName cursor -Skill web-visual-direction

# 安装到当前仓库项目级路径（.cursor/skills 等，已被 .gitignore）
pwsh -File scripts/install/install.ps1 -HostName cursor -ProjectInstall
```

卸载（仅删除带 `.ydp-installed.json` 的目录）：

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot tests/fixtures/host-compatibility/cursor-project/.cursor/skills
```

## Bash（Linux/macOS；结构对称，本机 Windows 上未作为宿主运行验证）

```bash
bash scripts/install/install.sh cursor
bash scripts/install/install.sh all
```

## 宿主路径差异

| 宿主 | 安装布局 | 官方依据摘要 |
|---|---|---|
| Cursor | 可保留 `web/<skill>/` 嵌套（递归发现） | https://cursor.com/docs/skills |
| Claude Code | 扁平 `<skill>/` | https://code.claude.com/docs/en/skills |
| Codex | 扁平 `<skill>/` under `.agents/skills` | https://developers.openai.com/codex/skills |
