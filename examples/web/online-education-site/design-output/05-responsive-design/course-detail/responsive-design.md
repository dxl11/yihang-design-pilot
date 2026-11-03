# Responsive Design — 课程详情 Course Detail (`/courses/product-design-foundation`)

- Skill: web-responsive-design
- 日期: 2026-11-03
- 基准: `04-page-design/course-detail/page-design.md`
- 置信度: medium（验证页；课纲 PLACEHOLDER）
- **IA**：单课为 P2 验证页声明保持。[FACT]

## 1. Overview

**页面任务**：判断适合与否 → 读大纲 → 申请本课试听。  
**响应式目标**：长文可读；**报名 CTA 在窄屏永不丢失**（侧栏折叠后由粘性补位）。  
**策略标签**：`sticky-cta-reader` — 异于首页营销叠放与价格卡栈。

## 2. Viewport Strategy

| 视口带 | 测试宽 | 关注 |
|---|---|---|
| Narrow/Mobile | 320–639 | 单列阅读；顶/底粘性申请 |
| Tablet | 640–1023 | 仍偏单列或弱双列；CTA 粘性 |
| Desktop | ≥1024 | 主 8 + 侧 4；侧栏 sticky |
| Wide | ≥1280 | 主栏 `proseMax` 控制行长 |

## 3. Breakpoint Rationale

| Token | 冲突→变化 |
|---|---|
| `lg` 1024 | 侧栏与正文并排导致正文过窄或 CTA 掉出首屏 → **≥lg** 启用 8+4；**<lg` 单列，侧栏块上移至 Hero 下「报名条」 |
| `md` 768 | 大纲手风琴触控；面包屑可换行 |
| `sm` 640 | 内边距改 mobile gutter |
| `xl` | 主栏不超过 `layout.proseMax` 720px 等效舒适行长 |

## 4. Layout Transformation

| 区域 | ≥lg | <lg | 原因 / UX |
|---|---|---|---|
| 主体 | 左大纲与章节，右侧粘性报名卡 | 全宽正文流 | 阅读优先，避免手机双栏挤字 |
| 侧栏 CTA | Sticky 于主栏旁 | **抽为**：Hero 下主按钮 + 滚动 **底粘性「申请本课试听」** | 防止侧栏移走后转化入口消失 |
| 适合/不适合 | 可两列 | 上下两块 | 决策信息完整保留 |
| 大纲 | Accordion | 同，项高增大 | 长内容扫读 |
| 价格/投入 | 咨询链 | 同，全宽次按钮 | 无标价 FACT |

**不变**：适合/不适合、大纲可达、主 CTA 语义。

## 5. Content Priority

顺序（窄屏）：Breadcrumb → Course hero（名+定位+适合标签+主 CTA）→ 收益 → 大纲 → 适合/不适合 → 学习方式 → 教研 → 投入说明 → FAQ → 终局 CTA。  
**不删**「不适合谁」——决策关键，可默认折叠详情但标题可见。[FACT 策略]  
假评价区本就不存在，无需「移动隐藏好评」。

## 6. Navigation Adaptation

- 面包屑：窄屏允许两行；链可点。  
- 全局 Nav：同站点汉堡规则（见首页规格，全站一致）。  
- 页内：可选「大纲」锚点，**<lg` 显示为次链，非依赖 hover。

## 7. Component Behavior

- **Sticky CTA 条**：显示课程短名 + 申请；滚动方向隐藏/显示策略实现期定，设计要求不挡大纲首项。[HYPOTHESIS]  
- **Accordion**：`aria-expanded`；图标与文案同属按钮。  
- **次 CTA 咨询档位**：跳转 pricing/apply intent；移动全宽 secondary。

## 8. Interaction Adaptation

- 侧栏 hover 高亮仅桌面；移动无对等需求。  
- 底粘性不与系统手势冲突：底部安全区 padding TODO。  
- 申请跳转成功/失败同 Page Design。

## 9. Typography & Spacing

- 课程 H1：`xl` 桌面 → 移动不低于 `lg`。  
- 正文 `md`；大纲项 `sm`+ 足够行高。  
- 章节间距 24/32；粘性条 padding 12/16。  
- 继承 tokens，无新全局色。

## 10. Responsive Media

课程截图：桌面可右浮或通栏；移动通栏，`object-fit: contain` 优先（UI 细节勿过度裁切）。缺失则占位。

## 11. Accessibility

粘性条不夺走焦点顺序不合理位置；跳过到正文链建议有。  
对比度/读屏 **NOT TESTED**；目标 AA。

## 12. Edge Cases

- 超长课名：粘性条截断 + title 属性。  
- 大纲 20+ 节：手风琴默认全收，提供「全部展开」。  
- 320 + 底粘性：终局 CTA 与底栏间距防误点。  
- 横屏：保持单列阅读。

## 13. Validation Checklist

| 项 | 状态 |
|---|---|
| 设计：侧栏丢失有粘性补位 | DONE |
| 375 申请始终可见 | **NOT TESTED** |
| 大纲键盘操作 | **NOT TESTED** |
| 无横溢 | **NOT TESTED** |

## 14. FACT / HYPOTHESIS / TODO

- FACT：验证页；主转化申请；无真价格。  
- HYPOTHESIS：底粘性 vs 顶粘性择一。  
- TODO：真实课纲；安全区；浏览器矩阵。
