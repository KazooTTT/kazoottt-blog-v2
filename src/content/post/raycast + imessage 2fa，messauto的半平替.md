---
toAstro: true
astroType: post
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: raycast + imessage 2fa，messauto的半平替
date: 2024-12-11T00:00:00.000Z
author: KazooTTT
tags:
  - 验证码
  - macOS
  - messauto
  - raycast
finished: true
category: null
slug: raycast-imessage-2fa
description: >-
  我做过一个messAuto的安利，使用raycast + iMessage
  2fa插件来实现iPhone和mac信息同步和自动复制验证码。最近发现作者删库了，我现在找到了一种快速获取验证码的方法。使用方法是在获取到验证码之后访问iMessage
  2fa插件，然后可以看到当前接收到的验证码，敲回车复制验证码到粘贴板。但这种方法缺点是没有messAuto方便，多了额外的步骤。
date_created: 20241211
date_modified: 20250304
---

很久之前做过一个 messauto 的安利

[messAuto + iMessage 实现iPhone和mac信息同步和自动复制验证码](/posts/messauto-imessage-to-synchronize-iphone-and-mac-messages-and-automatically-copy-captchagraphic-bed-edition)

但是最近收到评论才发现作者在前段时间删库了

![image.png](<https://pictures.kazoottt.top/2024/12/20241211-20241211203702.png>)

目前找到另一个快速获取验证码的方法，就是 raycast + imessage 2fa 插件。

![image.png](<https://pictures.kazoottt.top/2024/12/20241211-20241211203735.png>)

使用方法：

1. 在获取到验证码之后，访问 imessage 2fa 插件。
   ![image.png](<https://pictures.kazoottt.top/2024/12/20241211-20241211204526.png>)

2. 可以看到目前接收到的含有验证码的消息，敲回车复制验证码到粘贴板。

![image.png](<https://pictures.kazoottt.top/2024/12/20241211-20241211204132.png>)

缺点：没有 messauto 方便，多了访问 imessage 2fa 插件和敲回车复制验证码的步骤。
