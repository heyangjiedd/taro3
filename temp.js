const fs = require('fs');

const dirName = process.argv[2];

if(!dirName){
  console.log('文件夹名称为空');
  process.exit(0);
}

const indexTemp = `import Taro, { Component } from '@taro/taro';
import { View } from '@taro/taro/components';
import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

export default connect(({${dirName}})=>({...${dirName}}))(
  function(props){
    return <View className='${dirName}-page'>${dirName}</View>;
  }
);`;

const configTemp = `export default {
  'navigationBarTitleText': ''
};`;

const scssTemp = `.${dirName}-page{

}`;

const modelTemp = `import * as ${dirName}Api from './service';

export default {
  'namespace': '${dirName}',
  'state': {

  },

  'effects': {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(${dirName}Api.demo, {});

      if (status === 'ok') {
        yield put({ 'type': 'save',
          'payload': {
            'topData': data
          } });
      }
    }
  },

  'reducers': {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }

};
`;

const serviceTemp = `import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    'url': '路径',
    'method': 'POST',
    data
  });
};
`;

fs.mkdirSync(`./src/pages/${dirName}`);
process.chdir(`./src/pages/${dirName}`);

fs.writeFileSync('index.jsx', indexTemp);
fs.writeFileSync('index.config.js', configTemp);
fs.writeFileSync('index.scss', scssTemp);
fs.writeFileSync('model.js', modelTemp);
fs.writeFileSync('service.js', serviceTemp);

console.log(`模版${dirName}已创建,请手动增加models`);
process.exit(0);
