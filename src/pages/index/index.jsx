import React, { Component,  useState,forwardRef , useEffect , useCallback } from "react";
import Taro, {Events} from "@tarojs/taro"
import { connect, } from "react-redux";
import { View, Button, Text, } from "@tarojs/components";
import { AtButton,  AtTabs, AtTabsPane,AtList, AtListItem,AtNavBar } from "taro-ui";
import { add, minus, asyncAdd, } from "@/actions/counter";
import Navbar from '@/components/Navbar'
import PageWithScroll from '@/components/PageWithScroll'
import "./index.scss";




const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
// const events = new Events();
export default connect(
    ({ counter, global}) => ({
        counter,systemInfo:global.systemInfo
    }),
    (dispatch,) => ({
        add() {
            dispatch(add(),);
        },
        dec() {
            dispatch(minus(),);
        },
        asyncAdd() {
            dispatch(asyncAdd(),);
        },
    }),
)(forwardRef((function Index(props, ref){
  const [current,setCurrent] = useState(0);
  const [list,setList] = useState([1,2,3,4,5,6,7,8,9,0,10,9897,9877]);
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
    useEffect(()=>{
        // events.on('acceptDataFromOpenerPage',res =>{
        //     console.log(res)
        // });
        // return ()=>events.off('acceptDataFromOpenerPage');
    },[]);
    const fetchList = () => {
        return new Promise(resolve=>{
            setList(list.concat(list))
            setTimeout(()=>{
                resolve()
            },2000)
        })
    }
    const { systemInfo } = props;
    return (
        <View className='index' style={{paddingTop: systemInfo.navBarHeight + 'px'}}>
            <Navbar>
                <AtNavBar
                  color='#000'
                  title='导航栏示例'
                  border={false}
                ></AtNavBar>
            </Navbar>
            <AtTabs current={current} tabList={tabList} onClick={setCurrent}>
                {tabList.map((item,index)=>(<AtTabsPane key={index} current={current} index={index} >
                </AtTabsPane>))}
            </AtTabs>
            <PageWithScroll 
              className='list'
              fetchList={fetchList}
              renderList={()=><AtList>{list.map((r,idx) => <AtListItem title='标题文字' arrow='right' key={idx}></AtListItem >)}</AtList>}
            />
        </View>
    );
})));


