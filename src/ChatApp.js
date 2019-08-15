import React from "react"
import ChatWindow from "./componnents/chatWindow/ChatWindow";
import Authorization from "./componnents/authorization/Authorization";
import Header from "./componnents/header/Header";
import {useSelector} from "react-redux";

function ChatApp() {
  const isLogin = useSelector( state => state.logged.status);
  return (
    <>
      <section className="chat-app__wrapper">
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

export default ChatApp;