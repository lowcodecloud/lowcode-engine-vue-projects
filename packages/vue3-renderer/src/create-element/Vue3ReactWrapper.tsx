import React, { Component } from 'react';
import { applyVueInReact } from 'veaury';

class Vue3ReactWrapper extends Component<any, any> {
  render() {
    const { $vueComponent, __events, ...rest } = this.props;
    let VueComponent = applyVueInReact($vueComponent);
    return (<VueComponent {...rest} />);
  }
}

export default Vue3ReactWrapper;
