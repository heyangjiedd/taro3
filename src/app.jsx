import React, { Component } from 'react'
import Taro from "@tarojs/taro"
import { Provider } from 'react-redux'
import 'taro-ui/dist/style/index.scss'
import { setInfo } from "@/actions/global";
import configStore from './store'
import './app.scss'

const store = configStore()

class App extends Component {
  componentDidMount () {
    Taro.getSystemInfo({success:res => {
      if(res.system.indexOf('iOS') > -1){
        // Android导航栏高度 = 32px + 8px * 2 = 48px
        // iOS导航栏高度 = 32px + 6px * 2 = 44px
        res.navBarHeight = res.statusBarHeight + 44;
      }else{
        res.navBarHeight = res.statusBarHeight + 48;
      }
      store.dispatch({ ...setInfo(), text: res });
    }
    })
  }
  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
