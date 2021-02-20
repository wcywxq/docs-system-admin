import { FC, useMemo, useState } from "react";
import { matchRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, Menu } from "antd";
import { MailOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import RouteView from "./RouteView";
import logo from "../assets/image/logo.svg";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const PageLayout: FC<RouteConfigComponentProps> = (props) => {
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
      <Sider trigger={null} collapsible collapsed={collapse}>
        <div className="h-8 m-4 text-white overflow-hidden">
          <img className="h-full" src={logo} alt="" />
          <span>{!collapse && "博客后台管理系统"}</span>
        </div>
        {route?.routes && (
          <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
            {renderMenu(route.routes)}
          </Menu>
        )}
      </Sider>
      <Layout>
        <Header className="p-0 h-12 bg-white flex items-center">
          <span className="px-4 cursor-pointer" onClick={() => setCollapse(!collapse)}>
            {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </Header>
        <Content className="m-4">
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
