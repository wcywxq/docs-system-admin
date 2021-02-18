import { FC, useMemo, useState } from "react";
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

  // 递归实现菜单渲染
  const renderMenu = (arr: RouteConfig[]) => {
    return arr.map((item) => {
      if (item.routes) {
        return (
          <SubMenu key={item.path as string} icon={<MailOutlined />} title={item.title}>
            {renderMenu(item.routes)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path as string} icon={<MailOutlined />}>
          <Link to={item.path as string}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapse} onCollapse={onCollapse}>
        <div className="h-8 m-4 text-center text-white">notice admin</div>
        {route?.routes && (
          <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
            {renderMenu(route.routes)}
          </Menu>
        )}
      </Sider>
      <Layout>
        <Header className="bg-white flex items-center">
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </Header>
        <Content className="m-4">
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
