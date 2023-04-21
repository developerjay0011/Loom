import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userreducers from "../Redux/reducers/userreducers";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['navigation'] // navigation will not be persisted
  };

const rootReducer = combineReducers({
    user: userreducers,
})

const middleWare = [thunk]
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleWare));
let persistor = persistStore(store);
export {store, persistor};