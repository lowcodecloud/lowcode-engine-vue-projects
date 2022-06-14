import { createElement as reactCreateElement } from 'react';

import { vueRendererExtTypes } from '@lowcodecloud/lowcode-engine-vue-renderer-core';

import vue2CreateElement from './vue3-create-element';

class AdaptiveCreateElementAdapter implements vueRendererExtTypes.CreateElementAdapter {
  createElement(component: any, props: any, ...children: any): any {
    if (!component) {
      return reactCreateElement(component, props, ...children);
    }
    let { $$devStack } = component;

    if ($$devStack === undefined) {
      return reactCreateElement(component, props, ...children);
    }

    switch ($$devStack as vueRendererExtTypes.DevStack) {
      case vueRendererExtTypes.DevStack.React:
        return reactCreateElement(component, props, ...children);
      case vueRendererExtTypes.DevStack.Vue:
        if (component.render && typeof component.render.toString === 'function' && !component.render.toString().startsWith('function()')) {
          return reactCreateElement(component, props, ...children);
        }
        return vue2CreateElement(component, props, ...children);
      case vueRendererExtTypes.DevStack.Vue2:
        if (component.render && typeof component.render.toString === 'function' && !component.render.toString().startsWith('function()')) {
          return reactCreateElement(component, props, ...children);
        }
        return vue2CreateElement(component, props, ...children);
      default:
        return reactCreateElement(component, props, ...children);
    }
  }
}

export default new AdaptiveCreateElementAdapter().createElement;
