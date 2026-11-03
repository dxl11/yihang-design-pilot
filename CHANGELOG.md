# Changelog

本文件遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 风格。

## [Unreleased]

### Added

- P1.5：根目录标准 MIT `LICENSE` 与 `NOTICE`。  
- P1.5：`scripts/install/` 安装与安全卸载脚本；隔离宿主 fixture 安装验证。  
- P1.5：`docs/HOST_COMPATIBILITY_REPORT.md`、`docs/evidence/cursor-runtime-web-visual-direction.md`。  
- P1.5：`docs/licenses/npm-licenses.txt`（依赖许可证清单快照）。  
- P1：开源 Skills 项目骨架、Validator、示例 Skills、CI。  

### Changed

- `LICENSE_DECISION.md`：MIT 由待决改为已确认。  
- `docs/DECISION_LOG.md`：追加 D-002 确认、D-004、D-005。  
- `docs/THIRD_PARTY_LICENSES.md`：追加 P1.5 分发允许/排除清单。  
- `docs/AGENT_COMPATIBILITY.md`、`README.md`：按官方文档与实测更新。  
- 验证脚本名：`pnpm verify`（避免与 pnpm 内置 `ci` 冲突）。  

### Security / Compliance

- 明确排除 Huashu BGM/SFX 等 `LICENSE_UNCONFIRMED` 资源进入默认分发。  
- 安装脚本默认拒绝覆盖用户已有 Skill 目录。  
