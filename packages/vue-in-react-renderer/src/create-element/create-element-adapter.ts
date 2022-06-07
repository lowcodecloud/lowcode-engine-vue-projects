import { createElement } from 'react';
import { ComponentStack } from '../types/core';
import { Vue2CreateElementAdapter } from './vue2-create-element-adapter';

export interface CreateElementAdapter {
  create(component: any, props: any, ...children: any): any;
}

export function createElementAdapter(component: any, props: any, ...children: any) {
  if (!component) {
    return createElement(component, props, ...children);
  }
  let { $$stack } = component;

  if ($$stack === undefined) {
    return createElement(component, props, ...children);
  }
  switch ($$stack as ComponentStack) {
    case ComponentStack.React:
      return createElement(component, props, ...children);
    case ComponentStack.Vue:
      return new Vue2CreateElementAdapter().create(component, props, ...children);
    case ComponentStack.Vue2:
      return new Vue2CreateElementAdapter().create(component, props, ...children);
    default:
      return createElement(component, props, ...children);
  }
}
