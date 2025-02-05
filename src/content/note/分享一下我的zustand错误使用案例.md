---
title: 分享一下我的zustand错误使用案例
date: 2024-12-17T00:00:00.000Z
author: KazooTTT
type: Post
status: Published
tags:
  - zustand
  - selector
  - store
  - react-scan
  - 最小粒度原则
finished: true
published: true
category: 
slug: zustand-use-record
description: zustand 是一个状态管理库，简单易用。它可以通过使用 single selector 或 shallow 来获取 state，避免所有组件都重新渲染。当 state 更新时，可以通过 useShallow 来只获取需要的数据。同时，应该遵循最小粒度原则，只获取需要的数据，而不是使用多个 store 去存储不同的 state。另外，与 UI 无关的 state 不需要通过 selector 获取，正确的做法是直接在 handleSave 方法内部访问 store。
toAstro: true
date_created: 2025-01-04T11:44:53+08:00
date_modified: 2025-02-03T19:30:01+08:00
banner: https://pictures.kazoottt.top/2025/02/20250201-og-1738417688145.png
---

## 什么是 zustand？

[zustand](https://github.com/pmndrs/zustand) 是一个状态管理库，简单易用。

在使用 [react-scan](https://react-scan.com/) 的时候，我发现我在 A 组件中对于 store 的某个 state 的更新，导致了 B 组件的重新渲染，有比较严重的性能问题。

于是我又重新阅读了文档，发现我之前对于 zustand 的使用是错误的。

## 错误用法 1 没有使用 single selector 或者 shallow 去获取 state

这是之前的写法以及对应的组件，useGlobalStore 中有不只 uploadToServerProgress, uploadStatus 两个 state。

``` tsx
const ComponentA = () => {
  const { uploadToServerProgress, uploadStatus } = useGlobalStore()
  return (
    <UploadStateContainer
      uploadToServerProgress={uploadToServerProgress}
      uploadStatus={uploadStatus}
    />
  )
}

```

当 uploadToServerProgress 或者 uploadStatus 更新的时候，UploadStateContainer 会重新渲染。（符合预期）

当 useGlobalStore 中的其他 state 更新的时候，UploadStateContainer 也会重新渲染。（不符合预期）

这是因为 `const { uploadToServerProgress, uploadStatus } = useGlobalStore();`

其实是解构赋值的简写，等价于

``` tsx
const globalStore = useGlobalStore()
const { uploadToServerProgress, uploadStatus } = globalStore
```

对于 react 来说，只要 globalStore 更新，就会导致 UploadStateContainer 重新渲染。因此我们需要改为以下写法：

写法 1 single selector

``` ts
const uploadToServerProgress = useGlobalStore(state => state.uploadToServerProgress)
const uploadStatus = useGlobalStore(state => state.uploadStatus)
```

写法 2 使用 useShallow

``` ts
const { uploadToServerProgress, uploadStatus } = useGlobalStore(useShallow(state => ({
  uploadToServerProgress: state.uploadToServerProgress,
  uploadStatus: state.uploadStatus,
})))
```

## 错误用法 2 使用 selector 的时候颗粒度不够

cameraData 是通过订阅其他的服务获取的，内部包含包括相机图像、相机 id 等数据。其中相机图像是高频更新的数据。

``` tsx
import React from 'react';

export interface CameraData {
  cameraBase64: string; // base64 encoded image
  cameraId: number;
}

const CurrentCamera: React.FC = () => {
  const cameraData = useGlobalStore(state => state.cameraData);

  return <CurrentCameraId cameraId={cameraData.cameraId} />;
};
```

如果这样写，虽然这里也是 single selector，但是当 cameraBase64 更新的时候，cameraData 会更新，CurrentCameraId 也会重新渲染。

因此这里还是遵循最小粒度原则，只获取需要的数据。

``` tsx
import React from "react"

export interface CameraData {
  cameraBase64: string // base64 encoded image
  cameraId: number
}

const CurrentCamera: React.FC = () => {
  const cameraId = useGlobalStore((state) => state.cameraData.cameraId)

  return <CurrentCameraId cameraId={cameraId} />
}

```

## 错误用法 3 使用了多个 store 去存储不同的 state，而不是使用 slice 把不同的 state 分组

在官方的文档中 [Flux inspired practice - Zustand](https://zustand.docs.pmnd.rs/guides/flux-inspired-practice) 提到，应该使用单一存储，而不是使用多个 store 去存储不同的 state。

> [!quote]
> Recommended patterns 推荐模式
> 
> Single store 单一存储
> 
> Your applications global state should be located in a single Zustand store.
> 
> 你的应用程序的全局状态应该位于一个单一的 Zustand 存储中。
> 
> If you have a large application, Zustand supports splitting the store into slices.
> 
> 如果你有一个大型应用程序，Zustand 支持将存储拆分为切片。

## 错误用法 4 与 UI 无关的 state 通过 selector 获取

在一个组件中，我有一个 handleSave 的方法，调用接口保存数据。

我之前的写法是，在组件 A 内部，使用 single selector 获取需要的数据，然后调用接口保存数据。

但是这样的写法是错误的。

```tsx
const ComponentA = () => {
  const { state1, state2 } = useGlobalStore(
    useShallow((state) => ({
      state1: state.state1,
      state2: state.state2,
    }))
  )

  const handleSave = () => {
    save(state1, state2)
  }

  return <SaveButton onClick={handleSave} />
}

```

在组件 B 中，我通过操作改变了 state1，但是由于我在 A 中获取了 state1,state1 的变化会导致 A 组件重新渲染。

正确的做法是，直接在 handleSave 方法内部访问 store，而不是通过 selector 将状态传递给它。

```tsx
const ComponentA = () => {
  const handleSave = () => {
    const { state1, state2 } = useGlobalStore.getState()
    save(state1, state2)
  }

  return <SaveButton onClick={handleSave} />
}
```

## 参考

[Zustand](https://zustand-demo.pmnd.rs/)

[master 分支下的 notes/zustand 学习笔记.md --- notes/zustand学习笔记.md at master · puxiao/notes](https://github.com/puxiao/notes/blob/master/zustand%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.md)

[如何有效率地管理 React 局部狀態？ 這次我選擇了 Zustand! | Bosh 的技術探索筆記](https://notes.boshkuo.com/docs/React/zustand#%E7%82%BA%E4%BD%95%E9%81%B8%E6%93%87%E4%BD%BF%E7%94%A8-zustand-)
