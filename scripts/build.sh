#!/bin/sh

pnpm --filter=@lowcodecloud/lowcode-engine-vue-renderer-core build

pnpm --filter=@lowcodecloud/lowcode-engine-vue2-renderer build

pnpm --filter=@lowcodecloud/lowcode-engine-vue2-simulator-renderer build
pnpm --filter=@lowcodecloud/lowcode-engine-vue2-simulator-renderer build:umd

cp -r packages/vue2-simulator-renderer/dist/* examples/lowcode-vue2-demo/public/simulator/


pnpm --filter=@lowcodecloud/lowcode-engine-vue3-renderer build

pnpm --filter=@lowcodecloud/lowcode-engine-vue3-simulator-renderer build
pnpm --filter=@lowcodecloud/lowcode-engine-vue3-simulator-renderer build:umd

cp -r packages/vue3-simulator-renderer/dist/* examples/lowcode-vue3-demo/public/simulator/
