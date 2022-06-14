import { createElement } from 'react';
import { vueRendererExtTypes } from '@lowcodecloud/lowcode-engine-vue-renderer-core';
import Vue3ReactWrapper from './Vue3ReactWrapper';

class Vue3CreateElement implements vueRendererExtTypes.CreateElementAdapter {
  createElement(component: any, props: any, ...children: any): any {
    // TODO 处理 reactWrapper
    let $vueComponent = component;
    let newProps = { $vueComponent, ...props };
    return createElement(Vue3ReactWrapper, newProps, ...children);
  }
}

export default new Vue3CreateElement().createElement;
