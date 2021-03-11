import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <Fragment>
      登陆
      <Link to="/user">首页</Link>
    </Fragment>
  );
};

export default LoginPage;
