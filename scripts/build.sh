#!/bin/sh

pnpm --filter=@lowcodecloud/lowcode-vue-in-react-renderer build
pnpm --filter=@lowcodecloud/lowcode-vue-in-react-renderer build:umd

pnpm --filter=@lowcodecloud/lowcode-vue-in-react-simulator-renderer build
pnpm --filter=@lowcodecloud/lowcode-vue-in-react-simulator-renderer build:umd

cp -r packages/vue-in-react-simulator-renderer/dist/* examples/lowcode-demo/public/vue-in-react-simulator-renderer
