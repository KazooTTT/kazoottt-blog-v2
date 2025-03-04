---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: npm换源
date: 2024-02-07T00:00:00.000Z
author: KazooTTT
tags:
  - node
  - npm
slug: npm-registry
description: >-
  本文介绍了如何查看、更换和取消Node.js包管理工具（npm, yarn,
  pnpm）的源地址，以及如何使用yrm工具快速切换不同的npm源。通过执行特定的命令，用户可以轻松地管理这些工具的源设置，从而优化包的下载速度和开发效率。
category: 前端
date_created: 20250104
date_modified: 20250304
---

# 查看源

```shell
npm config get registry
```

```shell
yarn config get registry
```

```shell
pnpm config get registry
```

# 换源

```shell
npm config set registry https://registry.npmmirror.com
```

```shell
yarn config set registry https://registry.npmmirror.com
```

```shell
pnpm config set registry https://registry.npmmirror.com
```

# 取消换源

```shell
npm config delete registry
```

```shell
yarn config delete registry
```

```shell
pnpm config delete registry
```

# 工具

[GitHub - i5ting/yrm: YARN registry manager, fast switch between different registries: npm, cnpm, nj, taobao](<https://github.com/i5ting/yrm>)

```shell
npm install -g yrm

yrm ls

yrm use [name]
```
