import {
    SAVE_MESSAGE, SIGN_IN, SIGN_OUT, SEND_MESSAGE,
    SOCKET_STATUS, NOTIFICATION_STATUS, WINDOW_VISIBILITY, JOIN
  } from "./actionTypes";
import socketCreate from "../wSoscet/WSocket";
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

export const setNotificationStatus = (status) => {
  return {
    type: NOTIFICATION_STATUS,
    payload: {
      status,
    },
  }
};

export const join = () => {
  return {
    type: JOIN,
  }
};

export const setWindowVisibilityStatus = (status) => {
  return {
    type: WINDOW_VISIBILITY,
    payload: {
      status,
    },
  }
};

export const saveNewMessage = message => {
  //send notification when window is hidden
  const { isWindowVisible, saveMessages } = store.getState();
  const storeMessagesArr = saveMessages.messages;
  !isWindowVisible && (storeMessagesArr.length !== message.length) && notify();
  let messageArr = [...message];
  if (storeMessagesArr.length === messageArr.length && messageArr.length > 1) {
    messageArr = []
  }

  return (
    {
      type: SAVE_MESSAGE,
      payload: {
        message: messageArr,
      }
    }
  )
};


export const logIn = userName => {
  socket = socketCreate();
  createSocketMethod(socket);
  createVisibilityListener();
  window.localStorage.setItem('userName', userName);

  return {
    type: SIGN_IN,
    payload: {
      userName
    }
  }
};

export const logOut = () => {
  //close opened socket and remove visibility listener
  socket.close(1000);
  window.onblur = null;
  window.onfocus = null;
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
    const messages = JSON.parse(e.data);
    let messagesArr = [...messages];

    if (messagesArr.length > 1) {
      messagesArr.reverse();
    }
    store.dispatch(saveNewMessage(messagesArr));
  };

  socket.onerror = function(error) {
    store.dispatch(getSocketStatus(true));
    setTimeout(() => {
      socketReconnect(socket);
    }, 5000);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      store.dispatch(getSocketStatus(true));
      setTimeout(() => {
        socketReconnect(socket);
      }, 5000);
      console.log("Обрыв соединения"); // например, "убит" процесс сервера
    }
  };
}

function socketReconnect() {
  socket.close();
  socket = socketCreate();
  createSocketMethod(socket)
}

function createVisibilityListener() {
  window.onblur = () => {
    store.dispatch(setWindowVisibilityStatus(false));
  };

  window.onfocus = () => {
    store.dispatch(setWindowVisibilityStatus(true));
  };
}

function notify() {
  window.notification = new Notification("Chat RS", { body: 'Новое сообщение!', dir: 'auto' });
  const { notification } = window;
  setTimeout( () => { notification.close(); }, 5000);
}
