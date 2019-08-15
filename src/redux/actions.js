import { SAVE_MESSAGE, SIGN_IN, SIGN_OUT, SEND_MESSAGE, SOCKET_STATUS } from "./actionTypes";
import socketCreate from "../componnents/wSoscet/WSocket";
import store from "./store";

let socket = null;

export const sendUserMessage = message => {
  socket.send(JSON.stringify(message));
  return (
    {
      type: SEND_MESSAGE,
      payload: {
        message,
      }
    }
  )
};

const getSocketStatus = (status) => {
  return {
    type: SOCKET_STATUS,
    payload: {
      status,
    },
  }
};

export const saveNewMessage = message => {
  return (
    {
      type: SAVE_MESSAGE,
      payload: {
        message
      }
    }
  )
};

export const logIn = userName => {
  socket = socketCreate();
  createSocketMethod(socket);
  window.localStorage.setItem('userName', userName);

  return {
    type: SIGN_IN,
    payload: {
      userName
    }
  }
};

export const logOut = () => {
  socket.close(1000);
  return {
    type: SIGN_OUT
  }
};

function createSocketMethod(socket) {
  socket.onopen = () => {
    console.log('OPEN');
    store.dispatch(getSocketStatus(false));
  };

  socket.onmessage = (e) => {
    const allMess = JSON.parse(e.data);
    store.dispatch(saveNewMessage(allMess));
  };

  socket.onerror = function(error) {
    store.dispatch(getSocketStatus(true));
    console.log('time___out');
    setTimeout(() => {
      console.log('timeOUT2');
      socketReconnect(socket);
    }, 5000);

  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения"); // например, "убит" процесс сервера
    }
    console.log("Код: " + event.code + " причина: " + event.reason);
  };
}

function socketReconnect() {
  console.log('start reconnect!!!!');
  socket.close();
  socket = socketCreate();
  createSocketMethod(socket)
}