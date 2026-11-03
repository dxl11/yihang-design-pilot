# 第三方许可证审计

> 审计范围：Huashu Design 本地副本（`C:\Users\dxl19\.cursor\skills\huashu-design`）及新项目将引用的候选依赖。  
> 日期：2026-11-03  
> 标记说明：`LICENSE_UNCONFIRMED` = 仓库内证据不足，禁止在未确认前再分发。

---

## 1. 项目主体许可证

| 项 | 内容 | 证据 | 结论 |
|---|---|---|---|
| 主体 License | MIT | `LICENSE` | 代码与文档主体可按 MIT 使用/修改/分发 |
| 版权人 | alchaincyf（花叔 · 花生）© 2026 | `LICENSE` | 复用代码须保留版权声明 |
| 历史条款 | README 称 2026-05-14 前曾为 Personal Use License | `README.md` License 节 | 以当前 MIT 为准；若引用旧 tag 需再核 |

**注意**：主体 MIT **不能**自动覆盖字体、BGM、SFX、第三方截图、品牌 logo 样例等资产。

---

## 2. npm 依赖（package.json / package-lock.json）

| 包 | 声明版本 | lock 中可见 license 线索 | 用途 | 新项目适合性 |
|---|---|---|---|---|
| playwright | ^1.59.1 | 上游 BSD-3-Clause（需以官方为准） | HTML 渲染/截图/PDF | 核心候选 |
| pptxgenjs | ^4.0.1 | 上游 MIT（常见） | 可编辑 PPTX | 核心候选 |
| sharp | ^0.34.5 | Apache-2.0（lock 中 platform 包标注） | 图像处理 | 核心候选 |
| pdf-lib | ^1.17.1 | 上游 MIT（常见） | PDF 合并 | 核心候选 |
| @img/sharp-* | transitive | Apache-2.0 | libvips 绑定 | 随 sharp |
| tslib | transitive | 0BSD | 可选 runtime | 低风险 |

本机状态：`node_modules` **未安装**，未做完整 `license-checker` 扫描。

**行动项**：正式开发前在隔离环境 `pnpm install` 后运行许可证扫描，生成 SBOM。状态：部分 `LICENSE_UNCONFIRMED`（传递依赖全集）。

---

## 3. Python 依赖（脚本 import，无 requirements.txt）

| 包 | 出现位置 | 典型许可证 | 用途 | 风险 |
|---|---|---|---|---|
| playwright | design_lint / verify / pptx_from_rendered / ref_board | BSD-3-Clause | 浏览器自动化 | 需声明系统依赖 Chromium |
| pillow | design_lint / pptx_from_rendered | HPND | 图像 | 低 |
| python-pptx | pptx_from_rendered | MIT | PPTX 写入 | 低 |
| 标准库 | learn 等 | PSF | — | 无 |

**缺口**：仓库无 `requirements.txt` / `pyproject.toml`，开源项目需补齐并锁定版本。

---

## 4. 系统级外部工具

| 工具 | 用途 | 许可证注意 |
|---|---|---|
| Node.js | 运行 mjs/js 导出 | 用户自备 |
| ffmpeg / ffprobe | 视频/音频混流 | LGPL/GPL 组件组合复杂；文档需提示用户自行安装合规二进制 |
| Chromium（via Playwright） | 渲染 | 遵循 Playwright 发行条款 |

---

## 5. 字体

| 来源 | 证据 | 结论 |
|---|---|---|
| Google Fonts 等 CDN 引用 | SECURITY.md：demos/样张 HTML 可能链到 fonts.googleapis.com | 渲染时浏览器拉取；**离线交付需本地子集或系统字体** |
| `typography.md` 推荐开源中文字体 | 指向思源/厂商免费商用字体等 | **推荐列表 ≠ 仓库已内嵌**；内嵌前必须核对各字体 OFL/厂商协议 |
| 付费字体名 | 风格库明确要求用开源替代（勿写 Söhne 等） | 方法论正确 |

状态：多数为 `LICENSE_UNCONFIRMED`（未审计每条 HTML 实际 `@font-face`）。

---

## 6. 图片 / 图标 / 插画 / 样张

| 资产 | 路径 | 证据 | 结论 |
|---|---|---|---|
| 风格样张 JPG/HTML | `assets/style-specimens/**` | 随 MIT 仓库分发；题材虚构说明在 design-styles.md | **代码/样张作为 skill 一部分倾向 MIT**；但仍建议在 NOTICE 中单列 |
| Showcase | `assets/showcases/**` | 案例展示 | 再分发前确认是否含第三方品牌素材 |
| fetch_images.py | Wikimedia Commons | SECURITY.md：下载 CC/公有领域并打印许可信息 | 工具可用；**下载物许可证跟随各文件** |
| 品牌 logo 获取指引 | brand-asset-protocol：simpleicons / svgl / favicon | 指引层；Simple Icons 等有自身许可 | 使用时必须保留各源许可，不可假定 MIT |
| 用户项目成片 | `宣传/huashu-design/**` | 用户内容 | **不属于**可开源再分发范围 |

---

## 7. 音频资产（高风险）

### 7.1 SFX

