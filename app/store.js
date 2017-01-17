import { createStore } from 'redux';
import reducers from './reducers';

//const persistedState = JSON.parse(localStorage.getItem("redux-state"));
const store = createStore(reducers);//, persistedState);


// store.subscribe(()=>{
//     localStorage.setItem('redux-state', JSON.stringify(store.getState()))
// });

export default store;