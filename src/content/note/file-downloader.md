---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: file-downloader
date: 2024-02-18T00:00:00.000Z
author: KazooTTT
tags:
  - 项目
  - file-downloader
  - npm包
finished: true
slug: file-downloader
description: >-
  本文介绍了两个用于文件下载的函数：`downloadFileFromURL` 和
  `downloadFileFromBlob`。`downloadFileFromURL`
  函数用于从指定的URL下载文件，可以自定义文件名；`downloadFileFromBlob`
  函数则用于从Blob对象下载文件，同样支持自定义文件名。这两个函数均来自 `@kzttools/file-downloader`
  包，该包的NPM地址和GitHub地址均已提供。项目遵循MIT许可证，作者为kazoottt。
category: 项目
date_created: 20241217
date_modified: 20250304
---

# File Download

封装了对于 url 和 blob 类型文件的下载方法。

## downloadFileFromURL

```ts
function downloadFileFromURL(url: string, filename?: string)
```

url 是网络请求的链接，filename 不是必填，如果填了那么下载文件名称=filename

## downloadFileFromBlob

```ts
function downloadFileFromBlob(blob: Blob | MediaSource, filename: string)
```

blob 是一个 blob 对象，一般从后端获取，filename 不是必填，如果填了那么下载文件名称=filename

# 地址

npm 地址：

[@kzttools/file-downloader - npm](<https://www.npmjs.com/package/@kzttools/file-downloader>)

github 地址：

[GitHub - kzttools/file-downloader](<https://github.com/kzttools/file-downloader>)

## License

[MIT](<./LICENSE>) License © 2023-PRESENT [kazoottt](<https://github.com/kazoottt>)
