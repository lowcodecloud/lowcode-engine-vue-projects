import React, {
  Component,
  PureComponent,
  createElement,
  createContext,
  forwardRef,
  ReactInstance,
  ContextType,
} from 'react';
import ReactDOM from 'react-dom';
import {
  adapter,
  pageRendererFactory,
  componentRendererFactory,
  blockRendererFactory,
  addonRendererFactory,
  tempRendererFactory,
  rendererFactory,
  types,
} from '@alilc/lowcode-renderer-core';
import ConfigProvider from '@alifd/next/lib/config-provider';

import { buildComponents } from './utils';

import * as vueRendererExtTypes from './types';

window.React = React;
(window as any).ReactDom = ReactDOM;

const defaultRuntime = {
  Component,
  PureComponent,
  createContext,
  createElement,
  forwardRef,
  findDOMNode: ReactDOM.findDOMNode,
};
adapter.setRuntime(defaultRuntime);

function setRuntime(runtime: any) {
  adapter.setRuntime({ ...defaultRuntime, ...runtime } as types.IRuntime);
}

const defaultRenderers = {
  PageRenderer: pageRendererFactory(),
  ComponentRenderer: componentRendererFactory(),
  BlockRenderer: blockRendererFactory(),
  AddonRenderer: addonRendererFactory(),
  TempRenderer: tempRendererFactory(),
  DivRenderer: blockRendererFactory(),
};
adapter.setRenderers(defaultRenderers);

function setRenderers(renderers: any) {
  adapter.setRenderers({ ...defaultRenderers, ...renderers } as types.IRendererModules);
}

const defaultConfigProvider = ConfigProvider;
adapter.setConfigProvider(defaultConfigProvider);

function setConfigProvider(configProvide: any) {
  adapter.setConfigProvider(configProvide);
}

function createRendererFactory(): types.IRenderComponent {
  const Renderer = rendererFactory();
  return class ReactRenderer extends Renderer implements Component {
    readonly props: types.IRendererProps;

    context: ContextType<any>;

    setState: (
      state: types.IRendererState,
      callback?: () => void,
    ) => void;

    forceUpdate: (callback?: () => void) => void;

    refs: {
      [key: string]: ReactInstance;
    };

    constructor(props: types.IRendererProps, context: ContextType<any>) {
      super(props, context);
    }

    isValidComponent(obj: any) {
      return obj?.prototype?.isReactComponent || obj?.prototype instanceof Component;
    }
  };
}

export default createRendererFactory;

export { setRuntime, setRenderers, setConfigProvider, buildComponents, types, vueRendererExtTypes };

