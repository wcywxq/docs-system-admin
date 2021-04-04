interface SetLoginInfoAction {
  type: "SET_LOGIN_INFO";
  payload: {
    token: string;
    userId: string;
    userName: string;
  };
}

interface ClearLoginInfoAction {
  type: "CLEAR_LOGIN_INFO";
}

export type LoginActionType = SetLoginInfoAction | ClearLoginInfoAction;

const initState: LoginStateType = {
  token: "",
  userId: "",
  userName: ""
};

const reducer = (state = initState, action: LoginActionType) => {
  switch (action.type) {
    case "SET_LOGIN_INFO":
      return {
        ...state,
        ...action.payload
      };
    case "CLEAR_LOGIN_INFO":
      return {
        ...state,
        ...initState
      };
    default:
      return state;
  }
};

export default reducer;
