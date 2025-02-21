---
toAstro: true
astroType: post
toWexin: true
toJuejin: false
author: KazooTTT
category: 碎片
date: 2025-02-20T00:00:00.000Z
date_created: 2025-02-11T15:38:40.000Z
date_modified: 2025-02-21T14:00:31.000Z
description: null
published: true
slug: openwebui-long-loading-white-screen-solution
tags:
  - docker
  - ollama
  - openwebui
  - 碎片
title: openwebui长时间白屏解决方案
---

![IMG-CAC1EEA1E39685627A82ED14C5001F20](/mdImages/IMG-CAC1EEA1E39685627A82ED14C5001F20.png)

#ollama #openwebui #docker

最近 deepseek 的大火，官方服务响应缓慢或者宕机，再加上其他云平台厂商也开始免费提供 deepseek 的模型服务，赠送一定额度的 tokens 供用户使用。用户自己接入 api 再次成为了一个热门的使用场景，web 端的 lobe chat、openwebui 都是不错的选择。

本篇文章主要用于记录 [open-webui](<https://github.com/open-webui/open-webui>) 的长时间白屏的原因和具体的解决方案。

## 现象描述

我在 nas 和 macos 上都通过 docker 部署了 open-webui 的服务。

macos 上访问无异常，nas 上登录后会白屏一段时间后才显示对话界面，观察到是一个现象是 `/api/models` 这个接口响应速度很慢

![IMG-DEAEF41B70E00D753CD9E7E2FE6AAF3C](<https://pictures.kazoottt.top/2025/02/20250221-IMG-DEAEF41B70E00D753CD9E7E2FE6AAF3C.jpg>)

搜索关键词后发现有人遇到了一样的问题

[SSLCertVerificationError when adding HTTPS openai api url](<https://github.com/open-webui/open-webui/discussions/3702?continueFlag=46552421a3aff8d4ecb9d5f2841ef485>)

问题中提到无法访问 `api.openai.com`

![IMG-5F83BC41FC57FAD259E87E280FE00FF0](<https://pictures.kazoottt.top/2025/02/20250221-IMG-5F83BC41FC57FAD259E87E280FE00FF0.jpg>)

这是因为在 open-webui 网页加载的时候，会从配置中读取各个接入的服务的配置，然后返回用户可以选择的额模型列表。

而在我们没有做任何配置的情况下，openai 的服务是默认接入的，所以会去查询 openai 的服务哪些可以用，但是因为网络无法访问，所以会一直等待，直到超时。

注意：此问题与模型服务提供商无关，是 OpenWebUI 默认配置导致的前端阻塞。

## 解决方案

所以当在某些不具备访问 openai 接口的环境下，要避免长时间白屏直到/api/models 超时才显示对话界面，解决方法如下：  

### 第一种: 在设置中关闭 openai 的接入勾选

1. 右上角点击头像，点击设置菜单 p3  
  ![IMG-08A71B3CE5F6749EC5A310AE2807A0CF](<https://pictures.kazoottt.top/2025/02/20250221-IMG-08A71B3CE5F6749EC5A310AE2807A0CF.jpg>)
2. 点击管理员设置，跳转至管理员设置页面 p4  
  ![IMG-5C87DCCA7434D6913A727FC5F3D4A18A](<https://pictures.kazoottt.top/2025/02/20250221-IMG-5C87DCCA7434D6913A727FC5F3D4A18A.jpg>)
3. 点击外部连接 - 取消 openai 的勾选，点击右下角的保存（一定要记得点保存）
  ![IMG-CED4BB374BFAB7E40D425A1822603C25](<https://pictures.kazoottt.top/2025/02/20250221-IMG-CED4BB374BFAB7E40D425A1822603C25.jpg>)

### 第二种：启动之前设置环境变量 ENABLE_OPENAI_API=0

[enh: speedup open\_webui.main.get\_all\_models()](<https://github.com/open-webui/open-webui/discussions/7769>)

![IMG-B5850B37C58BB64070CFFF56871C61F8](<https://pictures.kazoottt.top/2025/02/20250221-IMG-B5850B37C58BB64070CFFF56871C61F8.jpg>)

举个例子：

``` bash
docker run -d \
  --name openwebui \
  -e ENABLE_OPENAI_API=0 \  # 启动的时候配置环境变量
  -p 3000:8080 \
  --volume openwebui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
```

---

另外我去翻了一下源代码，这里的意思是：

![IMG-D5F37B7896723B2F83BFF77527127033](<https://pictures.kazoottt.top/2025/02/20250221-IMG-D5F37B7896723B2F83BFF77527127033.png>)

- 如果环境变量 ENABLE_OPENAI_API 没有被设置过，那么默认为 true，也就是启用
- 如果有被设置过，会把 ENABLE_OPENAI_API 转化为全小写的单词与 true 进行比较
所以也就是说如果要设置环境变量以达到禁用 ENABLE_OPENAI_API 的目的，写法是：设置一个值，且这个值被转化为小写之后不能是 true。

所以：

- 满足要求：false,0
- 不满足要求：true,True,tRue

---

## 总结

若需使用 OpenAI 服务，请确保服务器具备国际网络访问能力，否则请按照上述解决方案禁用 openai 的接入。
