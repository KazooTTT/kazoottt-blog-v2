---
title: index.md
slug: indexmd
date_created: 2024-12-02T03:03:22.000Z
date_modified: 2025-02-19T03:44:19.000Z
date: 2025-02-10T00:00:00.000Z
author: KazooTTT
tags: []
toAstro: true
description: null
---

# index.md

[FlowUs 息流 - 新一代生产力工具](<https://flowus.cn/share/a7f8853a-db27-48a3-b233-22e562052ac9>)

```dataview
table dateformat(file.ctime, "yyyyMMdd") as "创建时间"
from "{{folder_name}}"
sort file.ctime asc
WHERE !icontains(file.path,"模板")
```
