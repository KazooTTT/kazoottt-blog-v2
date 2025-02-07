---
date_created: 2025-02-06T11:59:39+08:00
date_modified: 2025-02-07T11:17:02+08:00
title: Obsidian Web Clipper 离线阅读同人作品
date: 2025-02-06
author: KazooTTT
type: Post
status: Published
tags:
  - "obsidian"
  - "web-clipper"
  - "离线阅读"
  - "同人作品"
finished: false
published: false
category: 软件
slug: obsidian-web-clipper-offline-reading-fanfics
description: 
toAstro: true
astroType: post
---

作为一个经常阅读同人作品的人来说，我使用过许多方法，有使用 raindrop 保存链接的，也有使用 epubkit 把同人作品转换成 epub 格式然后上传到微信读书或者 apple books 上进行阅读的。

不过目前 epubkit 只在电脑端的浏览器上可以进行采集使用，因此对于手机用户来说，使用起来不是很方便。

最近我发现 obsidian web clipper 插件的一个用法：把需要离线阅读或者需要经常阅读的同人作品保存到 obsidian 中。

然后通过 obsidian 手动规划菜单，或者直接使用 obsidian dataview 插件（例如筛选出剪藏文件夹中所有的包含了 你所需要的 tag 的文档），生成一个阅读列表。

具体的 dataview 的写法如下:

![Pasted image 20250206130152](https://pictures.kazoottt.top/2025/02/20250206-Pasted%20image%2020250206130152.png)

阅读列表生成效果如下：

```dataview
table dateformat(published, "yyyyMMdd") as "发布时间"
from "Clippings"
where contains(tags, "替换为你要筛选的标签")
sort published desc    
```

![Pasted image 20250206130132](https://pictures.kazoottt.top/2025/02/20250206-Pasted%20image%2020250206130132.png)

这样就可以很方便的进行后续回顾了。

并且如果你已经实现了 obsidian 的同步，那么你就可以在任何设备上阅读这些内容了。

## 总结

如果你是电脑高频用户，并且不急着在手机上马上进行离线剪藏，那么可以使用 epubkit 把需要阅读的内容转化成 epub 格式，并且进行文档的管理和信息编辑。

如果你是手机高频用户，并且需要马上进行离线剪藏，那么可以使用 obsidian web clipper 插件，把需要阅读的内容保存到 obsidian 中，进行离线阅读。如果后续文档内容变多，有去管理这些文档的需要了，可以使用 dataview 插件，diy 生成阅读列表。
