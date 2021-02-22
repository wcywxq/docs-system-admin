import { FC } from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const ServerErrorPage: FC = () => {
  const history = useHistory();
  return (
    <Result
      status="500"
      title="500"
      subTitle="对不起，服务器发生了错误!"
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          返回首页
        </Button>
      }
    />
  );
};

export default ServerErrorPage;
