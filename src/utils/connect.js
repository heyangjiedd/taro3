import { connect } from 'react-redux';
import models from '../models/index';
import global from '../models/global';
// connect(
//     ({global, index, loading})=>({global, index, 'loading':loading.models.index}),
//     dispatch=>({getList(payload){
//       return dispatch({ 'type': 'index/getList', payload });
//     }}))
export default function(...namespaces){
  const model = models.models.concat(global).filter(item=>namespaces.includes(item.namespace));

  let action = {};

  let state = {};

  model.forEach(item=>{
    state[item.namespace] = item.state;
    action[item.namespace] = {};
    Object.keys({ ...item.effects, ...item.reducers}).forEach(r=>{
      action[item.namespace][r] = `${item.namespace}/${r}`;
    });
  });
  return connect(
    stateAll=>{
      let res = {};

      Object.keys(state).forEach(item=>{
        res[item] = {};
        Object.keys(state[item]).forEach(r=>{
          res[item][r] = stateAll[item][r];
          res[item]['loading'] = stateAll.loading.models[item];
        });
      });
      return {'state':res};
    },
    dispatch=>{
      let res = {};

      Object.keys(action).forEach(item=>{
        res[item] = {};
        Object.keys(action[item]).forEach(r=>{
          res[item][r] = (payload) =>dispatch({ 'type': action[item][r], payload });
        });
      });
      return {'action':res};
    });
}