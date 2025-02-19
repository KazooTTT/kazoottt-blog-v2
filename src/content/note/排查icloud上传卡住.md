---
slug: troubleshooting-stuck-icloud-uploads
toAstro: true
description: >-
  本文介绍了如何排查iCloud上传卡住的问题，包括使用`brctl log -w`命令查看日志，以及通过`killall bird`和`killall
  cloudd`命令结束相关进程来解决问题。
tags:
  - icloud上传卡住
  - 日志打印
  - brctl-command
date_created: 2025-01-04T03:34:08.000Z
date_modified: 2025-02-19T03:44:09.000Z
title: 排查icloud上传卡住
---

# 排查 icloud 上传卡住

日志打印

```sh
brctl log -w
```

杀掉进程

```sh
killall bird
killall cloudd
```
