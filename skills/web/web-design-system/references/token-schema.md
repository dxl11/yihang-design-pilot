# design-tokens.json 约定

顶层建议：

```json
{
  "$schemaNote": "yihang-design-pilot web-design-system tokens v0.1",
  "meta": {
    "project": "string",
    "basedOnVisualDirection": "string",
    "generatedBy": "web-design-system"
  },
  "color": {
    "brand": { "primary": { "value": "#0F766E", "source": "..." } },
    "text": { "primary": { "value": "#..." }, "secondary": { "value": "#..." } },
    "surface": { "default": { "value": "#..." }, "elevated": { "value": "#..." } },
    "border": { "default": { "value": "#..." } },
    "status": {
      "success": { "value": "#..." },
      "warning": { "value": "#..." },
      "danger": { "value": "#..." }
    }
  },
  "typography": {
    "fontFamily": {
      "display": { "value": "...", "fallback": "..." },
      "body": { "value": "...", "fallback": "..." }
    },
    "size": {
      "xs": { "value": "12px" },
      "sm": { "value": "14px" },
      "md": { "value": "16px" },
      "lg": { "value": "20px" },
      "xl": { "value": "28px" },
      "2xl": { "value": "40px" }
    }
  },
  "spacing": {
    "scale": [4, 8, 12, 16, 24, 32, 48, 64]
  },
  "radius": {
    "sm": { "value": "4px" },
    "md": { "value": "8px" },
    "lg": { "value": "16px" }
  },
  "breakpoint": {
    "sm": { "value": "640px" },
    "md": { "value": "768px" },
    "lg": { "value": "1024px" },
    "xl": { "value": "1280px" }
  }
}
```

规则：

- `value` 为字符串或数字数组；禁止 `undefined` / 空对象充数。  
- 不要输出注释（标准 JSON）。  
- 可用 `$schemaNote` / `meta` 作说明字段。
