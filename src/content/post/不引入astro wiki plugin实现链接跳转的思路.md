---
date_created: 2025-02-09T08:34:48.000Z
date_modified: 2025-02-09T10:20:46.000Z
title: 不引入astro wiki plugin实现链接跳转的思路
date: 2025-02-09T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - obsidian
  - astro
  - wiki-link
  - remark
finished: true
published: true
category: qianduan
slug: redirect-links-without-astro-wiki-plugin
description: null
toAstro: true
astroType: post
---

## 背景

obsidian 是我的进行笔记编辑的主力软件，并且通过 wiki 语法，也就是 `[[某个笔记]]` 的语法使用的频率很高。

与此同时，我还需要将笔记发布使用基于 astro 框架的博客上, 由于以下原因，实现起来比较困难。

1. astro 本身不支持 wiki 语法，wiki 语法需要引入 remark 插件，对 wiki 语法进行解析。
2. 在 astro 中，我使用 slug 字段作为笔记的唯一标识，而 wiki 语法中，`[[某个笔记]]` 的语法，实际上是使用笔记的 title 作为唯一标识的。如果使用插件，它的处理方式是把名称中的空格转化为下划线，并且将 title 转换为小写。

以下是 [GitHub - landakram/remark-wiki-link: Parse and render wiki links.](https://github.com/landakram/remark-wiki-link) 的文档。

![alt text](https://pictures.kazoottt.top/2025/02/2025029-e06e4053dfcf4575af0552231407d192.png)

所以这与我的需求不符合，我需要的是使用 slug 字段作为笔记的唯一标识，并且使用 wiki 语法进行链接跳转。

于是目前开源的插件不满足我的要求，我需要自己实现 wiki 语法的转化或者解析。

## 实现

这是我之前的输出和部署工作流，首先在 obsidian 中编辑，笔记有一个属性叫做 toAstro，值为 true 的时候表示需要输出到 astro 中。

![IMG-BDEFC1C365AE18FDB400CF95414BEFD2](https://pictures.kazoottt.top/2025/02/2025029-bdefc1c365ae18fdb400cf95414befd2.png)

那么实现的方式有两种，一种是从 obsidian 中输出到 astro 的时候，对于要输出到 astro 的笔记中的 wiki 做预处理 (即转化为普通的 md 语法)，另一种是使用 remark 插件，在 astro 中解析 wiki 语法。

由于比较赶时间，我首先选择了第一种方式，后续再考虑引入 remark 插件。

于是流程就变成了下图。

![alt text](https://pictures.kazoottt.top/2025/02/2025029-8aeaf70b4c3febe368b443ce860293dc.png)

对于预处理 link，具体操作是：

![alt text](https://pictures.kazoottt.top/2025/02/2025029-48c819626fb5ab42793929474f507c51.png)

这样在输出的到 astro 的笔记中，wiki 语法就变成了普通的 md 语法，同时也保留了 title。

## 效果展示

在 obsidian 中使用了 wiki link 写法

![IMG-D4D0136CE577530F2CA29510B83DF689](https://pictures.kazoottt.top/2025/02/2025029-d4d0136ce577530f2ca29510b83df689.png)

经过转化：

![IMG-1E36E72DE9CBDBB8D880E4B31D136342](https://pictures.kazoottt.top/2025/02/2025029-1e36e72de9cbdbb8d880e4b31d136342.png)

在 astro 中的效果

![[IMG-6B67FFDA95C7E30D1A1139F5E390F6F3.gif]]
