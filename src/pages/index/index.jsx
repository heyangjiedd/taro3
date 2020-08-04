import React, { Component, } from "react";
import Taro from "@tarojs/taro"
import { connect, } from "react-redux";
import { View, Button, Text, } from "@tarojs/components";
import { AtButton,  AtTabs, AtTabsPane,AtList, AtListItem,AtNavBar } from "taro-ui";
import { add, minus, asyncAdd, } from "@/actions/counter";
import Navbar from '@/components/Navbar'
import "./index.scss";

const tabList = [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }]
@connect(
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
)
class Index extends Component {
    constructor(props){
        super(props)
        this.state = {
            current: 0,
          }
    }

    componentWillUnmount() {

    }

    componentDidShow() {
        // http.get();
        console.log(this.props);
    }
    
    handleClick (value) {
        this.setState({
          current: value
        })
      }
    componentDidHide() {}

    handleGo(){
        Taro.navigateTo({
            url: '../login/index',
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function(data) {
                console.log(data)
              },
            },
            success: function (res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
            }
          })
    }

    render() {
        const { systemInfo } = this.props;
        return (
            <View className='index' style={{paddingTop: systemInfo.navBarHeight + 'px'}}>
                <Navbar>
                    <AtNavBar
                      color='#000'
                      title='导航栏示例'
                      border={false}
                    ></AtNavBar>
                </Navbar>
                <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    {tabList.map((item,index)=>(<AtTabsPane key={index} current={this.state.current} index={index} />))}
                </AtTabs>
                <AtButton onClick={this.handleGo}>去login</AtButton>
                <Button className='add_btn' onClick={this.props.add}>+</Button>
                <Button className='dec_btn' onClick={this.props.dec}>
          -
                </Button>
                <Button className='dec_btn' onClick={this.props.asyncAdd}>
          async
                </Button>
                <View>
                    <Text>{this.props.counter.num}</Text>
                </View>
                <View>
                    <Text>Hello, World</Text>
                </View>
                <AtList>
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' />
                    <AtListItem title='标题文字' note='描述信息' arrow='right' />
                    <AtListItem
                      arrow='right'
                      note='描述信息'
                      title='标题文字标题文字标题文字标题文字标题文字'
                      extraText='详细信息详细信息详细信息详细信息'
                    />
                </AtList>
            </View>
        );
    }
}

export default Index;
