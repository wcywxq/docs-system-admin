interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: () => any;
}

// login store
type LoginStateType = {
  token: string;
  userId: string;
  userName: string;
};
