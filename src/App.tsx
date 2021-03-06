import { ConfigProvider } from "antd";
import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import zhCN from "antd/lib/locale/zh_CN";
import routes from "./router";
import store from "./redux/store";
import LoginPage from "./views/login";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const App: FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={LoginPage}></Route>
            {renderRoutes(routes)}
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
