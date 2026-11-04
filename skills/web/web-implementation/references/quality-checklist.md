# Web Implementation · 质量检查

## 红灯（必须失败/停）

- [ ] 未做 Project Discovery（且未声明 NO_PROJECT）却大改仓库  
- [ ] Review=`BLOCKED` 或（`NEEDS_REVISION` 且无受限授权）仍宣称正式上线实现  
- [ ] 覆盖无关业务/鉴权/接口  
- [ ] 无批准平行第二套全局色板  
- [ ] 虚构商业内容标为事实  
- [ ] 虚构后端接口冒充业务流程  
- [ ] 未跑构建/测试却写 Build/Test **PASS**  
- [ ] 无截图宣称像素级视觉 PASS / 完成 P2.5  
- [ ] 将 `NOT TESTED` / `NOT_VERIFIED` 写成通过  
- [ ] CASE_DEMO 冒充生产部署  

## 黄灯

- [ ] READY_WITH_GAPS 未列缺口影响  
- [ ] 高影响配置已改但报告未说明  
- [ ] 可复用组件被重复实现  
- [ ] 断点与规格冲突未记偏差  
- [ ] PLACEHOLDER 未进 Pending  

## 绿灯（交付前）

- [ ] Readiness + Review 准入已记录  
- [ ] 映射表与偏差表可读  
- [ ] 验证分类型诚实  
- [ ] 修改文件列表完整  
- [ ] 主报告可独立阅读  
