import React from "react";
import Form from "../form/Form";
import MessagesList from "./messagesList/MessageList";
import {useSelector, useDispatch} from "react-redux";
import SocketErrorWindow from "./socketErrorWindow/SocketErrorWindow";
import {logOut} from "../../redux/actions";
import Button from "../button/Button";

function toggleChatOptions(e) {
  const { currentTarget: target } = e;
  const options = target.closest('.chat__options');
  options.classList.toggle('open');
}

const ChatWindow = () => {
  const savedMessages = useSelector(state => state.saveMessages.messages);
  const isSocketError = useSelector(state => state.isSocketError);
  const logged = useSelector(state => state.logged);
  const dispatch = useDispatch();
  return (
    <section className="chat__window">
      {
        isSocketError && <SocketErrorWindow/>
      }
      <header className="chat__header">
        <h2 className="visually-hidden">Chat</h2>
      </header>
      <main role="main">
        <MessagesList messages={savedMessages}/>
      </main>
      <hr/>
      <footer className="chat__footer">
        <div className="chat__options">
          <Button type="chatOptions" handleClick={(e) => toggleChatOptions(e)}>
            <div className="wrap">
              <div className="line line_1"></div>
              <div className="line line_2"></div>
              <div className="line line_3"></div>
            </div>
          </Button>
          <span className="chat__options__user-name">User name: <b>{logged.userName}</b></span>
          <Button type="logout" handleClick={() => dispatch(logOut())}>Sign out</Button>
        </div>
        {/*send message form*/}
        <Form/>
      </footer>
    </section>
  )
};

export default React.memo(ChatWindow);