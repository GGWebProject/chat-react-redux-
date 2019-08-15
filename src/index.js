import React from "react";
import ReactDOM from "react-dom";
import "./style.sass";
import { Provider } from "react-redux";
import store from "./redux/store";
import ChatApp from "./ChatApp";

ReactDOM.render(
  <Provider store={store}>
    <ChatApp />
  </Provider>,
  document.getElementById("root")
);

