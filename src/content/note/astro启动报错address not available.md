---
title: astro启动报错address not available
date: 2024-03-03T00:00:00.000Z
author: KazooTTT
tags:
  - astro
  - ipv6
  - node
toAstro: true
slug: astroaddress-not-available
description: >-
  To resolve the issue with the Astro configuration, modify the
  `astro.config.mjs` file by setting the `server.host` to `0.0.0.0`. This change
  allows the server to accept connections from any IP address, enhancing
  accessibility and functionality of the application. The updated configuration
  includes integrations for MDX, sitemap, and Tailwind, ensuring a robust and
  optimized web development setup.
date_created: 2025-01-04T03:34:08.000Z
date_modified: 2025-02-07T03:25:34.000Z
category: 前端
---

# Astro 启动报错 address not Available

![IMG-E0E27B1E55C89D98FD34F1BF53CD0C65](/mdImages/IMG-E0E27B1E55C89D98FD34F1BF53CD0C65.png)

解决方法：

在 `astro.config.mjs` 修改 server.host 为 `0.0.0.0`

```js
import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: "https://astrofy-template.netlify.app",
  integrations: [mdx(), sitemap(), tailwind()],
  server: {
    host: "0.0.0.0",
  },
})
```
