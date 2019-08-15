import {saveLastUserMessage, saveNewMessageReducer} from './Messager';
import socketErrorReducer from "./websocket";
import loggedReducer from './logged';
import {combineReducers} from 'redux'

const allReducers = combineReducers({
  saveMessages: saveNewMessageReducer,
  logged: loggedReducer,
  lastUserMessage: saveLastUserMessage,
  isSocketError: socketErrorReducer,
});

export default allReducers;