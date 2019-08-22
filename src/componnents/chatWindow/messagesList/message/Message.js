import React from "react";
import {useSelector} from "react-redux";

function Message(props) {
  const { from, message, time } = props;
  const userName = useSelector(store => store.logged.userName);

  return (
    <li className={`message ${from === userName ? 'message__self' : ''}`}>
      <h3 className="visually-hidden">{`Сообщение от пользователя ${from}`}</h3>
      <div className="message__info">
        <span className="message__user-name">{from}</span>
        <span className="message__time">{time}</span>
      </div>
      <p className="message__text">{message}</p>
    </li>
  )
}

export default Message;