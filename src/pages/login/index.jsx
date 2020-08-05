import React, { useState } from "react";
import Taro,{ Events } from "@tarojs/taro"
import { View, Button, Text, } from "@tarojs/components";

import "./index.scss";


// const events = new Events();
export default function() {
    let index = 0;
    //上个页面通信
    // const pages =Taro.getCurrentPages();
    // const current = pages[pages.length - 1];
    // const eventChannel = current.getOpenerEventChannel();
    // eventChannel.on('acceptDataFromOpenerPage',res =>{
    //     console.log('eventChannel',res)
    // });
    // eventChannel.emit('acceptDataFromOpenedPage',1234)
    //全局通信

    const emit = () => {
        // events.trigger('acceptDataFromOpenerPage',123);
        index++;
        Taro.setTabBarBadge({
            index:1,
            text: index.toString()
        })
    }
    return (
            <View>
                <Text onClick={emit}>Hello, World</Text>
            </View>
    );
}
