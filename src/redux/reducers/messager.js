import { SAVE_MESSAGE, SEND_MESSAGE } from "../actionTypes";

export const saveNewMessageReducer = (state = {messages: []}, action) => {
  switch (action.type) {
    case SAVE_MESSAGE: {
      const { message } = action.payload;
      return {
        messages: [...state.messages, ...message]
      };
    }
    default:
      return state;
  }
};

export const saveLastUserMessage = (state = {}, action) => {
  switch (action.type) {

    case SEND_MESSAGE: {
      const { message } = action.payload;
      return message;
    }
    default:
      return state;
  }
};

