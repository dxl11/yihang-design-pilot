# Project Discovery

实现任何设计代码之前必须完成。不得仅凭 `package.json` 断定全部结构。

## 目标

回答：项目根在哪、代码写哪、用什么栈、可复用什么、不能动什么。

## 发现清单

### 结构

| 项 | 线索 |
|---|---|
| 根目录 | 含 package.json / 锁文件 / 构建配置的仓库根 |
| 页面 | `app/`、`pages/`、`src/pages/`、`routes/`、纯 `*.html` |
| 组件 | `components/`、`src/components/`、UI 库目录 |
| 样式 | `*.css`、`*.scss`、`*.module.css`、Tailwind、CSS-in-JS |
| 资源 | `public/`、`assets/`、`static/` |
| 路由 | 框架约定文件、路由器配置 |
| 构建 | vite/webpack/next/nuxt 配置 |
| 测试 | vitest/jest/playwright/cypress 配置 |

### 技术栈（按文件证据）

框架（React/Vue/Svelte/原生）、语言（TS/JS）、构建、样式方案、UI 库、路由、状态、图标、测试、lint/format。

标记：`FACT`（文件证据）/ `HYPOTHESIS`（推断）/ `UNKNOWN`。

### 约定

命名（PascalCase 组件、kebab 文件等）、样式组织、路由组织、组件复用规则、现有格式、是否 TypeScript、测试习惯。

### 保护面

业务逻辑、路由、接口、状态、鉴权、已有页面、构建配置、用户未授权文件。**不得**为贴设计而整仓重写。

## 无前端项目

状态：`NO_PROJECT`。

允许：

1. 经用户同意创建最小约定脚手架；或  
2. 仅输出实施计划 / CASE_DEMO 报告，**不**写入冒充生产的代码。

本 Skills 仓库的 `examples/` 设计案例默认属于场景 2。

## 成熟项目

1. 列出将修改文件与原因。  
2. 已有等价组件 → 映射复用，不平行新建。  
3. 断点/主题与 Design Tokens 冲突 → 记偏差，不静默覆盖。  
4. 高影响配置改动 → 说明必要性；否则暂停确认。

## 输出（写入报告 Project Discovery）

- 根路径、栈摘要表、约定、保护规则、风险文件列表、`NO_PROJECT` 或否。
