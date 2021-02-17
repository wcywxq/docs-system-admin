import { FC, useEffect, useMemo, useState } from "react";
import { matchRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config";
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
  // 默认匹配的路由
  const routeMatches = useMemo(() => {
    if (route && route.routes) {
      const matches = matchRoutes(route.routes, pathname);
      return matches.map((item) => item.route);
    }
    return [];
  }, [pathname, route]);

  // 默认打开的菜单的 key
  const defaultOpenKeys = useMemo(() => routeMatches.map((item) => item.path as string), [routeMatches]);

  const onCollapse = (val: boolean) => setCollapse(val);

  console.log(routeMatches);

  // 面包屑子项
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(
    routeMatches.map((item) => {
      if (item.path === pathname || item.routes) return <Breadcrumb.Item>{item.title}</Breadcrumb.Item>;
      return (
        <Breadcrumb.Item>
          <Link to={item.path as string}>{item.title}</Link>
        </Breadcrumb.Item>
      );
    })
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
        <div className="h-8 m-4 text-center text-white">notice admin</div>
        <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
          {route?.routes?.map((item: any) =>
            item.routes ? (
              <SubMenu key={item.path as string} icon={<MailOutlined />} title={item.title}>
                {item.routes?.map((child: any) => (
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
        <Header className="bg-white flex items-center">
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </Header>
        <Content className="mx-4">
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
