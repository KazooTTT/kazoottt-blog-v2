---
title: __dirname is not defined in ES module scope
date: 2024-05-29
author: KazooTTT
type: Post
status: Published
tags:
  - nodejs
  - 前端
  - esm
  - module
finished: true
published: true
category: 前端
slug: dirname-is-not-defined-in-es-module-scope
NotionID-notionnext: 543bfc66-a416-4704-92be-9a93fed191a8
link-notionnext: >-
  https://kazoottt.notion.site/__dirname-is-not-defined-in-ES-module-scope-543bfc66a416470492be9a93fed191a8
rinId: 14
description: >-
  # ES Module 问题：__dirname 不定义
  在使用
  TypeScript创建的ESM文件中，遇到__dirname不定义的问题通常是因为使用了module的语法，应该改为ESM的写法。两种解决方法分别是改为module的写法和改为ESM的写法。
  ## 改为module的写法
  在这种方法中需要把import改为require，将后缀从ts改为cts。
  但这种方式并不推荐，因为它可能会导致文件相对路径的问题。
  ## 改为ESM的写法
  可以通过利用import.meta.url和fileURLToPath函数，获取当前模块的目录路径来解决__dirname不定义的问题。
  ```typescript
  import { fileURLToPath } from "url"
  import path from "path"
  // 获取当前模块的目录路径
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  ```
  这种方法推荐使用，避免了相对路径的问题。
toAstro: true
date_created: 2025-01-04T11:44:53+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

# __dirname Is not Defined in ES Module Scope

在 package.json 中的 type = module 的项目中，我创建了一个 ts 文件，类型是 esm 的类型。

这里的报错是因为我们错误的使用了 module 的语法到 esm 的文件中，要解决这个问题的方法有两种，第一种改为 module，另一种是改为 esm 的写法。

首先是第一种改为 module 的写法，那就是把 import 改为 require，然后由于我们这里是 module 的项目，所以需要修改一下 ts 文件的后缀 ts 改为 cts。

一个供参考的例子：[GitHub - shawnsparks/typescript-esm: Explore different usage patterns of ES modules with Typescript](https://github.com/shawnsparks/typescript-esm)

然后是第二种，文件、路径相关的改为 esm 的写法。

```ts
import { fileURLToPath } from "url"
import path from "path"

// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
```
