# 技术风险、架构风险与维护风险

> 基于对 Huashu Design 真实代码与本机环境的审计。日期：2026-11-03。

---

## 1. 架构风险

| ID | 风险 | 依据 | 影响 | 缓解 |
|---|---|---|---|---|
| AR-1 | 核心能力绑在 Agent Prompt，无法独立运行 | 无 CLI「一键完成设计任务」；入口是 `SKILL.md` | 难测试、难版本化、难多 Agent 一致 | 抽出 Design Engine + 统一协议；Skill 仅作 Adapter |
| AR-2 | 无任务状态机 | Gate 文件靠自觉 | 流程可被跳过却无硬失败 | 引擎层强制状态迁移 + 可选 hook |
| AR-3 | Markdown 约定代替 Schema | Brief/Brand/Direction 无 JSON Schema | 社区扩展易漂移 | 第一阶段引入 Zod/JSON Schema |
| AR-4 | 误把「演示 HTML」当产品引擎 | `demos/`、showcase 很强 | 高估完成度 | 复用决策严格区分资产/引擎 |
| AR-5 | 过早平台化/SaaS 化 | 用户明确禁止 | 复杂度爆炸 | 架构评审清单显式 REJECT |

---

## 2. 依赖与运行时风险

| ID | 风险 | 依据 | 影响 | 缓解 |
|---|---|---|---|---|
| DR-1 | Playwright + Chromium 体积与安装失败率 | capabilities：本机 playwright(py) ✗；单测大面积失败 | Windows/CI 不稳定 | 文档化安装；CI 缓存浏览器；提供「无浏览器」降级模式 |
| DR-2 | Node + Python + Shell 三栈 | scripts 混合 `.mjs/.js/.py/.sh` | Windows 贡献者摩擦（sh 脚本） | 核心路径 TypeScript/Node；Python 逐步收敛或提供 ps1 |
| DR-3 | 无锁定的 Python 依赖清单 | 无 requirements.txt | 「能跑」不可复现 | 增加 `pyproject.toml` 或弃用 Python 路径 |
| DR-4 | sharp 原生绑定 | lock 多平台 optional | 部分环境安装失败 | 可选依赖；失败时跳过缩略图优化 |
| DR-5 | pptxgenjs 对 HTML 视觉自由度限制 | `editable-pptx.md` 四硬约束 | 视觉稿无法干净转 PPTX | 保留双路线（A 约束写 / B 渲染重建） |
| DR-6 | pdf-lib + Playwright PDF 行为差异 | 两套 PDF 脚本 | 导出结果不一致 | 统一 Export Engine 接口与验收用例 |
| DR-7 | ffmpeg 外部依赖 | motion/音频脚本 | 非设计核心却拖垮安装 | Phase 1 不设为硬依赖 |

---

## 3. 质量与正确性风险

| ID | 风险 | 依据 | 缓解 |
|---|---|---|---|
| QR-1 | Agent 主观自评冒充质检 | 品味不由 lint 判断；易被模型「说已检查」 | 强制跑 Quality Engine CLI；红灯阻断 COMPLETED |
| QR-2 | compare 指纹误报/漏报 | 有单测但本机未跑通 | 迁移后优先恢复 fixtures 回归 |
| QR-3 | 品牌一致性难自动化 | 无 Brand DNA 结构 | Phase 1 做资产清单+色板校验，不做完整视觉 AI 评审 |
| QR-4 | 云端 AI 看片引入不确定性 | `ai-review-video.py` | 默认关闭；结果不作为唯一门禁 |

---

## 4. Agent 兼容风险

| ID | 风险 | 依据 | 缓解 |
|---|---|---|---|
| AG-1 | 各宿主 Skill 格式不同 | Cursor / Claude Code / Codex 加载路径差异 | Adapter 层隔离；核心仅 CLI/库 |
| AG-2 | 弱模型跳过三方向 | SKILL 已写降级但仍可被忽略 | 引擎侧：无 DirectionApproval 不得进入 DESIGNING |
| AG-3 | 上下文窗口导致只读部分 references | SKILL 弱 runtime 降级策略 | Knowledge Engine 按任务切片加载 |
| AG-4 | 绑定单一厂商模型 API | 原项目刻意避免；云脚本可选 | 核心不内置模型 SDK |

---

## 5. 许可证与合规风险

详见 `THIRD_PARTY_LICENSES.md`。最高优先级：

| ID | 风险 | 等级 |
|---|---|---|
| LR-1 | BGM/SFX `LICENSE_UNCONFIRMED` 被再分发 | **高** |
| LR-2 | 品牌样例/第三方商标视觉进入仓库 | 高 |
| LR-3 | 未保留上游版权头（html2pptx 等） | 中 |
| LR-4 | ffmpeg 捆绑分发 | 中 |
| LR-5 | 用户本机 `~/.huashu-design` 经验被误提交 | 中 |

---

## 6. 维护与社区风险

| ID | 风险 | 缓解 |
|---|---|---|
| MR-1 | 方法论文档巨大（design-styles 单文件 >100KB） | 拆分为 Knowledge 包 + 索引；避免单 PR 难审 |
| MR-2 | 上游 Huashu 快速迭代导致「复制漂移」 | 明确 REUSE 边界；关键工具可追踪上游 commit，不整库镜像 |
| MR-3 | 无 CI 时质量回退 | GitHub Actions：typecheck + unit + 导出烟测 |
| MR-4 | 贡献者误提 SaaS/账户功能 | CONTRIBUTING 与架构决策记录显式拒绝 |
| MR-5 | 「84 风格」数量崇拜 | 验收以专业差异与样张质量为准，设质量门槛 |

---

## 7. 产品范围风险

| ID | 风险 | 缓解 |
|---|---|---|
| PR-1 | Phase 1 同时做 Brand+Web+PPT+Motion | ROADMAP 强制 MVP 切片 |
| PR-2 | 把海报/电商/视频全做进架构 | 仅保留模块接口，DEFER 实现 |
| PR-3 | 期望「零 Agent 全自动设计工作室」 | 定位：Agent 调度 + 引擎执行；不承诺无人值守艺术总监 |

---

## 8. 本机审计环境风险（影响结论置信度）

- yihang-design-pilot：**空目录、无 git**
- Huashu skill：**非 git clone、无 node_modules、无 Python playwright**
- 因此导出链路、完整 lint、PPTX 单测均为 **NOT_TESTED / 部分失败**

**门禁**：正式开发启动前，应在隔离 worktree 完成依赖安装与烟测，将关键工具状态提升到 VERIFIED。

---

## 9. 风险优先级（建议处理顺序）

1. 许可证：剔除或替换 BGM/SFX 再分发  
2. 架构：引擎与 Adapter 分离  
3. Schema：Brief / Brand / Direction / QualityReport  
4. CI + Playwright 安装可复现  
5. 双路线 PPTX 验收用例  
6. 再扩展风格库与 Motion
