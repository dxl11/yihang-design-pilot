# web-design-system · 方法论

## Token 原则

1. **角色命名**：`color.text.primary` 而非 `gray-900` 作为唯一真相（原始色阶可放在 `color.palette.*` 附录）。  
2. **少而稳**：营销站先保证文本/表面/边框/品牌/状态五类语义。  
3. **来源可追**：每个品牌色写来自 logo / 方向稿 / provisional。

## 组件清单（按需裁剪）

常选：Button、Link、Input、Card、Navigation、Header、Footer、Badge、Alert、Tabs、Accordion、Modal。  
教育/营销站常加：PricingCard、Testimonial（须诚实占位规则）、CourseCard。

## 状态完备性

默认态不够；交互组件至少：hover、focus-visible、disabled；表单加 error；异步加 loading（若存在）。

## 响应式

断点示例可参考常见营销站：~640 / 768 / 1024 / 1280——**必须**写清导航折叠、栅格列数、字号策略，禁止只贴数字。

## 无障碍

目标 WCAG 2.2 AA：正文对比 ≥4.5:1，大文本 ≥3:1；可见焦点；控件可键盘到达。未实测 →「待测清单」。
