# Design Review — 课程详情 (`/courses/product-design-foundation`)

- Skill: web-design-review
- 日期: 2026-11-04
- 结论: **NEEDS_REVISION**
- 基准: `04-page-design/course-detail` · `05-responsive-design/course-detail`

## 1. Review Overview

课程详情为 **IA P2 验证页**。规格在任务结构与粘性 CTA 策略上合理，但课名/大纲/教师均为 PLACEHOLDER，且无运行证据证明粘性条不挡内容。结论：需修订内容与补测，不能 Approved。

## 2. Review Scope

**In**：验证页披露、适合/不适合保留、无假价格/假评价、响应式粘性补位逻辑。  
**Out**：真实课表是否存在、支付。  
**必须披露**：非 Sitemap 首期定稿页。

## 3. Input Inventory

Brief、IA、Direction、System、tokens、04/05 course-detail — 已读。  
截图 / 浏览器 / a11y — **缺失**。

## 4. Evidence Coverage

| 类型 | 状态 |
|---|---|
| PAGE_DESIGN / RESPONSIVE_DESIGN | HIGH |
| DESIGN_SCREENSHOT / BROWSER_TEST | 无 |
| CASE_DEMO | CD-RS-01 演示粘性遮挡风险 |

## 5. Overall Result

**NEEDS_REVISION**  

确证问题来自内容未就绪（HIGH）与验证页状态；运行 CRITICAL 未证实。因 PLACEHOLDER 阻断「可上线课程页」叙事 → 修订。

## 6. Dimension Results

| 维度 | 状态 |
|---|---|
| Visual Quality | NOT TESTED |
| Design System Consistency | PARTIAL（规格继承 tokens） |
| Information Architecture | PARTIAL（验证页已声明；单课路径假设） |
| Interaction | NOT TESTED（规格含申请状态；粘性行为未测） |
| Responsive Design | PARTIAL（sticky-cta-reader 策略清晰） |
| Accessibility | NOT TESTED |
| Business Goals | PARTIAL（试听路径在） |
| Content Quality | FAIL（关键 PLACEHOLDER） |
| Overall Experience | NOT TESTED |

## 7. Issue Summary

CRITICAL 0 · HIGH 1 · MEDIUM 1（demo）· LOW 0 · INFO 1

## 8. Detailed Findings

### CD-CNT-01（HIGH）

- **维度**: Content Quality  
- **描述**: 课名、大纲、适合文案、教研均为 PLACEHOLDER，无法支撑「适不适合我」主任务的真实决策。  
- **证据**: PAGE_DESIGN Content；BRIEF 需体系信息  
- **整改**: 教研提供真实大纲与适合/不适合；无内容则本页不下线导航。验收：关键段无 PLACEHOLDER；不编造完课率。  
- **状态**: open  

### CD-RS-01（CASE_DEMO · MEDIUM）

- **维度**: Responsive Design  
- **描述**: 规格要求底粘性申请；若实现不当可能遮挡大纲首项。[演示]  
- **证据**: RESPONSIVE_DESIGN Layout；无 BROWSER_TEST  
- **整改**: 实现时预留底安全区与大纲首项滚动边距；375 浏览器确认首项可点。验收：记录截图。未测前保持 NOT TESTED 运行态。  
- **状态**: demo  

### CD-IA-01（INFO）

- **维度**: Information Architecture  
- **描述**: 保持「验证页 / P2」标签直至正式纳入 Sitemap。  
- **证据**: IA §6；PAGE_DESIGN 头信息  
- **状态**: open  

## 9. Recommended Actions

1. 补真实课内容或从导航隐藏。  
2. 实现后做粘性条 375 走查。  
3. 再审查。

## 10. Unverified Items

粘性不遮挡、键盘手风琴、对比度 — NOT TESTED。

## 11. Acceptance Criteria

- 内容 PLACEHOLDER 清除或页不发布。  
- 至少一次 Mobile 浏览器记录证明申请可达且不挡大纲。  
- 验证页或转正状态二选一写清。

## 12. Review Limitations

无渲染稿；CASE_DEMO 非实测遮挡证明。
