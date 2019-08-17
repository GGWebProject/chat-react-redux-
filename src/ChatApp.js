import React from "react"
import ChatWindow from "./componnents/chatWindow/ChatWindow";
import Authorization from "./componnents/authorization/Authorization";
import Header from "./componnents/header/Header";
import {useSelector} from "react-redux";
import store from "./redux/store"
import {setNotificationStatus} from "./redux/actions";
import Button from "./componnents/button/Button";

function ChatApp() {
  const isLogin = useSelector( state => state.logged.status);
  const joined = useSelector(state => state.joined);
  createNotification();
  return (
    <>
      <section className={`chat-app__wrapper ${joined ? 'join' : ''}`}>
        <Header/>
        {
          isLogin ?
            <ChatWindow />
            :
            <Authorization />
        }
      </section>
    </>
  )
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