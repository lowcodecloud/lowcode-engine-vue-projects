import React, { Component } from 'react';
import { applyVueInReact } from 'vuereact-combined';

class Vue2ReactWrapper extends Component<any, any> {
  render() {
    const { $vueComponent, __events, ...rest } = this.props;
    let VueComponent = applyVueInReact($vueComponent);
    return (<VueComponent {...rest} />);
  }
}

export default Vue2ReactWrapper;
