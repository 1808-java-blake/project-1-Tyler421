import { signInTypes } from "../actions/sign-in/sign-in.types";
import { ISignInState } from ".";

const initialState: ISignInState = {
  credentials: {
    password: "",
    username: ""
  },
  currentUser: null,
  errorMessage: ""
};

export const signInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case signInTypes.UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case signInTypes.UPDATE_PASSWORD:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          password: action.payload.password
        }
      };
    case signInTypes.UPDATE_USERNAME:
      return {
        ...state,
        credentials: {
          ...state.credentials,
          username: action.payload.username
        }
      };
    case signInTypes.LOGIN:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        errorMessage: action.payload.errorMessage
      };
  }
  return state;
};
