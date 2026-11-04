# Responsive · Interaction · Accessibility

## Responsive

落实 `05-responsive-design`，禁止「常见设备宽度」拍脑袋。

视口族（以规格为准）：Narrow / Mobile / Tablet / Desktop / Wide。识别真实测试宽度。

检查：布局转换、内容顺序、栏数、导航变化、图片裁切、字号、间距、卡片、表格、Sticky、CTA 可达、触控。

断点：继承 Tokens 与 Responsive 规格。与项目约定冲突 → 记录，不静默改。

禁止：简单缩小桌面；藏重要权益；hover 唯一操作；Sticky CTA 挡核心内容。

## Interaction

### Navigation

主导航、次级、移动菜单开合、跳转。

### Buttons

点击、Loading、Disabled、Focus、反馈。样式有 ≠ 功能有。

### Forms

输入、必填/格式校验、错误与成功、提交态。

### 其他

Tabs、Accordion、Modal、Dropdown、Carousel、Sticky CTA 等按规格。

区分四态：视觉像可点 · 规格已定义 · 代码已实现 · 浏览器已验证。

无后端：标 `BACKEND_REQUIRED`；禁止假接口冒充业务流程。

## Accessibility

语义 HTML、标题层级、img alt、form label、键盘、焦点可见、克制 ARIA、对比度（规格/工具有则记）、触控目标、`prefers-reduced-motion`、错误提示关联。

优先原生语义；无实测不得宣称「通过完整 WCAG 认证」。已实现 vs 未验证分列。
