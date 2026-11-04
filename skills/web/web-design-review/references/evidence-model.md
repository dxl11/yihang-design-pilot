# Evidence Model

## 证据类型

| 代码 | 含义 | 能证明什么 | 不能证明什么 |
|---|---|---|---|
| `DESIGN_BRIEF` | 01-design-brief | 目标、约束、范围 | 页面像素 |
| `INFORMATION_ARCHITECTURE` | 02-IA | 路径、导航意图 | 实现交互 |
| `VISUAL_DIRECTION` | 批准方向 | 气质、禁止项 | 最终实现 |
| `DESIGN_SYSTEM` | 03-design-system | 组件/规则意图 | 页面是否遵守（需对照） |
| `DESIGN_TOKENS` | design-tokens.json | 语义值存在 | 使用正确 |
| `PAGE_DESIGN` | 04 page-design | 页面意图与规格 | 实际渲染 |
| `RESPONSIVE_DESIGN` | 05 responsive | 跨屏意图 | 实际溢出 |
| `DESIGN_SCREENSHOT` | 用户/工具截图 | 截图像素所见 | 未入镜状态、交互时序 |
| `BROWSER_TEST` | 手工/脚本浏览器记录 | 覆盖视口内行为 | 未跑视口 |
| `ACCESSIBILITY_TEST` | axe 等或人工 a11y | 工具/方法覆盖项 | 未测项 |
| `USER_PROVIDED_EVIDENCE` | 其他用户材料 | 按其声明 | 超范围推断 |
| `CASE_DEMO` | 仓库教学演示问题 | 演示 Skill 能力 | **非**真实线上缺陷 |

## 项状态

| 状态 | 含义 |
|---|---|
| `PASS` | 有足够证据支持该项达标 |
| `FAIL` | 有足够证据证明不达标 |
| `PARTIAL` | 部分达标或仅部分证据 |
| `NOT TESTED` | 证据不足，**非通过** |
| `NOT APPLICABLE` | 本页/范围不适用 |

## 证据可信度（与严重度独立）

`HIGH` | `MEDIUM` | `LOW`  

低可信度 + 疑似 CRITICAL → 要求补证，可标「待确认 CRITICAL 线索」，勿无证据定性。

## 硬边界

- 无 `DESIGN_SCREENSHOT` → 不得 Visual 呈现态 PASS。  
- 无 `BROWSER_TEST` → 不得 Interaction/Responsive **运行** PASS。  
- 无对比度测量/`ACCESSIBILITY_TEST` → 不得宣称对比度达标或 WCAG 认证。  
- 无业务数据 → 不得宣称转化率提升。
