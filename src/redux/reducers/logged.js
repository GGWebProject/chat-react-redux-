import {SIGN_IN, SIGN_OUT} from '../actionTypes';

const loggedReducer = (state = {status: false, userName: null}, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userName } = action.payload;
      return {
        status: true,
        userName,
      };
    case SIGN_OUT:
      return {
        status: false,
        userName: null,
      };
    default:
      return state;
  }
};

export default loggedReducer;