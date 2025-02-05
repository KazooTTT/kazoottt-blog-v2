---
title: how to generate the path like router config in vite + react + react-router project
date: 2025-01-14
author: KazooTTT
type: Post
status: Published
tags:
  - react
  - vite
  - react-router
  - vite-plugin-pages
finished: true
published: true
category: frontend
slug: how-to-generate-the-path-like-router-config-in-vite-react-react-router-project
description: 
toAstro: true
date_created: 2025-01-14T17:31:35+08:00
date_modified: 2025-01-22T13:39:19+08:00
---

when i use react-router and vite, i want to config my router in the router.config.ts file and also generate some config for the target path dir. (like the nextjs router which is automatically generated based on the file structure)

config the router in the router.config.ts file is easy, but how to generate the path like router config for the target path dir? and combine the self config and automatically generated config together, finally use it in the react router?

we can split the problem into these parts:

1. generate the path like router config for the target path dir
2. combine the self config and automatically generated config together
3. use it in the react router

## 1. generate the path like router config for the target path dir

there is one package called [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages), which can help us generate the path like router config for the target path dir.

how to use it?

step 1. in the vite + react + react-router project, install the `vite-plugin-pages` package.

``` shell
pnpm install vite-plugin-pages --save-dev
```

step 2. add the `vite-plugin-pages` plugin in the vite config file.

``` ts
import Pages from "vite-plugin-pages";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // ...
    Pages({
      dirs: 'src/views',
    })
    // ...
  ],
});
```

the default dirs of the `vite-plugin-pages` plugin is `src/pages`, you can change it by the `dir` option.

we set it to `src/views` in the example.

![api docs](https://pictures.kazoottt.top/2025/01/20250114-58239a4616583a9f4659dcfb8dd5dba8.png)

it has some other options, you can see the [official docs](https://github.com/hannoeru/vite-plugin-pages).

step 3. get the path like router config for the target path dir.

``` tsx
import routes from "~react-pages";

function App() {
  const routeElements = useRoutes(routes);
  return (
    <MainLayout>{routeElements}</MainLayout>
  );
}
```

then we can view the target path which is related to the target path dir.

step 4. (optional) generate the sidebar to show the levels of the path.

``` tsx
import { useState } from "react";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import routes from "~react-pages";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const renderMenuItem = (route: RouteObject) => {
    const isActive = location.pathname === "/" + route.path;

    return (
      <div
        key={route.path}
        onClick={() => {
          if (route.path) {
            navigate(route.path);
          }
        }}
        className={`p-2 cursor-pointer ${
          isActive ? "bg-blue-100 text-blue-600" : "bg-transparent text-black"
        } transition-all duration-300`}
      >
        {route.path}
      </div>
    );
  };

  return (
    <div
      className={`flex flex-col ${
        isCollapsed ? "w-12" : "w-52"
      } h-full bg-white border-r border-gray-200 transition-width duration-300 relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-[-12px] top-5 w-6 h-6 rounded-full border border-gray-200 bg-white cursor-pointer z-10"
      >
        {isCollapsed ? ">" : "<"}
      </button>

      {!isCollapsed && (
        <>
          <div className="py-4 flex-1">{routes.map(renderMenuItem)}</div>
        </>
      )}
    </div>
  );
}

export default Sidebar;
```

## 2. combine the self config and automatically generated config together

since the dirs of the `vite-plugin-pages` plugin is `src/views` (we config it in the step 2), so we can combine the self config and automatically generated config together.

we need to create a dir which is not in the `src/views` dir(such as `src/pages`)

``` tsx
import routes from "~react-pages";
import HomePage from 'src/pages/home/index.tsx';

const pathsRouterConfig = routes
const pathsManualConfig = [
  {
    path: '/home',
    component: <HomePage/>,
  },
]

const finalRouterConfig = [...pathsRouterConfig, ...pathsManualConfig]
```

## 3. use it in the react router

the use way is the same as the react-router

``` tsx
import routes from "~react-pages";

function App() {
  const routeElements = useRoutes(routes);
  return (
    <MainLayout>{routeElements}</MainLayout>
  );
}
```

## summary

this is a simple way to generate the path like router config for the target path dir in the vite + react + react-router project.

if you want to know more about the `vite-plugin-pages` plugin, you can see the [github repo](https://github.com/hannoeru/vite-plugin-pages).
