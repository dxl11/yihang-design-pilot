# Page Design — 首页 Home (`/`)

- Skill: web-page-design
- 日期: 2026-11-03
- 页面类型: Home / Landing
- 置信度: medium
- 上游: Brief · IA · Direction B · Design System · tokens

## 1. Overview

### 目标

| 层 | 内容 | 标记 |
|---|---|---|
| 商业 | 建立可信品牌触点；导向试听/咨询 | FACT（Brief） |
| 用户 | 2 分钟内判断「教什么、适不适合我」 | FACT（网站目标） |
| 成功标准 | 主 CTA 到达 `/apply`；次 CTA 进入课程体系 | 建议指标 TODO（无基线） |

### 类型选型

**Home**：认知 + 分流，不是课程详情，也不是比价页。

### 用户任务

1. P0：理解启航学堂教什么（产品设计 / 数据分析）。[FACT]  
2. P0：决定是否申请试听/咨询。[FACT]  
3. P1：建立最低信任（教研入口，非堆砌假数据）。[INFER]

### 设计策略

1. 首屏品牌名主导 + 一句定位 + 双 CTA（继承 Visual Direction 骨架）。  
2. 中段用**任务导向双产品线分区**，避免装饰性三列卡片墙。  
3. 信任用「教研入口 / 条件化学员成果」，无授权不展示肖像墙。  
4. FAQ 摘要消除顾虑后回收到申请。  
5. 视觉：`color.surface.default` 底 + `brand.primary` CTA；禁紫粉渐变与倒计时条。

### 关键决策与假设

- 主 CTA 文案暂用「申请试听」；与「咨询」是否合并 → TODO（Brief）。[TODO]  
- 「怕买错课」为运营口述 → 首页用 FAQ/适合人群入口回应，不写成已验证研究。[HYPOTHESIS]

---

## 2. Structure

### 区块顺序

| # | 区块 | 目标 |
|---|---|---|
| 1 | Header + Primary Nav | 全局导航；申请 CTA 常驻 |
| 2 | Hero | 主张 + 为谁 + 主/次 CTA |
| 3 | 双产品线 | 分流到 `/programs/*` |
| 4 | 如何学习（轻量） | 录播+答疑模式说明，降预期落差 |
| 5 | 教研信任条 | 链到 `/team`；无数据不标人数 |
| 6 | 学员成果（条件） | 授权前隐藏或仅文案 TODO |
| 7 | FAQ 摘要（3 问） | 链 `/faq` + 申请 |
| 8 | 终局 CTA 带 | 重复主转化 |
| 9 | Footer | IA Footer 链接 |

### 信息层级

- **P0**：主张、双产品线、主 CTA  
- **P1**：学习方式、教研、FAQ  
- **P2**：学员成果（条件）、关于入口  

### 顺序理由

先回答「是什么/为我吗」，再给选择路径，再用轻信任与顾虑消除支撑转化；把证明材料放中后段，避免首屏假统计。符合 Brief「非廉价广告」与 Direction 禁止项。

### 入口 / 出口

- 入：站外投放、公众号、直接访问。  
- 出：`/programs/*`、`/courses`、`/apply`、`/team`、`/faq`。

---

## 3. Layout

- 容器：`layout.container.max` = 1160px；左右 gutter 引用 tokens。  
- 栅格：桌面 12 栏；产品线区两列等宽；`<lg` 单列叠放（行为摘要；细断点交 responsive Skill）。  
- Hero：全宽氛围（`surface.muted` 或轻 `brandSubtle`），**非**卡片内嵌英雄图。品牌名用 `typography.size.2xl` / display；正文 `size.md`。  
- 间距：区块竖向 48/64（`spacing.scale`）；组件内 8/16。  
- 视觉重心：左文右场景图（桌面）；移动取消分栏，顺序保持 品牌 → 副文 → CTA。  
- **Token 继承**：使用 `color.brand.primary`、`text.primary`、`surface.*`；本页不新增全局 token。

---

## 4. Interaction

### 主 CTA「申请试听」

| 项 | 定义 |
|---|---|
| 触发 | 点击 Hero / 粘性头 / 终局带按钮 |
| 行为 | 导航至 `/apply`（同页锚点若未来合并表单则 TODO） |
| 成功 | 到达申请页可填写 |
| 失败 | 链接失效 → 可见错误页或回退首页提示（实现期） |
| 状态 | default / hover（`brand.primaryHover`）/ focus-visible（`border.focus`）/ disabled（不适用导航钮） |

### 次 CTA「查看课程体系」

→ `/programs`；同套焦点规则；视觉 secondary（描边或次底，遵循系统 Button secondary）。

### 产品线区块

整块可点或「了解方向」链到 `/programs/product-design` / `data-analytics`；hover 仅背景微变，不闪霓虹。

### FAQ Accordion（摘要）

- 触发：标题按钮；`aria-expanded`  
- 展开显示短答 +「查看全部 FAQ」  
- 无障碍：键盘可达；焦点环可见  

### 条件模块学员成果

授权未确认时**不渲染**模块（优于空卡片）。[FACT：授权不全]

---

## 5. Content

### 文案结构（示例，可改）

- H1/品牌主导：`启航学堂`（品牌名优先于口号）[FACT 品牌名]  
- 副题 PLACEHOLDER：`面向转行与升职的产品设计 / 数据分析技能课` [INFER]  
- 主 CTA：`申请试听` [TODO 与咨询合并否]  
- 次 CTA：`查看课程体系`  
- 产品线卡：方向名 + 一句话适合谁（须教研提供，现 PLACEHOLDER）  
- FAQ 三问 PLACEHOLDER：是否零基础 / 学习形式 / 如何试听 — **非**真实访谈结论  

### 禁止编造

学员总数、就业率、名师头衔未提供来源、五星好评轮播原文。

### 素材

- Hero：课堂/作品局部；无授权用抽象桌面纹理 + 插画替代，不放假人像。  
- Alt：描述学习情境，不写 SEO 堆砌。

---

## 6. Quality checklist

- [x] 继承 Direction B 与 tokens  
- [x] Home 策略可辨（分流+转化，非定价表）  
- [x] 信息顺序有理由  
- [x] 主 CTA 有行为与状态  
- [x] 无伪造评价/销量  
- [x] 学员模块条件化  
- [ ] 主 CTA 文案试听 vs 咨询最终确认 TODO  
- [ ] 对比度实现期实测（目标 WCAG 2.2 AA，未认证）  

### 风险

首屏若被运营要求加「爆款倒计时」→ 违反方向禁止项，须拒。  

### 待确认

试听/咨询表单合并；产品线一句话定稿；Hero 图授权。
