---
title: MessAuto + iMessage 实现iPhone和mac信息同步和自动复制验证码
date: 2023-09-24
author: KazooTTT
tags:
  - 效率
  - messauto
  - imessage
  - iphone
  - mac
  - apple
  - 苹果
  - 验证码
  - 短信同步
published: true
slug: >-
  messauto-imessage-to-synchronize-iphone-and-mac-messages-and-automatically-copy-captchagraphic-bed-edition
description: >-
  本文介绍了如何使用messAuto和iMessage实现iPhone和Mac之间的信息同步，并自动复制验证码。首先，在iPhone的设置中启用短信转发到Mac，并在Mac上启用iCloud信息同步。接着，安装messAuto应用程序，并设置自动粘贴和登录时启动功能，以实现验证码的自动复制。这一过程简化了在不同设备间传递验证码的操作，提高了使用效率。
noteId_x: 8
create_time: '2023/10/20 13:49:09'
update_time: '2023/10/20 13:55:39'
publish_time: '2023/10/20 13:50:45'
finished: true
rinId: 61
category: 软件
toAstro: true
date_created: 2024-12-02T11:03:24+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

# messAuto + iMessage 实现 iPhone 和 mac 信息同步和自动复制验证码

![miulm](https://pictures.kazoottt.top/2024/01/20240119-4bb8c89272c9863bfb0aa6e2030850f5.webp)

很多时候我们需要手机接收验证码，然后在电脑上使用验证码来登录，如果纯手动操作还是有些繁琐。

如果你是 iPhone + mac 用户，则可以使用 messauto + imessage 的方式来同步和自动复制验证码的操作。

一、iphone 和 mac 信息同步  
在 iphone 的设置 - 信息 - 短信转发中，勾选你要转发信息的 mac 设备。

![budk7](https://pictures.kazoottt.top/2024/01/20240119-bfea1be1a394860ac21d1ec20a879065.webp)  
然后在对应的 mac 的信息中设置 -iCloud 信息设置中启用 iCloud 云端“信息”，需要注意的是你登录 iphone 和 mac 的 icloud 账号是需要相同的。设置完成，就已经实现了信息的同步，在 mac 的信息里可以看到 iphone 的短信。

![0p16x](https://pictures.kazoottt.top/2024/01/20240119-a64ff82a345fab5bf64da2c34f925158.webp)  
![pj0l1](https://pictures.kazoottt.top/2024/01/20240119-7e26031c5ed3b0ca8f1b26ab170e1207.webp)

二、安装 messauto，并设置。

然后我们需要安装 [messauto](https://github.com/LeeeSe/MessAuto),地址是 [https://github.com/LeeeSe/MessAuto](https://github.com/LeeeSe/MessAuto/releases/tag/v0.5.0)  
![djoq7](https://pictures.kazoottt.top/2024/01/20240119-721babc141ee23a2300868bbd701179c.webp)  
版本：

MessAuto_aarch64 - 苹果芯片  
MessAuto_x86_64 - Intel 芯片

下载解压后拖到应用程序里，点击运行顶部的状态栏就会出现 messauto 的图标。我个人比较推荐的设置是勾选【自动粘贴】和【登录时启动】，如果勾选【自动粘贴】会提醒需要辅助功能的授权，根据指引跳转过去开启即可。

![1ucpz](https://pictures.kazoottt.top/2024/01/20240119-9c5f093d1e3b8cf22ceaf76a571934cf.webp)

![5lv1n](https://pictures.kazoottt.top/2024/01/20240119-4cee2f123c685983258b5a8e3a77e1d4.webp)

![i7u9s](https://pictures.kazoottt.top/2024/01/20240119-600df9cf2f1f2e83fac30b3b6ea4dc98.webp)

然后就实现了同步和自动复制验证码了。
