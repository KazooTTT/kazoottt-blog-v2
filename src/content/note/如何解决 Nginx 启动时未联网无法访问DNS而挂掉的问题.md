---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
date_created: 20250207
date_modified: 20250304
title: 如何解决 Nginx 启动时未联网无法访问DNS而挂掉的问题
date: 2025-02-08T00:00:00.000Z
author: KazooTTT
tags:
  - 计算机网络
  - dns
  - nginx
finished: true
category: null
slug: nginx-startup-fix-configure-local-hosts-file
description: null
---

假设我们在 Nginx 配置文件中设置了如下的反向代理配置：

```nginx
location / {
    proxy_pass http://example.com;
}
```

开机的时候，在没有网络连接的情况下，Nginx 启动时无法访问 DNS 服务器进行解析 `example.com`，导致 Nginx 启动失败。这种情况下，我们需要一种方法来确保 Nginx 启动时即使无法访问网络，依然可以顺利运行。

## 解决方案：配置 `resolver`

解决这个问题的一个有效方法就是在 Nginx 配置中添加 `resolver` 指定 DNS 服务器，告诉 Nginx 如何解析域名，即使在网络不可用时，Nginx 也能够正常启动。

### `resolver` 指令的作用

`resolver` 指令用于指定一个或多个 DNS 服务器，Nginx 将通过这些服务器解析域名。当 Nginx 需要解析代理服务器的域名时，它会使用配置中的 DNS 服务器，而不是依赖系统默认的 DNS 配置。

### 如何配置

假设我们要配置的反向代理目标是 `example.com` ,在 Nginx 配置文件中，我们可以添加如下内容：

```nginx
http {
  resolver 223.5.5.5 223.6.6.6 valid=30s;

  server {
      listen 80;

      location / {
          set $backend "http://example.com";
          proxy_pass $backend;
      }
  }
}
```

> proxy_pass 后面接域名时候会 DNS 缓存，导致这个域名背后的机器负载不均衡，官方推荐的是使用变量解决 [^1]

在上述配置中，`resolver 223.5.5.5 223.6.6.6 valid=30s;` 指定了一个 DNS 服务器

这意味着 Nginx 在启动时会使用这个 DNS 服务器来解析 `example.com`，即使机器没有网络连接，它也能够通过指定的 DNS 服务器来解析域名。

`valid=30s` 表示 DNS 解析结果的有效期为 30 秒。(具体来说就是 Nginx 会缓存 DNS 解析结果，30 秒内不再请求 DNS 服务器)

## 参考

[nginx中resolver参数配置解释 \|](<https://www.rootop.org/pages/4307.html>)

[Module ngx\_http\_core\_module](<https://nginx.org/en/docs/http/ngx_http_core_module.html#resolver>)

 [89 \| proxy模块中的proxy\_pass指令--极客时间](<https://time.geekbang.org/course/detail/138-75140>)

[^1]: [89 \| proxy模块中的proxy\_pass指令--极客时间](<https://time.geekbang.org/course/detail/138-75140>)
