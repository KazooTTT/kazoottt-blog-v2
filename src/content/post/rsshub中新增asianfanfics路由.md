---
toAstro: true
astroType: post
toWexin: null
toJuejin: null
title: rsshub中新增asianfanfics路由
date: 2025-02-21T00:00:00.000Z
author: KazooTTT
tags:
  - 脑洞
  - asianfanfics
  - rss
  - rsshub
description: null
slug: fragmented-notes-2025-02-21-16-38-50
published: true
category: 碎片
date_created: 2025-02-11T15:38:40.000Z
date_modified: 2025-02-21T12:35:43.000Z
---

突然想订阅 #asianfanfics 某个 Tag 或者搜索关键词的更新，打算用 rsshub 来实现，在 follow 中订阅。

举个例子：<https://www.asianfanfics.com/browse/tag/milklove/N>

代表 tag 为 milklove，排序类型为 newest（最近发布）的所有文章

通过查看 devtool 的请求发现，所需数据并非接口而是一个静态网页：

![IMG-803E576335AF5653F8963BE7881E4DD8](/mdImages/IMG-803E576335AF5653F8963BE7881E4DD8.png)

具体的内容：

![IMG-C54B455556952B47DBE32B14D26E5548](/mdImages/IMG-C54B455556952B47DBE32B14D26E5548.png)

示例代码

[[IMG-E759B225225068DF0D09FBD60313AEF3.html]]

手动剔除掉无关的元素之后，剩下的结构为：

![IMG-5ECA04383C3D96B4A767C5A0B3463E19](/mdImages/IMG-5ECA04383C3D96B4A767C5A0B3463E19.png)

观察了一下，获取文章列表就是找到 primary-container 中的所有的.excerpt

现在再来看单个的.excerpt

``` html
<section class="excerpt">
  <div class="clearfix">
    <h1 class="excerpt__title">
      <a href="/story/view/1623986/n-a">《出走信仰》</a>
    </h1>
    <div class="excerpt__meta">
      <div class="excerpt__meta__main">
        <div class="excerpt__meta__name">
          By <a href="/profile/u/DebrisL">DebrisL </a>
          Published
          <time datetime="2025-02-21 06:58:08" class="text--regular">Feb 21, 2025 06:58:08
          </time>
        </div>
        <div class="excerpt__meta__tags">
          Tags &nbsp;<a href='/browse/tag/milklove'>milklove</a>
          &nbsp;
        </div>
        <div class="excerpt__meta__views">
          With
          <span class="text--regular">
            <strong>2</strong>
            subscribers, <strong>1460</strong>
            views, <strong>514</strong>
            words
          </span>
        </div>
        <div class="excerpt__meta__status">
          Status <em class="text--regular">[M]</em>
        </div>
      </div>
    </div>
  </div>
</section>
```

可以从这个 excerpt 中获取到的信息

1. 链接
 excerpt__title a 的 href
2. 标题
 excerpt__title 的 text
3. 作者的 name
 excerpt__meta__name 的 text
4. 发布时间
 excerpt__meta__main time 的 datetime

而一个 rss item 需要的信息，上述内容都可以满足。

``` xml
<item>
 <title>2025-W07</title>
 <link>https://blog.kazoottt.top/posts/2025-W07/</link>
 <guid isPermaLink="true">https://blog.kazoottt.top/posts/2025-W07/</guid>
 <pubDate>Sun, 16 Feb 2025 00:00:00 GMT</pubDate>
 <content:encoded> </content:encoded>
 <category>周报</category>
 <author>KazooTTT</author>
</item>
```

观察和调研结束，我们开始用 rsshub 来实现。

## 实现步骤

pr 地址 [feat(route): add asianfanfics route #18430](<https://github.com/DIYgod/RSSHub/pull/18430>)

rsshub 官方有很详细的新建路由文档 [Quick Start \| RSSHub](<https://docs.rsshub.app/joinus/>)

我要创建的路由有两个

1. 某个 Tag 的更新
2. 搜索关键词的更新

所以创建， lib\routes\asianfanfics 文件夹，和三个文件

- lib\routes\asianfanfics\namespace.ts
- lib\routes\asianfanfics\tag.ts
- lib\routes\asianfanfics\text-search.ts

tag 和 text-search 的分别根据上面的分析进行实现即可。代码很简单所以不做过多的介绍。

分享其他内容：

踩坑：使用 got 和 ofetch 的时候，都遇到了网站的反爬机制，报 403 forbidden。所以改为了 pptr。但是具体是为什么，缺了 agent 还是什么，暂时没有去研究，这个后面有时间会再研究一下。

类型：

- L: Latest 最近更新
- N: Newest 最近发布
- O: Oldest 最早发布
- C: Completed 已完成
- OS: One Shots 短篇

这里学到了 latest 和 newest 的区别，latest 是按照发布时间排序，newest 是按照更新时间排序。

如何发现的，激活 latest 筛选的时候，item 重点显示的是 updated

![IMG-EAB6D9A347C7926AB395DC9F5D27F42A](/mdImages/IMG-EAB6D9A347C7926AB395DC9F5D27F42A.png)

激活 newest 筛选的时候，item 重点显示的是 published

![IMG-42AE74197F09A21FA3B3182045DE5126](/mdImages/IMG-42AE74197F09A21FA3B3182045DE5126.png)
