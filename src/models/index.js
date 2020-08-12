import global from './global';
import config from '../app.config';

const models = [];

config.pages.forEach(item=>{
  const path = item.split('/');

  path.pop();
  try{
    models.push(require(`../${path.join('/')}/model`).default);
  }catch(err){
    console.warn(`../${path.join('/')} 缺少model.js文件`);
  }
});
const modelsGlobal = [global, ...models];

export default {
  modelsGlobal,
  models
};