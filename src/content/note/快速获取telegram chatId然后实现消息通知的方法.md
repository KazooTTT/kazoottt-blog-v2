---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: 快速获取telegram chatId然后实现消息通知的方法
date: 2023-09-14T00:00:00.000Z
author: KazooTTT
tags:
  - 工具
  - bot
  - telegram
finished: true
slug: quick-way-to-get-telegram-chatid-and-then-implement-message-notification
description: >-
  本文介绍了如何快速获取Telegram的chatId并实现消息通知的方法。首先，设置Telegram账户的username，然后向@RawDataBot发送消息以获取chatId。最后，结合Telegram
  bot和apprise工具来实现消息通知功能。
category: 前端
date_created: 20241217
date_modified: 20250304
---

# 快速获取 telegram chatId 然后实现消息通知的方法

1. 给 telegram 账户设置 username
2. 搜索 [@RawDataBot](<https://www.alphr.com/find-chat-id-telegram/>)，给它发送一条消息。它会返回账户相关的信息给你。格式如下：，chat.id 就是所需要的 chatId![Pasted image 20230914233217](<https://pictures.kazoottt.top/2024/10/20241017-cd326efab542823c73ab2e2542e89dd7.png>)
3. 然后就能结合 [telegram bot](<https://api.telegram.org/>)+ [apprise](<https://github.com/caronc/apprise/wiki/Notify_telegram>) 做消息通知了。![Pasted image 20230914233337](<https://pictures.kazoottt.top/2024/10/20241017-74884e2c10edcede13696599c163ffe4.png>)
