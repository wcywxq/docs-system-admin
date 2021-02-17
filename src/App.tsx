import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { HashRouter as Router } from "react-router-dom";
import routes from "./router";

const App: FC = () => {
  return <Router>{renderRoutes(routes)}</Router>;
};

export default App;
