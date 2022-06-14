/**
 * 组件开发技术栈
 */
export enum DevStack {
  React = 'react',
  Vue = 'vue',
  Vue2 = 'vue2',
  Vue3 = 'vue3',
  Mp = 'mp'
}

/**
 * Library -> Package 关系映射
 */
export interface LibraryPackageMapping {
  [key: string]: string;
}

/**
 * npm 源引入完整描述对象
 */
export interface NpmInfo {
  /**
   * 源码组件名称
   */
  componentName?: string;
  /**
   * 源码组件库名
   */
  package: string;
  /**
   * 源码组件版本号
   */
  version?: string;
  /**
   * 是否解构
   */
  destructuring?: boolean;
  /**
   * 源码组件名称
   */
  exportName?: string;
  /**
   * 子组件名
   */
  subName?: string;
  /**
   * 组件路径
   */
  main?: string;

  /**
   * 组件技术栈
   */
  devStack?: DevStack | string | undefined;
}
