import { SOCKET_STATUS } from "../actionTypes";

const socketErrorReducer = (state = false, action) => {
  switch (action.type) {
    case SOCKET_STATUS: {
      const { status } = action.payload;
      return status;
    }
    default: {
      return state;
    }
  }
};

export default socketErrorReducer;