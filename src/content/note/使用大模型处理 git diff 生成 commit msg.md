---
toAstro: true
astroType: null
published: true
toWexin: null
toJuejin: null
toZhihu: null
description: 使用大模型处理 `git diff` 生成 commit msg 的流程
date: 2025-03-03T00:00:00.000Z
tags:
  - 大模型
  - cherrystudio
  - Git
category: git
slug: use-llm-to-generate-commit-message-from-git-diff
date_created: 20250228
date_modified: 20250303
title: 使用大模型处理 git diff 生成 commit msg
author: KazooTTT
finished: true
---

使用大模型处理 `git diff` 生成 commit msg 的流程如下：

1. **获取 git diff 信息：**
	* 可以使用 `git diff > git.diff` 将 diff 信息写入文件。
	* 可以使用 `git diff | clip` (Windows) 将 diff 信息复制到剪贴板。
2. **准备提示词：**
	* 提示词需要包含 commit 规则 [^1]。例子如下：

	```
	用户会输入git diff，请你生成commit msg，可以根据更改内容生成一些备注
	
	我的commit规则：
	module.exports = {
		rules: {
			'type-enum': [
				2,
				'always',
				[
					'feat', // 新功能
					'fix', // 修复
					'docs', // 文档变更
					'style', // 代码格式
					'refactor', // 重构
					'perf', // 性能优化
					'test', // 增加测试
					'chore', // 构建过程或辅助工具的变动
					'revert', // 回退
					'build', // 打包
				],
			],
			'type-case': [2, 'always', 'lower-case'],
			'type-empty': [2, 'never'],
			'scope-empty': [0],
			'scope-case': [0],
			'subject-full-stop': [0],
			'subject-case': [0],
			'header-max-length': [0],
		},
	};
	```

3. **发送给大模型：** 将 `git diff` 信息和提示词一起发送给大模型，获取 commit msg。
4. **使用 Cherry Studio (可选):**
	* 可以使用 Cherry Studio 创建 commit msg 生成助手

![IMG-BF22CA923126747336FA047AD2FFE0B3](/mdImages/IMG-BF22CA923126747336FA047AD2FFE0B3.png)  
具体效果 

![IMG-42E5510D67C42284041E3402E4D459AD](/mdImages/IMG-42E5510D67C42284041E3402E4D459AD.png)
