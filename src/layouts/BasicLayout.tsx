import { FC } from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { Row, Col, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RouteView from "./RouteView";

const { SubMenu } = Menu;

const BasicLayout: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;

  return (
    <Row>
      <Col>
        <Menu theme="dark" mode="inline" style={{ width: 256 }}>
          {route?.routes?.map((item: any) =>
            item.routes ? (
              <SubMenu key={item.path as string} icon={<MailOutlined />} title={item.title}>
                {item.routes?.map((child: any, idx: any) => (
                  <Menu.Item key={idx} title>
                    <Link to={child.path as string}>{child.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.path as string}>
                <Link to={item.path as string}>{item.title}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Col>
      <Col>
        <RouteView {...props} />
      </Col>
    </Row>
  );
};

export default BasicLayout;
