import { FC, useCallback, useState } from "react";
import { Form, Input, Row, Col, Space, Button, message, notification } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { userLogin, userRegister } from "../../apis/user";
import dayjs from "dayjs";
import bgCover from "../../assets/image/login_cover.svg";
import "./styles/index.scss";

const { Password } = Input;

const formLayout = {
  labelCol: { xs: 24, sm: 4 },
  wrapperCol: { xs: 24, sm: 20 }
};

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 }
};

const LoginPage: FC = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  // 登陆相关
  const [loginForm] = Form.useForm();
  const [loginLoading, setLoginLoading] = useState(false);
  // 注册相关
  const [registerForm] = Form.useForm();
  const [registerLoading, setRegisterLoading] = useState(false);

  const gotoRegister = useCallback(() => {
    setVisible(true);
    loginForm.resetFields();
  }, [loginForm]);

  const backToLogin = useCallback(() => {
    setVisible(false);
    registerForm.resetFields();
  }, [registerForm]);

  const onLogin = async (values: any) => {
    setLoginLoading(true);
    try {
      const response: any = await userLogin(values);
      if (response.resultCode !== 0) {
        message.error(`登陆失败: ${response.errorMsg}`);
      } else {
        history.push("/welcome");
        notification.success({
          message: "欢迎回来👏👏👏",
          description: `当前时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`
        });
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoginLoading(false);
    }
  };

  const onRegister = async (values: any) => {
    setRegisterLoading(true);
    try {
      const response: any = await userRegister(values);
      if (response.resultCode !== 0) {
        message.error(`注册失败: ${response.errorMsg}`);
      } else {
        message.success("注册成功");
        backToLogin();
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      {/* 登陆
      <Link to="/user">首页</Link> */}

      <Row className="pro-login" align="middle">
        <Col span={12} className="overflow-hidden">
          <Space className="text-center animate-fade-in-left" direction="vertical" size="large">
            <img className="w-1/2" src={bgCover} alt="" />
            <div className="font-bold text-2xl text-white">开箱即用的中后台</div>
            <div className="text-sm text-white">输入您的个人详细信息开始使用！</div>
          </Space>
        </Col>
        <Col span={12} className="overflow-hidden">
          {/* login form */}
          <Form className={`pro-login-form ${visible ? "hidden" : ""}`} {...formLayout} form={loginForm} onFinish={onLogin}>
            <Form.Item {...tailLayout}>
              <div className="font-bold text-2xl">登陆</div>
            </Form.Item>
            <Form.Item label="账号" name="username" rules={[{ required: true, message: "请输入账号!" }]}>
              <Input placeholder="请输入账号" allowClear />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
              <Password placeholder="请输入密码" allowClear iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className="w-full" loading={loginLoading} type="primary" htmlType="submit">
                登陆
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Row justify="space-around">
                <Button>手机登录</Button>
                <Button>二维码登陆</Button>
                <Button onClick={gotoRegister}>注册</Button>
              </Row>
            </Form.Item>
          </Form>
          {/* register form */}
          <Form className={`pro-login-form ${visible ? "" : "hidden absolute"}`} {...formLayout} form={registerForm} onFinish={onRegister}>
            <Form.Item {...tailLayout}>
              <div className="font-bold text-2xl">{visible ? "注册" : "登陆"}</div>
            </Form.Item>
            <Form.Item label="账号" name="username" rules={[{ required: true, message: "请输入账号!" }]}>
              <Input placeholder="请输入账号" allowClear />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true, message: "请输入密码" }]}>
              <Password placeholder="请输入密码" allowClear iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  validator: (_, value, callback) => {
                    const password = registerForm.getFieldValue("password");
                    try {
                      if (!value) throw new Error("请输入确认密码");
                      if (!password) throw new Error("请先输入密码");
                      if (password !== value) {
                        throw new Error("两次输入的密码不一致");
                      }
                      callback();
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}>
              <Password placeholder="请再次确认密码" allowClear iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className="w-full" loading={registerLoading} type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button className="w-full" loading={registerLoading} onClick={backToLogin}>
                返回
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
