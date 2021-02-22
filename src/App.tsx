import { ConfigProvider } from "antd";
import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import dayjs from "dayjs";
import zhCN from "antd/lib/locale/zh_CN";
import routes from "./router";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const App: FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>{renderRoutes(routes)}</Router>
    </ConfigProvider>
  );
};

export default App;
