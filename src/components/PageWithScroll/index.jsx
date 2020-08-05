import Taro, { useReady } from '@tarojs/taro';
import React, { PureComponent, Component , useEffect, useState,useRef , useCallback,useLayoutEffect } from "react";
import { AtDivider,AtActivityIndicator  } from "taro-ui";
import {
  ScrollView,
  View,
  Text,
} from '@tarojs/components';
import './index.scss';


export default function PageWithScroll(props){
  const [scrollTopValue,setScrollTopValue] = useState(0);
  const [refreshTrigger,setRefreshTrigger] = useState(false);
  const [scrollToLower,setScrollToLower] = useState(false);
  const [scrollViewDistanceToTop,setScrollViewDistanceToTop] = useState(0);
  const {fetchList} = props;
  // 滚动时触发
  const __scroll = (event) => {
    console.log('event');
  };
  // 滚动到底部/右边，会触发 scrolltolower 事件
  const __onScrollToLower = async (event) => {
    console.log('__onScrollToLower');
    setScrollToLower(true);
    fetchList().then(()=>{
      setScrollToLower(false);
    });
  };
  // 自定义下拉刷新控件被下拉
  const __onRefresherPulling = (event) => {
    console.log('__onRefresherPulling');
  };
  // 自定义下拉刷新被触发
  const __onRefresherRefresh = async (event) => {
    console.log('__onRefresherRefresh');
    setRefreshTrigger(true);
    fetchList().then(()=>{
      setRefreshTrigger(false);
    })
  };
    // 自定义下拉刷新被复位
  const __onRefresherRestore = (event) => {
    console.log('__onRefresherRestore');
  };
  const {
    renderList= ()=>{},
  } = props;
  useEffect(()=> {
    
  })
  useReady(()=>{
    Taro.createSelectorQuery().select('#scroll').boundingClientRect().exec(res=>{
      setScrollViewDistanceToTop(res[0].top)
    });
  })
  return (
      <ScrollView
        id='scroll'
        className='scroll-container'
        scrollY
        scrollWithAnimation
        style={{ height: `calc(100vh - ${scrollViewDistanceToTop}px)` }}
        onScrollToLower={__onScrollToLower}
        onScroll={__scroll}
        scrollTop={scrollTopValue}
        refresherEnabled
        refresherTriggered={refreshTrigger}
        onRefresherPulling={__onRefresherPulling}
        onRefresherRefresh={__onRefresherRefresh}
        onRefresherRestore={__onRefresherRestore}
      >
        <View className='scroll-list'>
          {renderList()}
          <AtDivider height={80}>
            {scrollToLower ? <AtActivityIndicator content='加载中'></AtActivityIndicator> : 
            <Text>没有更多了</Text>}
          </AtDivider>
          {/* <View className='scroll-list-bottom'>
            {
              isLoading
              ? bottomLoadText
              : isLoaded
              ? bottomLoadedText
              : bottomStaticText
            }
          </View> */}
      </View>
      </ScrollView>
  )
}
