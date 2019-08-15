import React from 'react';
import Message from "./message/Message";

const MessagesList = ({messages}) => {

  return (
    <ul className="chat__messages">
      {
        messages.length > 0 && messages.map((_message, index) => {
          const { message, from, time, id } = _message;
          const stringDate = new Date(time).toDateString();
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