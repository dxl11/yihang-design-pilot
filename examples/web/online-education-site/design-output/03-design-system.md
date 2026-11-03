# Design System — 启航学堂官网

- 生成 Skill: web-design-system
- 日期: 2026-11-03
- 输入: `01-design-brief.md` · `02-information-architecture.md` · `visual-direction.md` · `direction-approved.md`
- Tokens 文件: `design-tokens.json`

## 1. 设计系统概述

服务对象：启航学堂营销官网（移动优先）。  
覆盖：色彩/字体/间距/布局/断点、核心组件与状态、无障碍目标、技术无关实现映射。  
不覆盖：LMS 组件、完整数据可视化主题、多品牌白标。[FACT]

## 2. 设计原则

1. **可信优先于促销**：主色克制，CTA 清晰但不尖叫。  
2. **任务可读**：信息层级服务「理解→信任→申请」。  
3. **一套语义 tokens**：禁止页面私自发明平行色名。  
4. **状态完备**：交互组件必须有 hover/focus/disabled（适用时 loading）。  
5. **无证据不宣称认证**：以 WCAG 2.2 AA 为**目标**，对比度需在实现时实测。

## 3. 色彩系统

语义 token 见 JSON。原则：

- `color.brand.primary`：深青绿 CTA / 关键链接  
- `color.text.*`：正文与次级  
- `color.surface.*`：默认页底与抬升面  
- `color.border.default`：分割与输入边框  
- `color.status.*`：成功/警告/危险（表单反馈）

原始偏好「青绿」来自客户口述，非完整品牌手册。[FACT]

## 4. Typography

| 级别 | Token | 用途 |
|---|---|---|
| Display | size.2xl / font.display | 首页品牌/大标题 |
| H1–H3 | size.xl–lg | 页面与区块标题 |
| Body | size.md | 正文（桌面 16px） |
| Small | size.sm | 辅助；移动正文不低于 14px |
| Caption | size.xs | 图注/法律小字（对比度仍须可读） |

中英混排：避免标题全大写英文堆砌；中文行高略松于英文。

## 5. Spacing

基础尺度 4；常用阶梯见 tokens `spacing.scale`。  
区块竖直间距优先 32/48/64；组件内 8/12/16。

## 6. Layout

- 页容器最大宽：`layout.container.max` ≈ 1120–1200px  
- 内容可读宽：正文栏 ≤ 720px（长文）  
- 栅格：桌面 12 栏，沟槽 24px；平板 8；移动 4  
- 对齐：营销区块左对齐内容 + 全宽氛围例外仅限英雄区

## 7. Breakpoints

| Token | 行为摘要 |
|---|---|
| sm 640 | 单列；主 CTA 全宽可点 |
| md 768 | 双产品线可并排尝试 |
| lg 1024 | 显示完整 Primary Nav；英雄可左右分栏 |
| xl 1280 | 容器达上限，增加左右边距而非无限拉字号 |

导航：`<lg` 收纳为菜单 + 粘性「申请」；`≥lg` 横排。  
字体：Display 在 sm 降一档，避免折行破碎。

## 8. Component Inventory（本站需要）

纳入：Button、Link、Input、Textarea、Checkbox、Nav/Header、Footer、Breadcrumb、Alert、Accordion（FAQ）、Badge（慎用）、Modal（表单成功可选）。  

首期不纳入：复杂 Data Table、Date Picker、Toast 体系、图表。

## 9. 核心组件规范（摘要）

### Button

- Variants: primary / secondary / tertiary  
- States: default / hover / focus-visible / active / disabled / loading  
- 主按钮使用 brand.primary；禁止描边霓虹  
- 最小高度 44px（移动触控目标）

### Input / Textarea

- Label 始终可见（不依赖仅 placeholder）  
- error 使用 status.danger + 文案  
- focus-visible 环不低于 2px，对比可辨

### Header / Nav

- 品牌名或 Logo 左；Primary 中/右；申请 CTA 突出  
- 当前页指示不单靠颜色（可加字重/下划线）

### Accordion（FAQ）

- 按钮语义可展开；`aria-expanded`  
- 答案区链到申请 CTA

## 10. 交互状态

全局：可见焦点、禁用不发事件、加载防重复提交。  
链接与按钮悬停有可感知变化但不依赖颜色唯一通道。

## 11. Responsive Rules

- 英雄区：移动取消左右分栏，改为叠放；保持品牌名 > 副文 > CTA 顺序  
- 产品线：移动单列；桌面双列等宽  
- 图片：提供明确宽高比占位，禁止布局抖动  
- 表单：单列；提交按钮全宽（sm）

## 12. Accessibility Rules

- 目标：WCAG 2.2 AA（对比、焦点、标签、错误提示、键盘可达）  
- 本交付**未**运行自动化 axe/对比度仪器扫描 → **不得**写「已通过认证」  
- 动效遵循用户 `prefers-reduced-motion` 时可降级

## 13. Design-to-Code 规则

- 技术栈未指定 → 保持框架无关：CSS 变量映射 tokens JSON  
- 命名：`--color-text-primary` ↔ `color.text.primary`  
- 组件实现须引用语义变量，禁止硬编码平行色  
- 若日后选定 React/Vue，再增组件 API 附录；本文件不假设框架

## 14. 待确认事项

1. 最终开源/商用字体选型与许可证。  
2. Logo 安全区与深/浅背景版本。  
3. 学员图授权前 Stories 组件是否隐藏。  
4. 表单后端/第三方工具字段映射。
