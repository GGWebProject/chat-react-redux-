import React from "react";

const Button = (props) => {
  const { type } = props;
  const btnProps = {
    btnClassName: "",
    type: '',
  };

  switch (type) {
    case "login":
      btnProps.className = 'login';
      btnProps.type = 'submit';
      break;
    case "logout":
      btnProps.className = 'logout';
      break;
    case "send":
      btnProps.className = 'send';
      btnProps.type = 'submit';
      break;
    case "chatOptions":
      btnProps.className = 'chat-options';
      break;
    default: 
      break;
  }
  return (
    <button
      type={btnProps.type}
      className={`btn ${btnProps.className ? 'btn_' + btnProps.className : ''}`}
      onClick={props.handleClick}
    >
      {props.children}
    </button>
  )
};

export default Button;