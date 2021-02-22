import { FC } from "react";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <>
      登陆
      <Link to="/user">首页</Link>
    </>
  );
};

export default LoginPage;
