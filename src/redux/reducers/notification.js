import { NOTIFICATION_STATUS } from "../actionTypes";

const notificationReducer = (state = false, action) => {
  switch (action.type) {
    case NOTIFICATION_STATUS: {
      const { status } = action.payload;
      return status;
    }
    default: {
      return state;
    }
  }
};

export default notificationReducer;