import { FC, useMemo, useState } from "react";
import { matchRoutes, RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import RouteView from "./RouteView";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout: FC<RouteConfigComponentProps> = (props) => {
  const { route } = props;
  const { pathname } = useLocation();
  // 折叠状态控制
  const [collapse, setCollapse] = useState(false);
  // 当前激活的菜单的 key
  const selectedKeys = useMemo(() => [pathname], [pathname]);
  // 默认展开的菜单
  const defaultOpenKeys = useMemo(
    () => (route?.routes ? matchRoutes(route?.routes, pathname).map((item) => item.match.path) : []),
    [route, pathname]
  );

  const onCollapse = (val: boolean) => setCollapse(val);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
        <div className="h-8 m-4 text-center text-white">notice admin</div>
        <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
          {route?.routes?.map((item: any) =>
            item.routes ? (
              <SubMenu key={item.path as string} icon={<MailOutlined />} title={item.title}>
                {item.routes?.map((child: any, idx: any) => (
                  <Menu.Item key={child.path as string} title>
                    <Link to={child.path as string}>{child.title}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.path as string} icon={<MailOutlined />}>
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
