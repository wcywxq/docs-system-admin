import { FC } from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const NotFoundPage: FC = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，页面未找到!"
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          返回首页
        </Button>
      }
    />
  );
};

export default NotFoundPage;
