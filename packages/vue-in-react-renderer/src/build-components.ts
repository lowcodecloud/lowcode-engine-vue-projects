import { ComponentType, forwardRef, createElement, FunctionComponent } from 'react';
import { ComponentSchema } from '@alilc/lowcode-types';
import { Component } from '@alilc/lowcode-designer';
import { accessLibrary } from '@alilc/lowcode-utils';
import { isESModule } from './utils/is-es-module';
import { isReactComponent, acceptsRef, wrapReactClass } from './utils/is-react';
import { LibraryMap, NpmInfo, ComponentStack } from './types';


export function findComponent(libraryMap: LibraryMap, componentName: string, npm?: NpmInfo) {
  if (!npm) {
    return accessLibrary(componentName);
  }

  // libraryName the key access to global
  // export { exportName } from xxx exportName === global.libraryName.exportName
  // export exportName from xxx   exportName === global.libraryName.default || global.libraryName
  // export { exportName as componentName } from package
  // if exportName == null exportName === componentName;
  // const componentName = exportName.subName, if exportName empty subName donot use
  const exportName = npm.exportName || npm.componentName || componentName;
  const libraryName = libraryMap[npm.package] || exportName;
  const library = accessLibrary(libraryName);
  const paths = npm.exportName && npm.subName ? npm.subName.split('.') : [];
  if (npm.destructuring) {
    paths.unshift(exportName);
  } else if (isESModule(library)) {
    paths.unshift('default');
  }
  let component = getSubComponent(library, paths);
  if (component) {
    (component as any).$$stack = npm.stack;
  }
  return component;
}

export function buildComponents(libraryMap: LibraryMap,
                                componentsMap: { [componentName: string]: NpmInfo | ComponentType<any> | ComponentSchema },
                                createComponent: (schema: ComponentSchema) => Component | null) {
  const components: any = {};
  Object.keys(componentsMap).forEach((componentName) => {
    let component = componentsMap[componentName];
    let stack = component ? (component as NpmInfo).stack : undefined;
    if (component && (component as ComponentSchema).componentName === 'Component') {
      components[componentName] = createComponent(component as ComponentSchema);
    } else if (stack === 'vue' || stack === 'vue2' || stack === 'vue3') {
      // @ts-ignore
      component = findComponent(libraryMap, componentName, component);
      if (stack === 'vue') {
        (component as any).$$stack = ComponentStack.Vue;
      } else if (stack === 'vue2') {
        (component as any).$$stack = ComponentStack.Vue2;
      } else {
        (component as any).$$stack = ComponentStack.Vue3;
      }
      components[componentName] = component;
    } else if (stack === 'react' || isReactComponent(component)) {
      if (!acceptsRef(component)) {
        component = wrapReactClass(component as FunctionComponent);
      }
      (component as any).$$stack = 'react';
      components[componentName] = component;
    } else {
      // @ts-ignore
      component = findComponent(libraryMap, componentName, component);
      if (component) {
        if (!acceptsRef(component)) {
          component = wrapReactClass(component as FunctionComponent);
        }
        (component as any).$$stack = 'react';
        components[componentName] = component;
      }
    }
  });
  return components;
}

export function getSubComponent(library: any, paths: string[]) {
  const l = paths.length;
  if (l < 1 || !library) {
    return library;
  }
  let originLibrary = library;
  let i = 0;
  let component: any;
  while (i < l) {
    const key = paths[i]!;
    let ex: any;
    try {
      component = library[key];
      component.$$stack = originLibrary.$$stack;
    } catch (e) {
      ex = e;
      component = null;
    }
    if (i === 0 && component == null && key === 'default') {
      if (ex) {
        return l === 1 ? library : null;
      }
      component = library;
    } else if (component == null) {
      return null;
    }
    library = component;
    library.$$stack = originLibrary.$$stack;
    i++;
  }
  return component;
}
