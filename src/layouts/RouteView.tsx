import { FC, Fragment } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import NotFoundPage from "../views/exception/404";

const RouteView: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;

  if (route && route.routes) {
    return (
      <Router>
        <Switch>
          {renderRoutes(route.routes)}
          <Route component={NotFoundPage}></Route>
        </Switch>
      </Router>
    );
  }

  return <Fragment></Fragment>;
};

export default RouteView;
