import { FC } from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const ForbiddenPage: FC = () => {
  const history = useHistory();
  return (
    <Result
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问当前页面!"
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          返回首页
        </Button>
      }
    />
  );
};

export default ForbiddenPage;
