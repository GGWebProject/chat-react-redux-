import React from "react";

function Message(props) {
  const { from, message, time } = props;

  return (
    <li className="message">
      <h3 className="visually-hidden">{`Сообщение от пользователя ${from}`}</h3>
      <div className="message__info">
        <span className="message__user">{from}</span>
        <span className="message__time">{time}</span>
      </div>
      <p className="message__text">{message}</p>
    </li>
  )
}

export default Message;