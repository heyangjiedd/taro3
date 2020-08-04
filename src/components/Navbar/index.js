import React, { Component, } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import './index.scss';

export default connect(({global})=>({systemInfo:global.systemInfo}))(function(props) {
    const {systemInfo,children} = props
    return (<View className='navbar' 
      style={{height:systemInfo.navBarHeight + 'px',paddingTop:systemInfo.statusBarHeight + 'px'}}
    >
        {children}
    </View>)
})