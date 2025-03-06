---
toAstro: true
astroType: post
published: true
toWexin: true
toJuejin: null
toZhihu: true
description: >-
  本文针对在 VSCode 中运行 TypeScript 文件时遇到的问题，提供了多种解决方案。比较了不同方式的优缺点，特别强调了 bun
  在速度和易用性方面的优势，以及 ts-node 配置的复杂性。同时，文章还指导用户如何配置 Code Runner 扩展，以便更方便地运行
  TypeScript 代码。
date: 20250306
tags:
  - bun
  - code
  - runner
  - ts-node
  - typescript
  - vscode
category: 前端
slug: how-to-run-ts-files
date_created: 20250225
date_modified: 20250306
title: 如何运行 ts 文件
---

![cover](<https://s2.loli.net/2025/03/06/kfu6KdC2m1HoLM9.png>)

在 VSCode 中安装扩展 Code Runner，我创建了一个 .ts 文件，点击运行按钮，但提示

> 'ts-node' 不是内部或外部命令  
> 'ts-node' is not recognized as an internal or external command

解决方法是全局安装 ts-node，例如：

``` shell
pnpm i -g ts-node
```

但在我安装之后，错误确实消失了，却又提示另一个错误

``` log
TypeError: Unknown file extension ".ts" for /xxx/xxx/test.ts
    at Object.getFileProtocolModuleFormat [as file:] (node:internal/modules/esm/get_format:176:9)
    at defaultGetFormat (node:internal/modules/esm/get_format:219:36)
    at defaultLoad (node:internal/modules/esm/load:133:22)
    at async ModuleLoader.load (node:internal/modules/esm/loader:554:7)
    at async ModuleLoader.moduleProvider (node:internal/modules/esm/loader:435:45)
    at async ModuleJob._link (node:internal/modules/esm/module_job:106:19) {
  code: 'ERR_UNKNOWN_FILE_EXTENSION'
}
```

所以我认为或许不止我一个人对于如何运行 ts 文件有疑问，所以本篇文章就来介绍一下如何在 VSCode 中运行 ts 文件，以及回到最初的问题，如何在 code runner 中运行 ts 文件。

## 如何运行 ts 文件

我们准备一个简单的的 ts 文件，命名为 index.ts，来作为测试的文件。

``` typescript
const a: number = 1;  
const b: number = 2;
const c: number = a + b;
console.log(c);
```

### bun 运行 ts 文件（目前最推荐）

``` shell
bun index.ts
```

![alt text](<https://s2.loli.net/2025/03/06/FOLdGi1ST9Wo4wA.png>)

### 使用 tsc 将 ts 编译为 js，然后 node 运行

TypeScript Compiler (tsc) 是 TypeScript 的编译器，它可以将 TypeScript 代码编译为 JavaScript 代码。我们可以使用 tsc 命令来编译 TypeScript 文件。

``` shell
tsc index.ts
node index.js
```

![alt text](<https://s2.loli.net/2025/03/06/eCA2hNItTwjxrG9.png>)

### tsx (TypeScript Executer) 运行 ts 文件

``` shell
npx tsx index.ts
```

![alt text](<https://s2.loli.net/2025/03/06/POMlTqEnaJkbDr8.png>)

### Node.js V22.7.0 直接运行文件

``` shell
node --experimental-strip-types index.ts 
```

![alt text](<https://s2.loli.net/2025/03/06/imBgjLsvEVblytO.png>)

### ts-node 运行 ts 文件（不推荐）

``` shell
ts-node index.ts
```

![alt text](<https://s2.loli.net/2025/03/06/Qm5Rn6jVTSMUGrX.png>)

这个问题频繁出现于 ts-node 的 issues 中，有一个讨论甚至到了 70+ 也没有关闭

![alt text](<https://s2.loli.net/2025/03/06/F9Bx6AgVjbD5GLl.png>)

要解决这里的报错，需要做几件事情：

1. 必须要有 package.json 并且 "type": "module"
	1. 如果没有 package.json, 运行 `npm init -y` 生成 package.json
2. tsconfig.json 中 "module" 不能是 "commonjs" ，必须要有 'module': 'ESNext' 或者 'module': 'ES6'。
	1. 如果没有 tsconfig.json, 运行 `npx tsc --init` 生成 tsconfig.json
3. 运行的时候必须要有 --loader ts-node/esm

``` shell
node --loader ts-node/esm index.ts
```

![alt text](<https://s2.loli.net/2025/03/06/N5IO21BzCTxktA7.png>)

## 如何在 coder runner 中运行 ts 文件

最简单的方法：在 code-runner.executorMap 中修改 typescript 的配置：

``` json
{
  "typescript": "bun $fullFileName"
}
```

也可以这样写，然后会生成一个 js 文件，然后运行 js 文件：

``` json
{
  "typescript": "tsc $fullFileName && node $fileNameWithoutExt.js"
}
```

不过这样的速度是比较慢的

![alt text](<https://s2.loli.net/2025/03/06/59HrEdRhp24iWKw.png>)

- 使用 `bun $fullFileName`：
  耗时：0.295 秒

- 使用 tsc `tsc $fullFileName && node $fileNameWithoutExt.js`：

  耗时：2.523 秒

## 总结

无论是运行 ts 文件还是在 code runner 中运行 ts 文件，最推荐的方式是使用 bun 来运行 ts 文件。它的速度和开箱即用的特性都非常好。

最不推荐的是 ts-node，需要有很严格的配置，且官方没有提供明确的文档来说明如何配置，更多的是靠开源社区的讨论来解决问题。
