---
toAstro: true
astroType: post
published: true
toWexin: null
toJuejin: null
toZhihu: null
slug: milklove-project-reborn
title: milklove 重生计划 分支可视化
date: 2025-03-24T00:00:00.000Z
tags:
  - 同人
  - milklove
  - vue
  - vue-flow
category: 项目
description: 使用 Vue Flow 实现 milklove 重生计划的分支可视化项目的过程
date_created: 20250316
date_modified: 20250324
---

## 重生计划分支可视化

点击以下链接查看效果：

[milklove 重生计划-分支可视化](<https://reborn.milklovemuv.com/>)

![](<https://pictures.kazoottt.top/2025/03/20250321-1327dabf66342822b089a35fd2f9dac1.png>)

源代码：[GitHub - KazooTTT/milklove-project-reborn](<https://github.com/KazooTTT/milklove-project-reborn>)

此项目使用 [vue flow](<https://vueflow.dev/>) 来实现，主要是为了练习 vue 和 vue flow，以及实现一个分支可视化的效果让这个同人企划的分支更加直观。

## 准备

[汇总原文](<https://weibo.com/7906190340/5141239977217903>)  

### 获取投票数据  

其中每一个章节都有对应的投票标题以及多个选项，我们需要把这些信息拿到

分析后发现，获取投票信息的方法有两种：

1. 如果微博内容中有投票，那么直接从查询微博内容的详情中获取
2. 如果微博内容中没有投票，那么获取到投票的链接后，从查询投票的详情中获取

我先获取了两种接口的 response，然后使用 [JSON to TS](<https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts>)[JSON to TS - Visual Studio Marketplace](<https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts>) 的 vscode 插件快速把 json 转化为 ts 定义，非常好用。

再根据 ts 去写对应的解析逻辑，这样就可以很快速的把需要的投票数据拿到了。

![IMG-4ACFDF6EC8B2525AD739306DAC03B549](<https://pictures.kazoottt.top/2025/03/20250324-4acfdf6ec8b2525ad739306dac03b549.png>)

如果不想安装浏览器插件也可以使用一些在线的网页来转化：<https://transform.tools/json-to-typescript>

![IMG-22093A5CF8742CEFA5729A352B23E404-2](<https://pictures.kazoottt.top/2025/03/20250324-22093a5cf8742cefa5729a352b23e404.png>)  

## 节点关系定义

对于分支的可视化，分为两个部分，一个是节点，一个是边 edge。

对于章节和选项，我把它们看作是节点。

而需要被连接的边，是章节 - 选项（具体来说是得票最多的选项需要与下一个章节连接），然后在边上显示得票数和得票占比。
