import React from "react"

const SocketErrorWindow = () => {
  return (
    <div className="socket-error__window">
      <div className="socket-error__message">
        <h3>Ошибка соединения</h3>
        <p>
            Упс... Соединение разорвано :( <br/>
            Переподключаемся.
        </p>
      </div>
    </div>
  )
};

export default SocketErrorWindow;