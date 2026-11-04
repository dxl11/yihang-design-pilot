# 核心验证能力

## Page Load

访问成功、加载失败、主体存在、关键内容缺失、意外空白、卡死加载。工具支持时记 HTTP/资源失败。

## Console / Network（工具支持时）

JS Error、未处理 Rejection、关键资源/图片/API 失败、异常跳转、超时。  

区分：真实错误 · 已知预期 · 第三方 · 环境导致 · 无法验证。  
Warning ≠ 功能 FAIL。不记录敏感头/Token。

## Layout

横溢、异常纵溢、遮挡（含 Sticky/Fixed）、重叠、文本裁切、图片比例、宽度/空白异常、不可见、关键内容出视口、尺寸异常。  

可自动测的约束 vs 需截图审查 vs 需人工设计判断——分列。bounding box 合格 ≠ 视觉质量合格。

## Responsive（对照 05）

布局切换、多列变化、导航、图片、卡片、表/比价、主任务可达、Sticky CTA、横滚、拥挤、Hover 依赖、触控。  

每项写：页面 · 视口 · 设计预期 · 实际 · 证据 · 偏差 · 状态。禁止只写「手机端正常」。

## Interaction

规格内：导航、菜单、按钮、Tab、Accordion、表单、Dialog、Sticky CTA、锚点、咨询入口。  

禁止真实下单/支付/不可逆操作。后端缺 → `BLOCKED`/`PARTIAL`/`BACKEND_REQUIRED`。能点按钮 ≠ 业务完整。

## Accessibility（基础）

标题层级、键盘可达、焦点丢失、控件名称、label、alt、明显语义、焦点遮挡、对比度风险（工具有时）。  

有 axe 则复用，不强制加依赖。说明范围；**非**完整 WCAG 认证。

## Visual Comparison

### 有参考图

对照布局、区块、容器宽、图比、层级、色、字、组件形态、关键间距。可研究叠加/区域差；**像素差单独不得自动 FAIL**（字体、DPR、抗锯齿、动态内容）。

### 无参考图

仅规格可测项。标 `REFERENCE_IMAGE_NOT_AVAILABLE`。禁止声称「与设计稿匹配」。AI 截图主观审查须标明非像素级匹配验证。