| 项 | 证据 |
|---|---|
| 位置 | `assets/sfx/**`（37 个 mp3） |
| 声明 | `references/sfx-library.md`：由 **ElevenLabs Sound Generation API** 生成 |
| 主体 MIT 覆盖？ | **不能自动推断** ElevenLabs 生成物的再分发/商用条款 |
| 标记 | **LICENSE_UNCONFIRMED** |

新项目策略：默认 **不复制** SFX 进仓库；改为「用户自备 / 可选插件 / 仅文档描述 cue 协议」。

### 7.2 BGM

| 项 | 证据 |
|---|---|
| 位置 | `assets/bgm-*.mp3`（6 首） |
| 文档 | `audio-design-rules.md` 列出 mood 映射；`launch-film-director-notes.md` 提及 Suno/Udio 类生成提示 |
| 明确来源许可文件 | **未在仓库内发现**独立 BGM LICENSE/NOTICE |
| 标记 | **LICENSE_UNCONFIRMED** |

新项目策略：第一阶段 **REJECT 内置 BGM 再分发**；导出链保留「用户提供 audio 路径」接口。

---

## 8. 模板与 JSX 组件

| 文件 | 版权头/说明 | 结论 |
|---|---|---|
| `scripts/html2pptx.js` | Copyright 2026 alchaincyf，MIT；声明独立实现 | 可按 MIT 复用并保留声明 |
| `assets/*.jsx`、`deck_index.html` | 无单独第三方声明（随仓库） | 倾向 MIT；迁移时保留 NOTICE |
| demos HTML | 演示用途 | 可不作为运行时依赖 |

---

## 9. 外部 API / 云服务（非许可证，但属合规）

| 服务 | 脚本 | 数据 | 同意门 |
|---|---|---|---|
| 火山 TTS | `scripts/cloud/tts-doubao.mjs` | 用户文本 + 用户 key | `--yes` / `HUASHU_CLOUD_OK` |
| 火山方舟看片 | `scripts/cloud/ai-review-video.py` | 视频片段 + 用户 key | 同上 |
| Wikimedia | `fetch_images.py` | 搜索词 | 用户触发 |
| 参考页截图 | `ref_board.py` | URL GET | 用户/Agent 触发 |

新项目：云能力作 **可选 Adapter**，不得进入核心默认路径。

---

## 10. 灵感与衍生声明

README「起源」节声明：受 Anthropic Claude Design 提示词启发的二次创作。  
这不影响 MIT 代码使用权，但开源文档应：

1. 致谢清晰；
2. 不声称拥有 Anthropic 商标或产品兼容认证；
3. 不复制未授权的第三方系统提示词全文。

---

## 11. 对新项目 yihang-design-pilot 的强制规则

1. 默认候选开源许可证：**MIT**（与可复用脚本兼容）；最终以 `OPEN_SOURCE_STRATEGY.md` 确认。
2. 引入任何 Huashu 资产前：完成该资产条目从 `LICENSE_UNCONFIRMED` → 确认或剔除。
3. 禁止将用户 `宣传/` 下交付物、品牌 logo、个人经验文件纳入开源树。
4. 发布前生成：`NOTICE`、`THIRD_PARTY_LICENSES`（自动扫描）、字体清单。
5. 不确定则 **不复制**，用自研或用户本地资产替代。

---

## 12. 待确认清单（需用户或法务后续拍板）

- [ ] ElevenLabs 生成 SFX 的再分发条款  
- [ ] 6 首 BGM 的创作来源与商用授权链  
- [ ] style-specimens / showcases 是否含第三方商标视觉  
- [ ] 完整 npm/pip SBOM 许可证矩阵  
- [ ] ffmpeg 在文档中的分发方式（仅指引安装 vs 捆绑）

---

## 13. P1.5 更新（2026-11-03）— 本仓库许可证与依赖清单

### 13.1 本仓库主体

| 项 | 状态 |
|---|---|
| 根目录 `LICENSE` | **MIT**（已落地） |
| Copyright | Copyright (c) 2026 yihang-design-pilot contributors |
| `NOTICE` | 已添加第三方/上游说明 |

历史章节 1–12 中「候选 / 待确认 MIT」表述保留为审计轨迹；**以本节与根 LICENSE 为准**。

### 13.2 当前仓库可分发内容（允许）

| 类别 | 说明 |
|---|---|
| A. 本项目原创 Skills / 模板 / 规范文档 / Validator / 安装脚本 | MIT |
| B. 开发依赖清单 | `docs/licenses/npm-licenses.txt`（`pnpm licenses list` 生成，2026-11-03） |

观测到的开发依赖许可证家族包括但不限于：MIT、Apache-2.0、BSD-2-Clause、ISC、BlueOak-1.0.0、0BSD 等（以清单文件为准）。

### 13.3 明确排除 / 未迁入（禁止默认分发）

| 类别 | 状态 |
|---|---|
| Huashu BGM / SFX | LICENSE_UNCONFIRMED — **未纳入本仓库** |
| Huashu 风格样张二进制全量 | 未迁移 |
| 用户 `宣传/` 交付物 | 不纳入 |
| 真实 `.env` / API Key | 不纳入（仅有 `.env.example` 占位） |

### 13.4 从 Huashu 复用代码

P1 / P1.5 **尚未**将 `html2pptx.js` / `design_lint.py` 等迁入。若后续迁移，必须保留上游版权头并更新本文件与 `NOTICE`。
