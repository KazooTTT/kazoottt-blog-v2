---
toAstro: true
astroType: post
published: true
toWexin: null
toJuejin: null
toZhihu: null
status: Published
author: KazooTTT
category: 软件
date: 2025-02-12T00:00:00.000Z
date_created: 20250220
date_modified: 20250518
description: null
slug: handling-markdown-image-links-containing-spaces-causing-preview-failures
tags:
  - 脑洞
title: 处理markdown图片链接包含空格导致无法预览图片的问题
---

![IMG-4792F6481346E5FBAA24C7291676135F-1](<https://pictures.kazoottt.top/2025/02/20250221-4792f6481346e5fbaa24c7291676135f.jpg>)

在很久之前有写过 [md路径正确但是图片不显示的原因](https://notes.kazoottt.top/05-临时/01-草稿箱/202501/md路径正确但是图片不显示的原因)

具体来说就是 flowus 如果上传了多张图片到一个 md，然后导出的时候会出现在 obsidian 或者 vscode 中无法正常查看图片的情况。

这是因为这些图片被命名为 image.png image 1.png image 2.png, 然后在 md 中的语法为:

`![alt 属性文本](<图片地址>)`

所以导出的时候写法如下：

![alt text](<https://pictures.kazoottt.top/2025/02/20250221-050047f17cb009229dee6327839820b6.png>)

但是因为路径中包含空格，所以这些编辑器无法正确地识别到。

有两种方式来解决这个问题：

1. 把空格替换为%20
2. 把链接使用<>包裹起来

为了更好兼容性和更符合 md 的规范，我使用了第二种方法，也就是把链接使用<>包裹起来

[CommonMark](<https://spec.commonmark.org/0.30/#link-reference-definition>)

![alt text](<https://pictures.kazoottt.top/2025/02/20250221-d553bacdc647838e5684f4366bee55f1.png>)

被<>包裹起来的链接会被视为一个整体，这样就无需担心空格的问题了

处理方法如下：

## 方法一：obsidian + linter + 正则表达式处理

在 obsidian 中安装 linter 插件，然后在自定义配置中添加正则表达式处理

![alt text](<https://pictures.kazoottt.top/2025/02/20250221-741d60dc1e53b648a7292cf2fb082598.png>)

第一栏填写：`(?<=\]\()(?!<)(.+?)(?!=>)(?=\))`

第二栏填写 `gm`

第三栏填写：`<$1>`

---

如果你开启了保存后就运行 linter 的话，那么当前文件的链接就会被包裹起来了

![IMG-A76323EF3B622BCF0A912CEAD848C0A0](<https://pictures.kazoottt.top/2025/02/20250221-a76323ef3b622bcf0a912cead848c0a0.png>)

如果你想要一次性批量修改全部的话，保险起见可以先 git commit 或者手动复制备份一下

然后 windows 按下 ctrl + p，mac 按下 cmd + p。

然后搜索 `linter` 然后选择到格式化所有文件，按下回车，就能全部处理了

![IMG-5D8A27823A22095AC71D22EA80049C00](<https://pictures.kazoottt.top/2025/02/20250221-5d8a27823a22095ac71d22ea80049c00.png>)

如果批量格式化有问题，就用 git 回退一下，或者手动还原一下之前备份的内容
