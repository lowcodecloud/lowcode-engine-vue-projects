import { ComponentType, FunctionComponent } from 'react';
import { ComponentSchema } from '@alilc/lowcode-types';
import { accessLibrary, isESModule, acceptsRef, wrapReactClass } from '@alilc/lowcode-utils';
import { isReactComponent } from './is-react';
import { LibraryPackageMapping, NpmInfo, DevStack } from '../types';

export type Component = ComponentType<any> | object;

export function findComponent(libraryMap: LibraryPackageMapping, componentName: string, npm?: NpmInfo) {
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
    (component as any).$$devStack = npm.devStack;
  }
  return component;
}

export function buildComponents(libraryMap: LibraryPackageMapping,
                                componentsMap: { [componentName: string]: NpmInfo | ComponentType<any> | ComponentSchema },
                                createComponent: (schema: ComponentSchema) => Component | null) {
  const components: any = {};
  Object.keys(componentsMap).forEach((componentName) => {
    let component = componentsMap[componentName];
    let devStack = component ? (component as NpmInfo).devStack : undefined;
    if (component && (component as ComponentSchema).componentName === 'Component') {
      components[componentName] = createComponent(component as ComponentSchema);
    } else if (devStack === 'vue' || devStack === 'vue2' || devStack === 'vue3') {
      // @ts-ignore
      component = findComponent(libraryMap, componentName, component);
      (component as any).$$devStack = DevStack.Vue;
      components[componentName] = component;
    } else if (devStack === 'react' || isReactComponent(component)) {
      if (!acceptsRef(component)) {
        component = wrapReactClass(component as FunctionComponent);
      }
      (component as any).$$devStack = DevStack.React;
      components[componentName] = component;
    } else {
      // @ts-ignore
      component = findComponent(libraryMap, componentName, component);
      if (component) {
        if (!acceptsRef(component)) {
          component = wrapReactClass(component as FunctionComponent);
        }
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
      component.$$devStack = originLibrary.$$devStack;
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
    library.$$devStack = originLibrary.$$devStack;
    i++;
  }
  return component;
}
