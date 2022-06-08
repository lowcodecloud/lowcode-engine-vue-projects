import { createElement } from 'react';
import { CreateElementAdapter } from './create-element-adapter';
import Vue2ReactWrapper from './Vue2ReactWrapper';

export class Vue2CreateElementAdapter implements CreateElementAdapter {
  create(component: any, props: any, ...children: any): any {
    let $vueComponent = component;
    let newProps = { $vueComponent, ...props };
    return createElement(Vue2ReactWrapper, newProps, ...children);
  }
}
