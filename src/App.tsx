import { FC } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import routes from "./router";

const App: FC = () => {
  return <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>;
};

export default App;
