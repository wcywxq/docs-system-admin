import { LoginActionType } from "../reducers/login";

export const setLoginInfoAction = (data: { userId: string; userName: string; token: string }): LoginActionType => {
  // 存储到本地
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("userName", data.userName);
  localStorage.setItem("access_token", data.token);
  // 存储到 store
  return { type: "SET_LOGIN_INFO", payload: data };
};

export const clearLoginInfoAction = (): LoginActionType => {
  // 清除缓存
  localStorage.clear();
  return { type: "CLEAR_LOGIN_INFO" };
};
