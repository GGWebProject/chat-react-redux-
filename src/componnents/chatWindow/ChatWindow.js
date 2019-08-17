import React from "react";
import Form from "../form/Form";
import MessagesList from "./messagesList/MessageList";
import {useSelector} from "react-redux";
import SocketErrorWindow from "./socketErrorWindow/SocketErrorWindow";

const ChatWindow = () => {
  const savedMessages = useSelector(state => state.saveMessages.messages);
  const isSocketError = useSelector(state => state.isSocketError);

  return (
    <section className="chat__window">
      {
        isSocketError && <SocketErrorWindow/>
      }
      <div className="wrapper">
        <main role="main">
          <h2 className="visually-hidden">Chat</h2>
          {/*<MessagesList messages={savedMessages}/>*/}
        </main>
        <footer className="chat__footer">
          <Form type="sendMessage"/>
        </footer>
      </div>
    </section>
  )
};

export default React.memo(ChatWindow);