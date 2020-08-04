import React, { Component, } from "react";
import Taro,{ Events } from "@tarojs/taro"
import { View, Button, Text, } from "@tarojs/components";

import "./index.scss";

const events = new Events();
class Index extends Component {
    componentDidMount(){
        //上个页面通信
        const pages =Taro.getCurrentPages();
        const current = pages[pages.length - 1];
        const eventChannel = current.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage',res =>{
            console.log('eventChannel',res)
        });
        eventChannel.emit('acceptDataFromOpenedPage',1234)
        //全局通信
        events.on('acceptDataFromOpenerPage',res =>{
            console.log(res)
        });
    }

    componentWillUnmount() {
    }

    componentDidShow() {
    }

    componentDidHide() {}
    emit = () => {
        events.trigger('acceptDataFromOpenerPage',123)
    }
    render() {
        return (
                <View>
                    <Text onClick={this.emit}>Hello, World</Text>
                </View>
        );
    }
}

export default Index;
