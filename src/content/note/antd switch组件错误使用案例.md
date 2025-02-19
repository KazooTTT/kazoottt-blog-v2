---
title: antd switch组件错误使用案例
date: 2024-10-12T00:00:00.000Z
author: KazooTTT
tags:
  - bug
description: >-
  antd的switch组件错误使用案例：当使用到antd的[switch](<https://ant-design.antgroup.com/components/switch-cn>)组件时，需要注意其api的使用。典型情况是，将checked状态与mode关联起来，并在mode变化时触发回调，然而，这种写法会导致切换switch时不会触发回调，而是等待-checked状态改变时才触发。正确的方法是使用onClick事件而不是onChange，这样可以让切换switch时触发回调。
slug: antd-switch-component-misuse-example
toAstro: true
date_created: 2025-01-04T03:44:53.000Z
date_modified: 2025-02-19T03:44:15.000Z
---

# antd switch 组件错误使用案例

在使用 antd 的 [switch](<https://ant-design.antgroup.com/components/switch-cn>) 的时候,我错误地使用了 api

``` tsx
<Switch checked={mode === 1} onChange={handleModeChange} />
```

这里的 onChange 是 cheked 变化的时候触发的回调,如果想要切换 Switch 的时候触发回调,应该使用 onClick，而不是 onChange。

![](<https://pictures.kazoottt.top/2024/10/20241012-3c8ddd04bc2a657d8a1a265e48b533fb.png>)
