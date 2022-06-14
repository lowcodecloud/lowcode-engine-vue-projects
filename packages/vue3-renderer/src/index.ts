import createRendererFactory, { setRuntime, types, buildComponents } from '@lowcodecloud/lowcode-engine-vue-renderer-core';

import createElement from './create-element/adaptive-create-element';

setRuntime({
  createElement,
});

export default createRendererFactory() as types.IRenderComponent;
export { buildComponents, createElement };
