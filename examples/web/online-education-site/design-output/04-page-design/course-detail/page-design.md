# Page Design — 课程详情 Course Detail (`/courses/product-design-foundation`)

- Skill: web-page-design
- 日期: 2026-11-03
- 页面类型: Course Detail Page
- 置信度: medium（课程具体大纲与定价未提供）
- 上游: Brief · IA · Direction B · Design System · tokens
- **IA 关系**: 单课详情在 IA 中为 P2；本页为 **P2.1 类型验证**。示例课名 `product-design-foundation` 为 PLACEHOLDER slug，非已上架确认课单。[HYPOTHESIS/TODO]

## 1. Overview

### 目标

| 层 | 内容 | 标记 |
|---|---|---|
| 商业 | 让合适用户申请该方向试听/咨询 | FACT（主转化） |
| 用户 | 判断课程是否匹配自身阶段；降低买错风险 | HYPOTHESIS（怕买错）+ FACT（需展示体系） |
| 成功 | 完成「适合我」判断后到达 `/apply?course=…` | 建议 TODO |

### 类型选型

**Course Detail**：决策页。重点是定位、适合人群、内容结构、收益、信任与顾虑，**不是**第二首页，也**不是**在价格未定时强行结账。

### 用户任务

1. P0：这门课教什么、多深。[FACT 需要]  
2. P0：适不适合我 / 不适合谁。[INFER 关键]  
3. P0：下一步试听或咨询。[FACT]  
4. P1：谁教、如何学。[FACT]  
5. P2：价格（未定 → 不写死）。[FACT]

### 设计策略

1. 顶区：课程名 + 定位句 + 适合人群摘要 + 主 CTA。  
2. 中部：你将学到什么 → 大纲 → 学习方式 → 教研。  
3. 明确「不适合谁」区块，服务诚实转化，非话术堆砌。  
4. 价格区仅「咨询了解档位」或链定价策略页；不编造 ¥ 数字。  
5. 评价区：无真实评价则**省略**或标「内容待提供」，禁止假评论组件。

### 关键决策

- 示例课隶属「产品设计」产品线，面包屑：课程 → 产品设计 → 本课。[INFER]  
- 报名路径统一进 `/apply`，查询参数标识课程。[INFER]

---

## 2. Structure

| # | 区块 | 目标 |
|---|---|---|
| 1 | Header + Breadcrumb | 定位层级 |
| 2 | Course hero | 名称、定位、适合标签、CTA |
| 3 | 学习收益 | 3–5 条可验证能力（PLACEHOLDER 待教研） |
| 4 | 课程大纲 | 模块列表；可 Accordion |
| 5 | 适合 / 不适合 | 决策辅助 |
| 6 | 学习方式 | 录播+答疑边界 |
| 7 | 教研 | 链教师简介；无简历不编造 |
| 8 | 价格与报名 | 咨询导向 |
| 9 | FAQ（课级） | 2–4 问 |
| 10 | 终局 CTA | 再次申请 |
| 11 | Footer | |

### 信息层级

- P0：定位、适合人群、大纲摘要、CTA  
- P1：收益、学习方式、教研、课级 FAQ  
- P2：详尽周历、教具清单（若无材料则不上）  

### 顺序理由

先帮用户「对号入座」，再展开内容深度，最后谈获取方式与顾虑；比价与结账后置且弱化——因定价未定。[FACT]

### 入口 / 出口

- 入：`/courses`、产品线页、首页产品线。  
- 出：`/apply`、`/programs/product-design`、`/faq`、`/team`。

---

## 3. Layout

- 桌面：主栏（大纲与正文）约 8 列 + 粘性侧栏 4 列（CTA、适合标签、咨询）。  
- 移动：侧栏内容上收为 Hero 下「申请」条，大纲全宽。  
- 容器与间距继承 `layout.container.max`、`spacing.scale`；卡片仅用于侧栏 CTA 容器（交互容器），正文避免卡片墙。  
- 标题：`size.xl` 课程名；章节 `size.lg`；正文 `md`。  
- 色：侧栏 CTA = `brand.primary`；警告「不适合」提示用 `status.warning` 文本色，非大红促销条。  
- **不新增全局 tokens**。

---

## 4. Interaction

### 主 CTA「申请本课试听」

| 项 | 定义 |
|---|---|
| 触发 | Hero / 粘性侧栏 / 底栏 |
| 行为 | 前往 `/apply?course=product-design-foundation` |
| 成功 | 表单页预填课程名（若实现支持） |
| 失败 | 参数丢失则表单仍可用，课程字段手填 PLACEHOLDER |
| 状态 | hover / focus-visible / loading（若同页提交——本设计为跳转，无 loading） |

### 大纲 Accordion

展开一节；`aria-expanded`；仅一节强制互斥可选（不强制）。

### 「咨询档位」次 CTA

→ `/pricing` 或 `/apply?intent=pricing`（站点若未上线 pricing，则只用 apply + intent）。[TODO 与 IA 同步]

### 禁止

一键「立刻以 ¥X 购买」在价格未确认时出现。[FACT]

---

## 5. Content

### 结构

- 课程名 PLACEHOLDER：`产品设计基础课`（待课表确认）  
- 定位句 PLACEHOLDER：面向转行者的结构化产品设计入门  
- 适合：有转行意向的职场人等 — **HYPOTHESIS**，须教研改定  
- 不适合：寻求资深作品集精修者等 — PLACEHOLDER  
- 大纲：模块标题列表 PLACEHOLDER，禁止填假课时数冒充 FACT  
- 教研：姓名与简介待提供；无则显示「教研介绍筹备中」  
- 评价：不展示假卡片  

### 禁止编造

完课率、薪资涨幅、录取大厂名单、星级评分。

### 素材

课程界面截图（授权后）；图标用系统简洁线标，非霓虹。

---

## 6. Quality checklist

- [x] Course Detail 策略（适合人群 + 大纲 + 诚实转化）异于 Home  
- [x] 继承 tokens / Direction B  
- [x] CTA 行为完整  
- [x] 无假评价与假价格  
- [x] IA P2 偏离已声明  
- [ ] 真实课名/大纲/教师 TODO  
- [ ] apply 查询参数与后台约定 TODO  
- [ ] a11y 实现期实测  

### 风险

运营要求首页式「名师轮播 + 虚假好评」→ 拒绝写入 FACT。

### 待确认

示例课是否存在于正式课表；试听是否按课维度。
