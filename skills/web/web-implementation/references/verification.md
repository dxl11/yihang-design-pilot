# Implementation Verification

优先复用项目已有：Build、Typecheck、Lint、Unit/Component/Integration、已有 Browser 测试。**勿**无故引入新测试框架。

## 结果码

`PASS` | `FAIL` | `PARTIAL` | `NOT TESTED` | `BLOCKED`

## 验证类型（必须分列）

| 类型 | 证明什么 |
|---|---|
| Build | 当前环境构建命令成功 |
| Type | 已跑类型检查通过 |
| Lint | 已跑静态检查通过 |
| Test | 已跑相关测试通过 |
| Runtime | 已启动并做运行检查 |
| Visual | **仅**在有并检查视觉证据后 |

## 诚实规则

- Build PASS ≠ 网站质量 PASS  
- Lint PASS ≠ 交互正常  
- 单页可跑 ≠ 全站验证完成  
- 缺依赖/服务/env/后端 → 记具体 BLOCKED 原因  
- 文档结构测试 ≠ 真实网页实现能力测试（Skills 仓自动化边界）

## 报告

每类：命令、范围、结果码、日志摘要或阻碍。未执行 → `NOT TESTED`，永不默认为 PASS。
