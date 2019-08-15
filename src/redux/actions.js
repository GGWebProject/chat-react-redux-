import { SAVE_MESSAGE, SIGN_IN, SIGN_OUT, SEND_MESSAGE, SOCKET_STATUS, NOTIFICATION_STATUS, WINDOW_VISIBILITY } from "./actionTypes";
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

export const setNotificationStatus = (status) => {
  return {
    type: NOTIFICATION_STATUS,
    payload: {
      status,
    },
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
  const isWindowVivible = store.getState(state => state.isWindowVisible);
  isWindowVivible && notify();

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
  document.onvisibilitychange = null;

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
  socket.close();
  socket = socketCreate();
  createSocketMethod(socket)
}

function createVisibilityListener() {
  if (!document.onvisibilitychange) {
    document.onvisibilitychange = () => {
      if (document.visibilityState === 'visible') {
        store.dispatch(setWindowVisibilityStatus(true));
      } else {
        store.dispatch(setWindowVisibilityStatus(false));
      }
    }
  }
}

function notify() {
  window.notification = new Notification("test test");
  const { notification } = window;
  notification.onclick = () => {
    window.open("http://localhost:3000/");
  };
  setTimeout( () => { notification.close(); }, 5000);
}
