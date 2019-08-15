import React from "react"
import ChatWindow from "./componnents/chatWindow/ChatWindow";
import Authorization from "./componnents/authorization/Authorization";
import Header from "./componnents/header/Header";
import {useSelector} from "react-redux";

function ChatApp() {
  const isLogin = useSelector( state => state.logged.status);
  return (
    <>
      <Header/>
      <div className="chat-app__wrapper">

        {
          isLogin ?
            <ChatWindow />
            :
            <Authorization />
        }
      </div>
    </>
  )
}

export default ChatApp;