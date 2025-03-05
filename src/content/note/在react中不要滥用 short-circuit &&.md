---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: 在react中不要滥用 short-circuit &&
date: 2024-10-16T00:00:00.000Z
author: KazooTTT
tags:
  - 前端
  - bug
  - jsx
  - react
  - short-circuit
finished: true
description: >-
  在React中使用短路运算符（&&）时，0 会被错误地渲染为内容。通过避免使用 && 判断数字，特别是可能为 0 的值，可以确保正确的内容显示，例如显示
  0号相机 而非仅仅显示 0。
slug: do-not-misuse-short-circuiting-in-react
category: 前端
NotionID-notionnext: 12b55568-fd75-815c-ba9c-ff587a86a262
link-notionnext: >-
  https://kazoottt.notion.site/react-short-circuit-12b55568fd75815cba9cff587a86a262
date_created: 20250104
date_modified: 20250304
---

## 错误现象

代码如下：

``` jsx
{camera_id && (
  <div>{camera_id}号相机</div>
)}
```

当 camera_id>0 的时候，正常显示 x 号相机

当 camera_id=0 的时候，**异常**显示 0,而不是 0 号相机

## 错误原因

这是因为在 JavaScript 中，`0` 被视为 falsy 值，因此当 `camera_id` 为 `0` 时，条件判断 `camera_id &&` 会返回 `false`。所以后面的内容不被渲染。

但是 0 是可以被 react 渲染的，所以最后显示的是 0，而不是不显示。

## 解决方法

涉及到数字且可能为 0 的时候，不要直接使用&&来判断，而是使用

``` jsx
{camera_id !== undefined && (
  <div>{camera_id}号相机</div>
)}
```

## 参考

[reactjs - React showing 0 instead of nothing with short-circuit (&&) conditional component - Stack Overflow](<https://stackoverflow.com/questions/53048037/react-showing-0-instead-of-nothing-with-short-circuit-conditional-component>)
