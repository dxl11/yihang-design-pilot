# Web Visual Verification · 质量检查

## 红灯

- [ ] 无浏览器/无证据却标 Browser 或 Visual **PASS**  
- [ ] 无参考图却声称设计稿匹配  
- [ ] 像素 diff 单独判设计 FAIL  
- [ ] 工具缺失判为页面 FAIL  
- [ ] 视口矩阵硬编码冒充规格规定值  
- [ ] 伪造截图路径或运行日志  
- [ ] CASE_DEMO 当作真实运行证据  
- [ ] 仅桌面截图却全站 VERIFIED  
- [ ] 无复测证据标 FIXED  
- [ ] 将 P2.4 代码保真度冒充 P2.5 浏览器验证  
- [ ] 宣称完整 WCAG 认证（仅基础检查时）  

## 黄灯

- [ ] READY_WITH_LIMITATIONS 未列限制  
- [ ] MODE B/C 未分列已执行 vs 未执行  
- [ ] Warning 全当 FAIL  
- [ ] 临时截图误提交 Git  

## 绿灯

- [ ] Readiness + Mode 已记录  
- [ ] 视口可追溯到 05 规格或显式假设  
- [ ] 证据索引完整  
- [ ] 结论与证据一致  
- [ ] 敏感信息未入库  
