---
title: npm scope公共包
date: 2024-02-18T00:00:00.000Z
author: KazooTTT
tags:
  - npm
slug: npm-scope-public-package
description: >-
  在package.json文件中添加"publishConfig"字段，设置"access"为"public"，或者在发布时使用命令`npm publish
  --access=public`，以确保包的访问权限为公开。
category: 前端
toAstro: true
date_created: 2025-01-04T03:44:53.000Z
date_modified: 2025-02-07T03:25:34.000Z
---

# Npm Scope 公共包

在 package.json 中新增：

```json
  "publishConfig": {
    "access": "public"
  },
```

或者发布的时候加上 `--access=public`

```javascript
npm publish --access=public
```
