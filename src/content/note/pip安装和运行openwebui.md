---
toAstro: true
astroType: null
toWexin: null
toJuejin: null
toZhihu: null
published: true
description: null
date: 2025-03-03T00:00:00.000Z
tags:
  - openwebui
  - pip
  - python
  - 大模型
category: null
slug: how-to-install-and-run-openwebui-with-pip
date_created: 20250226
date_modified: 20250303
title: pip安装和运行openwebui
author: KazooTTT
finished: true
---

<!--section: 1-->

运行 openwebui 的时候除了 docker 部署之外，还有一种方法是 pip 部署

[GitHub - open-webui/open-webui: User-friendly AI Interface (Supports Ollama, OpenAI API, ...)](<https://github.com/open-webui/open-webui?tab=readme-ov-file#installation-via-python-pip->)

![IMG-pip运行的时候如何设置环境变量-CDC2BAD93093406D70B0F9A6F01B86BF](/mdImages/IMG-pip运行的时候如何设置环境变量-CDC2BAD93093406D70B0F9A6F01B86BF.png)

<!--section: 1.1-->

## 环境变量缺失无法将“open-webui”项识别为 cmdlet、函数、脚本文件或可运行程序的名称

如果报错:

``` plaintext
open-webui serve
open-webui : 无法将“open-webui”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请
确保路径正确，然后再试一次。
所在位置 行:1 字符: 1
+ open-webui serve
+ ~~~~~~~~~~
    + CategoryInfo          : ObjectNotFound: (open-webui:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

```

这是因为没有将 python 对应的 Scripts 文件夹路径添加到环境变量中

1. 如何查看路径在哪里  
在命令行中运行这一段

``` shell
pip show requests
```

![Pasted image 20250226143342](/mdImages/Pasted image 20250226143342.png)

能够看到这里面的 location, 所以实际的 script 的路径就是这个（site-packges 替换为 Scripts)

``` shell
C:\Users\turbo\AppData\Roaming\Python\Python312\Scripts
```

把这个路径复制一下或者暂存到一个地方，我们需要把它保存在环境变量里面去（一般 windows 出现这个问题比较多，所以只写了对应的教程）

### 如何编辑环境变量

![Pasted image 20250226143542](/mdImages/Pasted image 20250226143542.png)

搜索环境变量，进入编辑窗口

![Pasted image 20250226143633](/mdImages/Pasted image 20250226143633.png)

然后编辑系统变量把刚刚的那段路径添加到里面就可以了

![Pasted image 20250226143746](/mdImages/Pasted image 20250226143746.png)

然后再打开一个命令行运行

```
openwebui serve
```

就不会报找不到了

<!--section: 1.2-->

## 启动后长时间白屏的最终的解决方法  

然后在 [openwebui长时间白屏解决方案#现象描述](/posts/openwebui-long-loading-white-screen-solution#现象描述) 中有提到错误的原因在于当前环境无法连接到 openai。在使用 pip 安装的 packages 的时候，需要设置 ENABLE_OPENAI_API 的环境变量，具体做法如下：

1. 在命令行中设置当前运行的环境变量
在 Linux/macOS 中：  
`ENABLE_OPENAI_API=0 open-webui serve`    

在 Windows PowerShell 中：  
`$env:ENABLE_OPENAI_API=0; open-webui serve`    

在 Windows CMD 中：  
`set ENABLE_OPENAI_API=0 && open-webui serve`  

---  

（题外话）如果你需要从. Env 读取环境变量那么，参考这个格式来写，  
[Using .env Files for Environment Variables in Python Applications - DEV Community](<https://dev.to/jakewitcher/using-env-files-for-environment-variables-in-python-applications-55a1>)
