---
title: 处理markdown图片链接中包含的空格
date: 2025-02-12T00:00:00.000Z
author: KazooTTT
tags:
  - 软件
  - markdown
  - flowus
  - Obsidian
  - linter
description: null
slug: brain-storming-2025-02-12-11-06-45
toAstro: true
astroType:
  - post
category: 软件
date_created: 2025-02-12T03:06:45.000Z
date_modified: 2025-02-19T17:12:48.000Z
---

举例：flowus如果上传了多张图片到一个md，然后导出的时候会出现在obsidian或者vscode中无法正常查看图片的情况。

这是因为这些图片被命名为 image.png image 1.png image 2.png, 然后在md中的语法为:

`![alt 属性文本](<图片地址>)`

所以导出的时候写法如下：

![alt text](<IMG-050047F17CB009229DEE6327839820B6.png>)

但是因为路径中包含空格，所以这些编辑器无法正确地识别到。

有两种方式来解决这个问题：

1. 把空格替换为%20
2. 把链接使用<>包裹起来

为了更好兼容性和更符合md的规范，我使用了第二种方法，也就是把链接使用<>包裹起来

[CommonMark](<https://spec.commonmark.org/0.30/#link-reference-definition>)

![alt text](<IMG-D553BACDC647838E5684F4366BEE55F1.png>)

被<>包裹起来的链接会被视为一个整体，这样就无需担心空格的问题了

处理方法如下：

## obsidian + linter + 正则表达式处理

在obsidian中安装linter插件，然后在自定义配置中添加正则表达式处理

![alt text](<IMG-741D60DC1E53B648A7292CF2FB082598.png>)

第一栏填写：`(?<=\]\()(?!<)(.+?)(?!=>)(?=\))`

第二栏填写 `gm`

第三栏填写：`<$1>`

--- 

配置完后保存的时候就会自动按照正则表达式的匹配去加上<>了，如果你想要一次性全部修改，那么执行 linter:格式化所有文件 的操作即可

（保险起见可以先备份，或者 git commit 一下，如果有问题可以回退）

![IMG-6A0336B734F0EE31210D7823E19C9BC2](/mdImages/IMG-6A0336B734F0EE31210D7823E19C9BC2.png)
