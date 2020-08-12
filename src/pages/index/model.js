export default {
  'namespace': 'index',
  'state': {
    'list':[]
  },
  'effects':{
    *getList({ payload }, { call, put }) {
      yield call(()=> new Promise(resolve=>
        setTimeout(()=>{
          resolve();
        }, 1000)
      )
      );
      yield put({
        'type': 'list',
        payload
      });
    }
  },
  'reducers': {
    'list'(state, { payload }) {
      return {...state, 'list':[...payload]};
    }
  }
};