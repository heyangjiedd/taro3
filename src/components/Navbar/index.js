import React, { memo } from 'react';
import { View } from '@tarojs/components';
import { connect } from 'react-redux';
import './index.scss';

export default connect(({global})=>({global}))(function(props) {
  const {global = {}, children} = props;
  const {systemInfo={}} = global;

  return <View className='navbar'
    style={{'height':systemInfo.navBarHeight + 'px', 'paddingTop':systemInfo.statusBarHeight + 'px'}}
  >
    {children}
  </View>;
});
