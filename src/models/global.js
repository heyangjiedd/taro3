export default {
  'namespace': 'global',
  'state': {
    'systemInfo':{}
  },
  'effects':{
  },
  'reducers': {
    'setSystemInfo'(state, { payload }) {
      return {...state, 'systemInfo':{...payload}};
    }
  }
};