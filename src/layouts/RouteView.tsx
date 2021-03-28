import { FC, Fragment } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

const RouteView: FC<RouteConfigComponentProps> = props => {
  const { route } = props;

  if (route && route.routes) {
    return renderRoutes(route.routes);
  }

  return <Fragment></Fragment>;
};

export default RouteView;
