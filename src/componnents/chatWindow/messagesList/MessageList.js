import React, { useEffect } from 'react';
import Message from "./message/Message";

function setMessageDate(messageTime) {
  const dateNow = new Date();
  const dateMessage = new Date(messageTime);

  function DateInfo(date) {
    this.date = date.getDate();
    this.month = date.getMonth();
    this.year = date.getFullYear();
  }

  function isEqualObj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  const nowDateInfo = new DateInfo(dateNow);
  const messageDateInfo = new DateInfo(dateMessage);

  if (isEqualObj(nowDateInfo, messageDateInfo)) {
    return dateMessage.toLocaleTimeString('en-US');
  }
  return dateMessage.toDateString();
}

function scrollMessageToBottom(messaggesNumb) {
  const scrollWrapper = document.querySelector('.chat__window main');
  const chatWindow = document.querySelector('.chat__messages');
  const { paddingTop, paddingBottom } = window.getComputedStyle(chatWindow);
  const paddingTopValue = parseInt(paddingTop, 10);
  const paddingBottomValue = parseInt(paddingBottom, 10);
  const wrapHeight = scrollWrapper.offsetHeight - paddingTopValue - paddingBottomValue;
  const scrollHeight = chatWindow.offsetHeight - wrapHeight;
  const { scrollTop: scrollYPosition } = scrollWrapper;

  if (scrollHeight - scrollYPosition >= 550) {
    return;
  }

  scrollWrapper.scrollBy({
    top: scrollHeight,
    behavior: 'smooth'
  });
}

const MessagesList = ({messages}) => {

  useEffect(()=>{
    scrollMessageToBottom(messages.length);
  });

  return (
    <ul className="chat__messages">
      {
        messages.length > 0 && messages.map((_message, index) => {
          const { message, from, time, id } = _message;
          const stringDate = setMessageDate(time);
          setMessageDate(time);
          return <Message
            key={id + index}
            time={stringDate}
            message={message}
            from={from}
          />
        })
      }
    </ul>
  )
};

export default React.memo(MessagesList);