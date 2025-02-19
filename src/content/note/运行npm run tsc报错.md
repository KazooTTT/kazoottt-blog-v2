---
title: 运行npm run tsc报错
date: 2024-10-15T00:00:00.000Z
author: KazooTTT
tags:
  - bug
description: >-
  npm run lint:js 和 npm run prettier 成功后， however，出现了一个错误，即Missing script
  "tsc"。这是因为 package.json 中的脚本中没有定义该命令。解决这个问题可以通过在package.json中添加如下内容来实现： ```
  "scripts": {
      "tsc": "tsc"
    },
  ``` 或 ``` "scripts": {
      "tsc": "tsc --noEmit"
    },
  ``` 这两个脚本将为我们提供一个正确的命令，用于执行 TypeScript 编译。
slug: npm-run-tsc
toAstro: true
date_created: 2025-01-04T03:44:53.000Z
date_modified: 2025-02-07T03:16:07.000Z
---

## 错误现象

``` bash
> npm run lint:js && npm run prettier && npm run tsc

Checking formatting...
All matched files use Prettier code style!
npm error Missing script: "tsc"
npm error
npm error To see a list of scripts, run:
npm error   npm run
npm error A complete log of this run can be found in: C:\Users\turbo\AppData\Local\npm-cache\_logs\2024-10-12T06_30_22_873Z-debug-0.log
 ELIFECYCLE  Command failed with exit code 1.
```

## 错误原因

虽然安装了 tsc 但是这里的写的是 npm run tsc，也就是说 package.json 的 script 中的需要有 tsc

## 解决方法

在 package.json 中添加：

```
 "scripts": {
    "tsc": "tsc"
  },
```

如果有其他的配置需求可以在后面添加，例如

```
 "scripts": {
    "tsc": "tsc --noEmit"
  },
```
