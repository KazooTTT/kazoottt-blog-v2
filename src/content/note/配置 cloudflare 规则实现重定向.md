---
toAstro: true
astroType: null
toWexin: null
toJuejin: null
author: KazooTTT
category: 碎片
date: 2025-02-21T00:00:00.000Z
date_created: 2025-02-11T15:38:40.000Z
date_modified: 2025-02-21T14:22:26.000Z
description: null
published: true
slug: fragmented-notes-2025-02-21-15-44-58
tags:
  - astro
  - cloudflare
  - 重定向
title: 配置 cloudflare 规则实现重定向
---

![IMG-16E2701A71548A6357EB84B23B32A3E2](/mdImages/IMG-16E2701A71548A6357EB84B23B32A3E2.jpeg)

# 博客路由结构对比

| 旧路由结构 | 新路由结构 (Astro) |
|------------|-------------------|
| `/blog/xxx`   | `/posts/xxx`      |
| `/tag/xxx`    | `/tags/xxx`       |
| `/category/xxx` | `/categories/xxx` |

迁移之后可能会有一部分用户从搜索引擎或者之前收藏的链接中访问我的博客，如果不做处理，这些用户访问的页面会返回 404，导致用户体验下降。所以需要实现重定向。

思路有两种

1. 基于部署平台 cloudflare 实现重定向
2. 基于框架 astro 实现重定向

## 基于部署平台 cloudflare 实现重定向

在这里下载好 csv 的模板

[CSV file format to import URL redirects · Cloudflare Rules docs](<https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/>)

对照填写规则 [Redirect visitors to a new page URL · Cloudflare Rules docs](<https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-new-url/>)

根据自身需求填写，我的最终的 csv 如下

``` csv
SOURCE_URL,TARGET_URL,STATUS_CODE,PRESERVE_QUERY_STRING,INCLUDE_SUBDOMAINS,SUBPATH_MATCHING,PRESERVE_PATH_SUFFIX

https://blog.kazoottt.top/category,https://blog.kazoottt.top/categories,301,true,false,true,true

https://blog.kazoottt.top/diary,https://blog.kazoottt.top/notes,301,true,false,true,true

https://blog.kazoottt.top/blog,https://blog.kazoottt.top/posts,301,true,false,true,true

https://blog.kazoottt.top/tag,https://blog.kazoottt.top/tags,301,true,false,true,true
```

然后点击侧边栏的批量重定向，上传 csv，保存，创建批量重定向列表。最后绑定把批量重定向规则绑定对应的列表就可以了。

（也可以点击域名然后再设置规则，总之入口和可配置项有很多，按需选择）

![IMG-9B20E505345B2B2FFAEFCE7463420E90](/mdImages/IMG-9B20E505345B2B2FFAEFCE7463420E90.png)

下图是配置完成的效果

![IMG-8072C6F424C6D27A40E457198B622A5C](/mdImages/IMG-8072C6F424C6D27A40E457198B622A5C.png)

这样我再访问 [https://blog.kazoottt.top/posts/2025-W07/](<https://blog.kazoottt.top/blog/2025-W07/>) 就会被重定向到 `https://blog.kazoottt.top/posts/2025-W07/`

## 通过配置 astro 完成重定向

其实 astro 也可以配置 astro.config.ts 中的 redirect 属性来实现，但是个人用下来觉得它对于动态路由的支持并不好，且文档中没有写的很详细，我通过代码跳转过去才知道支持动态路由的配置。

![IMG-145A60CDEC5C619A9F432DBAA2325AA2-1](/mdImages/IMG-145A60CDEC5C619A9F432DBAA2325AA2-1.png)

配置如下：

``` json
redirects: {
  "/blog/[...slug]": "/posts/[...slug]",
  "/category/[...slug]": "/categories/[...slug]",
  "/diary/[...slug]": "/notes/[...slug]",
  "/tag/[...slug]": "/tags/[...slug]",
 },
```

但是配置后打包开始报错，提示我去写 getStaticPaths 或者配置 `export const prerender = false`

``` log
19:33:08.963 11:33:08 ▶ /category/[...slug]
19:33:08.964 11:33:08 [ERROR] [build] Failed to call getStaticPaths for /category/[...slug]
19:33:09.240 [GetStaticPathsRequired] `getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.
19:33:09.240   Hint:
19:33:09.240     See https://docs.astro.build/en/guides/routing/#dynamic-routes for more information on dynamic routes.
19:33:09.240     
19:33:09.240      If you meant for this route to be server-rendered, set `export const prerender = false;` in the page.
19:33:09.241   Error reference:
19:33:09.241     https://docs.astro.build/en/reference/errors/get-static-paths-required/
19:33:09.241   Location:
19:33:09.241     /category/[...slug]:0:0
19:33:09.241   Stack trace:
19:33:09.241     at validateDynamicRouteModule (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/core/routing/validation.js:19:11)
19:33:09.241     at getPathsForRoute (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/core/build/generate.js:182:31)
19:33:09.241     at async generatePages (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/core/build/generate.js:82:7)
19:33:09.241     at async AstroBuilder.build (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/core/build/index.js:154:5)
19:33:09.241     at async build (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/core/build/index.js:45:3)
19:33:09.241     at async runCommand (file:///opt/buildhome/repo/node_modules/.pnpm/astro@5.2.5_typescript@5.7.3/node_modules/astro/dist/cli/index.js:147:7)
19:33:09.410 Failed: Error while executing user command. Exited with error code: 1
19:33:09.422 Failed: build command exited with code: 1
19:33:10.423 Failed: error occurred while running build command
```

尝试一番后依然报错，然后也没有找到比较明确的解决方法，所以第二种方式暂时被弃用了。后面有时间的时候，会去看 astro 的源代码验证是否支持这样写，以及找到具体的正确写法。
