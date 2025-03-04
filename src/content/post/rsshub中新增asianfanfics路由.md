---
toAstro: true
astroType: post
published: true
toWexin: null
toJuejin: null
toZhihu: null
title: rsshub中新增asianfanfics路由
date: 2025-02-21T00:00:00.000Z
author: KazooTTT
tags:
  - 脑洞
  - asianfanfics
  - rss
  - rsshub
description: >-
  本文讲述了作者利用 RSSHub 实现 Asianfanfics
  特定标签/关键词更新订阅的过程。通过对网站结构的分析，确认了数据的获取方式。在实际操作中，遇到了反爬机制的问题，最终通过使用 ofetch 并手动设置
  User-Agent 解决。作者还分享了遇到的坑和参与开源项目的感想。
slug: fragmented-notes-2025-02-21-16-38-50
category: 碎片
date_created: 20250221
date_modified: 20250304
---

<!--section: 1-->

突然想订阅 #asianfanfics 某个 Tag 或者搜索关键词的更新，打算用 rsshub 来实现，在 follow 中订阅。

<!--section: 2-->

## 结构观察

举个例子：<https://www.asianfanfics.com/browse/tag/milklove/N>

代表 tag 为 milklove，排序类型为 newest（最近发布）的所有文章

通过查看 devtool 的请求发现，所需数据并非接口而是一个静态网页：

![IMG-803E576335AF5653F8963BE7881E4DD8](/mdImages/IMG-803E576335AF5653F8963BE7881E4DD8.png)

具体的内容：

![IMG-C54B455556952B47DBE32B14D26E5548](/mdImages/IMG-C54B455556952B47DBE32B14D26E5548.png)

示例代码

[[IMG-977CB6C832B618287EEC19F1A3F74507.html]]

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

<!--section: 3-->

## 第一版 实现步骤

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

激活 newest 筛选的时候，item 重点显示的是 published

<!--section: 4-->

## 第二版 反思与感想  

在提交了 pr 之后，维护的老师提到不用 pptr 用 ofetch + rsshub ua 的方式也可以实现。  

然后我尝试了一下使用 ofetch，没有做任何的 header 配置，因为我下意识以为会默认使用 ua, 然后依然报 forbidden。这里犯的错误是没有去参考别人的代码，自己尝试几次不行后就停滞了。  

后来在 pr 中咨询了维护的老师，才知道要手动设置 ua  

感想就是自己做事情还是比较粗糙以及参与开源的项目，特别是会审查 pr 和提一定修改意见的，其实对自己会是很大的帮助.  可以多多参与。
