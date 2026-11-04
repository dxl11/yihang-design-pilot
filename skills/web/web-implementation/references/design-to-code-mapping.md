# Design-to-Code Mapping

P2.4 核心方法论：规格条目 ↔ 代码落点。适配用户栈，不强制统一技术。

## 映射总表

| 设计输入 | 实现目标 |
|---|---|
| Design Tokens | CSS Variables / SCSS / 主题系统 / Tailwind theme 扩展 |
| Typography | 字体加载、type scale、行高、字重 |
| Spacing | 间距变量与布局规则 |
| Colors | 语义色变量（优先映射已有主题） |
| Design System Components | 可复用 UI 组件 |
| Page Design Sections | 页面模块 / 路由段 / 区块组件 |
| Responsive Rules | Media queries / 容器查询 / 框架响应式 API |
| Interaction Specs | 事件、状态机、表单校验 |
| Accessibility Rules | 语义 HTML、焦点、label、alt |
| Review Issues（已确认） | 整改任务（非 INFO 全量强制） |

## Token 实现

1. 读真实 `design-tokens.json`（或项目等价）；**勿假定字段名**。  
2. 识别：命名、类型、值、引用、语义、适用范围。  
3. 项目已有变量 → **优先映射**，禁止平行第二套色板。  
4. 无体系 → 按项目习惯建立（CSS 变量优先常见）。  
5. 禁止：散落魔法数、组件私藏同色、未批准改 Token 语义值。  
6. 无法映射 → 记入偏差表。

## 组件映射

候选类别（按需）：Button、Input、Select、Card、Navigation、Header、Footer、Modal、Tabs、Badge、Form、Section、Container。

规则：

1. 先搜现有组件。  
2. 满足需求则复用（可薄包装对齐 Token）。  
3. 不重复造轮。  
4. 状态按规格（非每个组件全集）。  
5. 不过度拆分，也不单文件堆全站。

## 页面映射

每个 page-id：规格区块 → 文件路径 → 组件树 → 路由 → 共享 vs 专属。

## 报告字段

映射表至少含：设计源、代码目标、策略（reuse/new/adapt）、备注/风险。
