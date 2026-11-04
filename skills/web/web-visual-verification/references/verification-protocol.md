# 可复现验证协议

## 测试环境记录（每次必填）

Project 标识/路径、Git commit（可得时）、Base URL、浏览器类型与版本、OS、执行模式（A/B/C）、时间、页面列表、视口矩阵、DPR（可得时）、工具与版本、限制。  
**禁止**写入密钥、Cookie、Token、隐私数据。

## 页面稳定等待

优先：DOM ready、关键选择器可见、network idle（若工具支持）、字体/图加载策略、滚动归位、Sticky 稳定。  
避免盲目固定 sleep。不可控动态内容记 Limitation。

## 视口矩阵（继承 P2.2）

1. 读该页 `05-responsive-design` 的 Viewport Strategy / Breakpoint Rationale。  
2. 覆盖关键布局态；断点两侧可取代表宽。  
3. **禁止**把 375/768/1024/1440 描述为「设计规定」——除非规格写明。  
4. 缺数值 → `VIEWPORT_SPEC_MISSING`；可建**明确假设**并标受限验证。  
5. 不同页面可有不同矩阵。

每视口记录：width、height、DPR、布局态、选择理由、规格来源路径。

启航案例参考带（来自案例 05，非全局硬编码）：Narrow 320 · Mobile 375–639 · Tablet 640–1023 · Desktop 1024–1279 · Wide ≥1280；实现断点对齐 tokens `sm|md|lg|xl`。

## 截图协议

命名建议：`<run-id>/<page-id>/<viewport-id>/<capture-type>.png`  

元数据：page、viewport、scroll、browser、time、run-id、path、类型、是否整页、动态内容、是否对照参考图。

区分：验证产物 · 用户原设计稿 · 用户提供截图 · 临时文件。  
不覆盖用户原图；含 PII 则脱敏；本地临时截图默认**不**提交 Git。

## 可重复性

记录可复用配置、重跑方式、环境变化、版本关联、整改前后证据对。  
不同版本/视口/浏览器截图不得当作严格视觉回归同一基线。
