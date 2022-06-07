import { createElement } from 'react';
import { applyVueInReact } from 'vuereact-combined';

import { CreateElementAdapter } from './create-element-adapter';

export class Vue2CreateElementAdapter implements CreateElementAdapter {
  create(component: any, props: any, ...children: any): any {
    return createElement(applyVueInReact(component) as any, props, ...children);
  }
}
