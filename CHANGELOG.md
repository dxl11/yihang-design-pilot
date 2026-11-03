# Changelog

本文件遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 风格。

## [Unreleased]

### Added

- P2.0：原子 Skill `web-design-brief`（Design Brief）。  
- P2.0：原子 Skill `web-information-architecture`（Sitemap / 导航 / 用户路径）。  
- P2.0：原子 Skill `web-design-system`（语义 Tokens、组件与无障碍规则 + `design-tokens.json`）。  
- P2.0：贯穿案例 `examples/web/online-education-site/` 与对应自动化测试。  
- P2.0：Validator 增加空壳 Skill 检测与输入/输出提示检查。  
- P1.5：根目录标准 MIT `LICENSE` 与 `NOTICE`。  
- P1.5：`scripts/install/` 安装与安全卸载脚本；隔离宿主 fixture 安装验证。  
- P1.5：`docs/HOST_COMPATIBILITY_REPORT.md`、`docs/evidence/cursor-runtime-web-visual-direction.md`。  
- P1.5：`docs/licenses/npm-licenses.txt`（依赖许可证清单快照）。  
- P1：开源 Skills 项目骨架、Validator、示例 Skills、CI。  

### Changed

- P2.0：`web-design-workflow` 将 brief / IA / design-system 标为 available；page-design 等仍为 planned；支持 IA∥视觉方向并行。  
- P2.0：`web-visual-direction` 默认对接 `design-output/01-design-brief.md` 与 `design-output/` 输出路径。  
- `docs/DECISION_LOG.md`：追加 D-006（Web 原子 Skills 职责划分）。  
- `LICENSE_DECISION.md`：MIT 由待决改为已确认。  
- `docs/DECISION_LOG.md`：追加 D-002 确认、D-004、D-005。  
- `docs/THIRD_PARTY_LICENSES.md`：追加 P1.5 分发允许/排除清单。  
- `docs/AGENT_COMPATIBILITY.md`、`README.md`：按官方文档与实测更新。  
- 验证脚本名：`pnpm verify`（避免与 pnpm 内置 `ci` 冲突）。  

### Security / Compliance

- 明确排除 Huashu BGM/SFX 等 `LICENSE_UNCONFIRMED` 资源进入默认分发。  
- 安装脚本默认拒绝覆盖用户已有 Skill 目录。  
