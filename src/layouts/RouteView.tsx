import { FC } from "react";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";

const RouteView: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;

  if (route && route.routes) {
    return renderRoutes(route.routes);
  }

  return <></>;
};

export default RouteView;