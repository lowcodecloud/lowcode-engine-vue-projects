# LowCode Engine Vue Projects

## 介绍
 
本项目初衷是让 `lowcode-engine` 能够快速接入 `Vue` 生态。

## 主要实现

> vue-renderer

复用了`react-renderer` 改造原理比较简单,主要涉及: 
- 资产包增加Vue组件识别能力构造具有组件标识的`component` 核心改造 `buildComponents`及资产包描述
- `createElement` 根据组件标识(devStack) 选择 `React` 实现 或 `Vue` 实现

`createElement` Vue 实现，基于 `vuereact-combined`、`veaury`。

由于 `vue2.x`、`vue3.x` 命名空间都是 `Vue` 所以他们不能同时并存。

> vue-simulator-renderer

原理同上

## 快速开始

### 环境准备

- nodejs >= 14
- 安装 pnpm (比较快，而且省磁盘🏅)

### 安装依赖

```bash
pnpm install
```

### 构建

```bash
pnpm build
```

### 启动

默认启动 vue2 demo

```bash
pnpm start
```
