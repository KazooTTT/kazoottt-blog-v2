---
toAstro: true
astroType: post
published: true
toWexin: null
toJuejin: null
toZhihu: null
date: 2025-03-20T00:00:00.000Z
tags:
  - 大模型
  - 听写
  - 文本润色
  - 语音输入
  - macOS
category: null
slug: using-macos-built-in-voice-dictation-as-input
description: null
title: 使用macOS自带的语音听写功能作为输入方式，省时省力
date_created: 20250320
date_modified: 20250320
---

## 太长不看

步骤如下：  

![IMG-72886D90590DCDBBFDD4DFF5E21DDAA6](<https://s2.loli.net/2025/03/20/crg9yGiLflh8n2E.png>)

``` mermaid
graph TD
    A[用户通过macOS语音输入] -->|生成文本| B[原始文本]
    B -->|输入到大模型| C[大模型处理]
    C -->|润色后的文本| D[最终输出]
```

---  

## 具体步骤

[在 Mac 上听写信息和文稿 - 官方 Apple 支持 (中国)](<https://support.apple.com/zh-cn/guide/mac-help/mh40584/mac>)

![IMG-A5FC835FCE95BF1B2F41D8C92AF396AD](<https://s2.loli.net/2025/03/20/ymDUw1KhikvsJ7o.png>)  
快捷键可以自己设置（搜索 “键盘” 进入入口），默认是按下两次 ctrl 键

![IMG-3766F08366080FBC6CFA90E99D014C40](<https://s2.loli.net/2025/03/20/zVnpcX6gdSFyKfI.png>)

实时识别的效果：  
![IMG-A799C354077C63D32B329D50E9FE2A7D](<https://s2.loli.net/2025/03/20/k9D3a7W8MNCEXmA.gif>)  

Cherry Studio 自带的助手的提示词：  

``` plaintext
Using concise and clear language, please edit the following passage to improve its logical flow, eliminate any typographical errors. Be sure to maintain the original meaning of the text. The entire conversation and instructions should be provided in Chinese. Please begin by editing the following text: [语音文字输入].
```

最后的效果：

![IMG-26E3E06BA410A4A583D67874EFA2F307](<https://s2.loli.net/2025/03/20/YfNprhouvmqGgwB.png>)  
