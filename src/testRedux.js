import {createStore} from 'redux';

function reducer(state= 0, action){
  return state;
}
let store = createStore(reducer);

store.subscribe(()=>{
  console.log(store.getState());
});
store.dispatch({'type':'1'});