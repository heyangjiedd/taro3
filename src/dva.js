import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

let app;

let registered;

const createApp = (opt) => {
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading());
  let store;

  let dispatch;

  if(!registered){
    opt.models.forEach(model=>app.model(model));
    registered = true;
  }
  app.start();
  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err){
      console.log('自定义错误', err);
    }
  });
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  return app;
};

export default {
  createApp,
  getDispatch(){
    return app.dispatch;
  }
};