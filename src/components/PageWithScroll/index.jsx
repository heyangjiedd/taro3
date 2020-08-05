import Taro, { useReady } from '@tarojs/taro';
import React, { useEffect, useState} from 'react';
import { AtDivider, AtActivityIndicator } from 'taro-ui';
import {
  ScrollView,
  View,
  Text
} from '@tarojs/components';
import './index.scss';


export default function PageWithScroll(props){
  const [scrollTopValue] = useState(0),
    [refreshTrigger, setRefreshTrigger] = useState(false),
    [scrollToLower, setScrollToLower] = useState(false),
    [scrollViewDistanceToTop, setScrollViewDistanceToTop] = useState(0),
    {fetchList} = props,
    // 滚动时触发
    onScroll = () => {
      console.log('event');
    },
    // 滚动到底部/右边，会触发 scrolltolower 事件
    onScrollToLower = async () => {
      console.log('__onScrollToLower');
      setScrollToLower(true);
      fetchList().then(()=>{
        setScrollToLower(false);
      });
    },
    // 自定义下拉刷新控件被下拉
    onRefresherPulling = () => {
      console.log('__onRefresherPulling');
    },
    // 自定义下拉刷新被触发
    onRefresherRefresh = () => {
      console.log('__onRefresherRefresh');
      setRefreshTrigger(true);
      fetchList().then(()=>{
        setRefreshTrigger(false);
      });
    },
    // 自定义下拉刷新被复位
    onRefresherRestore = () => {
      console.log('__onRefresherRestore');
    },
    {
      renderList= ()=>{}
    } = props;

  useEffect(()=> {

  });
  useReady(()=>{
    Taro.createSelectorQuery().select('#scroll').boundingClientRect().exec(res=>{
      setScrollViewDistanceToTop(res[0].top);
    });
  });
  return (
    <ScrollView
      id='scroll'
      className='scroll-container'
      scrollY
      scrollWithAnimation
      style={{ 'height': `calc(100vh - ${scrollViewDistanceToTop}px)` }}
      onScrollToLower={onScrollToLower}
      onScroll={onScroll}
      scrollTop={scrollTopValue}
      refresherEnabled
      refresherTriggered={refreshTrigger}
      onRefresherPulling={onRefresherPulling}
      onRefresherRefresh={onRefresherRefresh}
      onRefresherRestore={onRefresherRestore}
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
  );
}
