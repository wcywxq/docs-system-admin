import { FC, useState } from "react";
import { RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, Row, Col, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import RouteView from "./RouteView";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;
  const [collapse, setCollapse] = useState(false);

  const onCollapse = (val: boolean) => {
    setCollapse(val);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
        <div style={{ height: "32px", margin: "16px", background: "rgba(255, 255, 255, 0.3)" }}>notice</div>
        <Menu theme="dark" mode="inline">
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
      </Sider>
      <Layout>
        <Header>123</Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
