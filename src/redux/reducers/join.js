import { JOIN } from "../actionTypes";

const joinedReducer = (state = false, action) => {
  switch (action.type) {
    case JOIN: {
      return true;
    }
    default: {
      return state;
    }
  }
};

export default joinedReducer;