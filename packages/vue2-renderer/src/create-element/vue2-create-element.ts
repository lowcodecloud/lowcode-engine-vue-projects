import { createElement } from 'react';
import { vueRendererExtTypes } from '@lowcodecloud/lowcode-engine-vue-renderer-core';
import Vue2ReactWrapper from './Vue2ReactWrapper';

class Vue2CreateElement implements vueRendererExtTypes.CreateElementAdapter {
  createElement(component: any, props: any, ...children: any): any {
    // TODO 处理 reactWrapper
    let $vueComponent = component;
    let newProps = { $vueComponent, ...props };
    return createElement(Vue2ReactWrapper, newProps, ...children);
  }
}

export default new Vue2CreateElement().createElement;
