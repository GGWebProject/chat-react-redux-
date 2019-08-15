import { WINDOW_VISIBILITY } from "../actionTypes";

const windowVisibilityReducer = (state = true, action) => {
  switch (action.type) {
    case WINDOW_VISIBILITY: {
      const { status } = action.payload;
      return status;
    }
    default: {
      return state;
    }
  }
};

export default windowVisibilityReducer;