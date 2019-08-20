import React from "react"
import ChatWindow from "./componnents/chatWindow/ChatWindow";
import Authorization from "./componnents/authorization/Authorization";
import AppHeader from "./componnents/appHeader/AppHeader";
import {useSelector, useDispatch} from "react-redux";
import store from "./redux/store"
import {setNotificationStatus, join} from "./redux/actions";

function ChatApp() {
  const isLogin = useSelector( state => state.logged.status);
  const joined = useSelector(state => state.joined);
  const dispatch = useDispatch();
  createNotification();
  createListenersOnBody({dispatch, join, joined});
  return (
    <>
      <section className={`chat-app__wrapper ${joined ? 'join' : ''} ${isLogin ? 'authorization' : ''}`}>
        <div className="wrapper__scroll">
          <AppHeader/>
          {
            isLogin ?
              <ChatWindow />
              :
              <Authorization />
          }
        </div>
      </section>
    </>
  )
}

function createListenersOnBody(reduserObj) {
  console.log(document.addEventListener('keydown', (e) => {joinToChat(e, reduserObj)}))
}

function joinToChat(e, reduserObj) {
  const { keyCode } = e;
  const { dispatch, join, joined } = reduserObj;
  if (!joined && (keyCode === 13 || keyCode === 27)) {
    dispatch(join());
  }
}

function createNotification() {
  return Notification.requestPermission().then(function(result) {
    if (result === 'granted') {
      store.dispatch(setNotificationStatus(true));
    } else {
      console.log('Очень жаль! Теперь вы не узнаете о новых сообщениях :(')
    }
  });
}

export default ChatApp;