import {saveLastUserMessage, saveNewMessageReducer} from './messager';
import webSocketReducer from "./websocket";
import loggedReducer from './logged';
import notificationReducer from './notification';
import windowVisibilityReducer from './windowVisibility';
import joinedReducer from "./join";
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  saveMessages: saveNewMessageReducer,
  logged: loggedReducer,
  lastUserMessage: saveLastUserMessage,
  isSocketError: webSocketReducer,
  enableNotification: notificationReducer,
  isWindowVisible: windowVisibilityReducer,
  joined: joinedReducer,
});

export default allReducers;