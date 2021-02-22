import { ConfigProvider } from "antd";
import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import routes from "./router";
import LoginPage from "./views/login";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={LoginPage}></Route>
          {renderRoutes(routes)}
        </Switch>
      </Router>
    </ConfigProvider>
  );
};

export default App;
