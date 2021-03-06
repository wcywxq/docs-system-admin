import { FC, useCallback, useMemo, useState, memo, useEffect } from "react";
import { matchRoutes, RouteConfigComponentProps } from "react-router-config";
import { Layout, Breadcrumb, Menu, Space, Dropdown, Modal, message } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, LogoutOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/core";
import { clearLoginInfoAction } from "../redux/actions";
import RouteView from "./RouteView";
import type { Routes } from "../router";
import logo from "../assets/image/logo.svg";
import "./BasicLayout.scss";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const BasicLayout: FC<RouteConfigComponentProps> = props => {
  const { route } = props;
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const loginStore = useSelector(state => state.login);
  // 折叠状态控制
  const [collapse, setCollapse] = useState(false);
  // 当前激活的菜单的 key
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
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
    <Breadcrumb.Item key="/">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>
  ].concat(
    routeMatches.map(item => {
      if (item.path === pathname || item.routes) {
        return <Breadcrumb.Item key={item.path as string}>{item.title}</Breadcrumb.Item>;
      }
      return (
        <Breadcrumb.Item key={item.path as string}>
          <Link to={item.path as string}>{item.title}</Link>
        </Breadcrumb.Item>
      );
    })
  );
  // 递归实现菜单渲染
  const renderMenu = (arr: Routes[]) => {
    return arr.map(item => {
      if (item.routes) {
        return (
          <SubMenu key={item.path as string} icon={item.icon} title={item.title}>
            {renderMenu(item.routes.filter(child => child.path !== "*" && !child.hiddenInMenu))}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path as string} icon={item.icon}>
          <Link to={item.path as string}>{item.title}</Link>
        </Menu.Item>
      );
    });
  };
  // 下拉菜单子项点击监听
  const onDropDownClick = useCallback(
    ({ key }) => {
      if (key === "logout") {
        Modal.confirm({
          title: "确定退出本系统吗?",
          icon: <ExclamationCircleOutlined />,
          okType: "danger",
          onOk() {
            dispatch(clearLoginInfoAction());
          },
          onCancel() {
            message.info("取消退出本系统");
          }
        });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    // 初始化选中项
    setSelectedKeys([pathname]);
  }, [pathname]);

  useEffect(() => {
    if (!loginStore.token) {
      history.push("/login");
    }
  }, [history, loginStore.token]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="pro-sider" trigger={null} collapsible collapsed={collapse}>
        <div className="h-8 m-4 space-x-1.5 text-white overflow-hidden">
          <img className="h-full" src={logo} alt="" />
          <span>{!collapse && "内容管理系统"}</span>
        </div>
        {route?.routes && (
          <Menu theme="dark" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={selectedKeys}>
            {renderMenu(route.routes.filter(item => item.path !== "*" && !item.hiddenInMenu))}
          </Menu>
        )}
      </Sider>
      <Layout className="pro-layout" style={{ marginLeft: `${collapse ? 80 : 200}px` }}>
        <Header className="pro-header" style={{ width: `calc(100% - ${collapse ? 80 : 200}px)` }}>
          <Space size="large">
            <span className="cursor-pointer" onClick={() => setCollapse(collapse => !collapse)}>
              {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
          </Space>
          <Dropdown
            overlay={
              <Menu onClick={onDropDownClick}>
                <Menu.Item key="logout" danger>
                  <LogoutOutlined />
                  <span>退出登陆</span>
                </Menu.Item>
              </Menu>
            }>
            <SettingOutlined className="cursor-pointer" />
          </Dropdown>
        </Header>
        <Content className="pro-content">
          <RouteView {...props} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(BasicLayout);
