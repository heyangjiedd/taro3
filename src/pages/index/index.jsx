import React, { Component, useState, forwardRef, useEffect, useCallback } from 'react';
import Taro, {Events} from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane, AtList, AtListItem, AtNavBar } from 'taro-ui';
import Navbar from '@/components/Navbar';
import PageWithScroll from '@/components/PageWithScroll';
import connect from '@/utils/connect';
import './index.scss';

const tabList = [{ 'title': '标签页1' }, { 'title': '标签页2' }, { 'title': '标签页3' }];
const initList = [1, 2, 3, 4, 5];
// const events = new Events();

export default connect('index', 'login', 'global')(forwardRef(function Index(props, ref){
  const {getList} = props.action.index;
  const {loading, list} = props.state.index;

  console.log(loading, list);
  const [current, setCurrent] = useState(0),
    // const handleGo = ()=>{
    //   Taro.navigateTo({
    //     url: '../login/index',
    //     events: {
    //       // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //       acceptDataFromOpenedPage: function(data) {
    //         console.log(data)
    //       },
    //     },
    //     success: function (res) {
    //       // 通过eventChannel向被打开页面传送数据
    //       res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    //     }
    //   })
    // }

    fetchList = useCallback(() => {
      return new Promise(resolve=>{
        setTimeout(()=>{
          getList(initList.concat(initList));
          resolve();
        }, 1000);
      });
    }),
    { systemInfo = {} } = props.state.global;

  useEffect(()=>{
    fetchList();
    // events.on('acceptDataFromOpenerPage',res =>{
    //     console.log(res)
    // });
    // return ()=>events.off('acceptDataFromOpenerPage');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View className='index' style={{'paddingTop': systemInfo.navBarHeight + 'px'}}>
      <Navbar>
        <AtNavBar
          color='#000'
          title='导航栏示例'
          border={false}
        ></AtNavBar>
      </Navbar>
      <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
        {tabList.map((item, index)=><AtTabsPane key={index} current={current} index={index} >
        </AtTabsPane>)}
      </AtTabs>
      <PageWithScroll
        className='list'
        fetchList={fetchList}
        renderList={()=><AtList>{list.map((r, idx) => <AtListItem title={`标题${r}`} arrow='right' key={idx}></AtListItem >)}</AtList>}
      />
    </View>
  );
}));


