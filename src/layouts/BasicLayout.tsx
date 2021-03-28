import { FC, useCallback, useMemo, useState, memo } from "react";
import { matchRoutes, RouteConfig, RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, Menu } from "antd";
import { MailOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import RouteView from "./RouteView";
import logo from "../assets/image/logo.svg";
import "./BasicLayout.scss";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout: FC<RouteConfigComponentProps> = props => {
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
      return matches.map(item => item.route);
    }
    return [];
  }, [pathname, route]);

  // 默认打开的菜单的 key
  const defaultOpenKeys = useMemo(() => routeMatches.map(item => item.path as string), [routeMatches]);

  // 面包屑子项
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>
  ].concat(
    routeMatches.map(item => {
      if (item.path === pathname || item.routes) return <Breadcrumb.Item key={item.key}>{item.title}</Breadcrumb.Item>;
      return (
        <Breadcrumb.Item key={item.key}>
          <Link to={item.path as string}>{item.title}</Link>
        </Breadcrumb.Item>
      );
    })
  );

  // 递归实现菜单渲染
  const renderMenu = (arr: RouteConfig[]) => {
    return arr.map(item => {
      if (item.routes) {
        return (
          <SubMenu key={item.path as string} icon={<MailOutlined />} title={item.title}>
            {renderMenu(item.routes.filter(child => child.path !== "*" && !child.hiddenInMenu))}
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

  // 设置收起展开
  const handleCollapse = useCallback(() => setCollapse(!collapse), [collapse]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="pro-sider" trigger={null} collapsible collapsed={collapse}>
        <div className="h-8 m-4 text-white overflow-hidden">
          <img className="h-full" src={logo} alt="" />
          <span>{!collapse && "Notice Admin"}</span>
        </div>
        {route?.routes && (
          <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
            {renderMenu(route.routes.filter(item => item.path !== "*" && !item.hiddenInMenu))}
          </Menu>
        )}
      </Sider>
      <Layout className="pro-layout" style={{ marginLeft: collapse ? "80px" : "200px" }}>
        <Header className="pro-header" style={{ width: collapse ? "calc(100% - 80px)" : "calc(100% - 200px)" }}>
          <span className="px-4 cursor-pointer" onClick={handleCollapse}>
            {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
          <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </Header>
        <Content className="pro-content">
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(BasicLayout);
