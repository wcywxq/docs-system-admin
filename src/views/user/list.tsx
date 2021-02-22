import React, { FC, useState, useEffect } from "react";
import {
  Table,
  Space,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Switch,
  Avatar,
  Popconfirm,
} from "antd";
import axios from "axios";

interface UserModel {
  key: number | string;
  uid: string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  description: string;
  isActive: 0 | 1;
  createTime: Date;
}

const { useForm } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};

const AuthorList: FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<UserModel>>([]);

  /**
   * @description 查询
   * @param values
   */
  const onSearch = (values: any) => {
    queryList(values);
  };

  /**
   * @description 重置
   */
  const onReset = () => {
    form.resetFields();
  };

  /**
   * @description 查询列表
   * @param params
   */
  const queryList = async (params?: any) => {
    setLoading(true);
    try {
      console.log(params);
      const fetchData = await axios.get("/api/user/list");
      console.log(fetchData);
      setDataSource(fetchData.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description 激活状态切换监听事件
   * @param val
   * @param row
   */
  const onSwitchActive = (val: boolean, row: UserModel) => {
    const newData = [...dataSource];
    const target = newData.find((item) => item.uid === row.uid);
    if (target) {
      target.isActive = val ? 1 : 0;
    }
    setDataSource(newData);
  };

  useEffect(() => {
    queryList();
  }, []);

  return (
    <Space className="w-full" direction="vertical" size="large">
      <Card>
        <Form {...formLayout} form={form} layout="horizontal" onFinish={onSearch}>
          <Row justify="space-between" gutter={[8, 0]}>
            <Col span={8}>
              <Form.Item className="w-full" label="用户名" name="userName">
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="邮箱" name="email">
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="手机号" name="phone">
                <Input className="w-full" placeholder="请输入手机号" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="激活状态" name="isActive">
                <Select placeholder="全部" allowClear>
                  <Option value={1}>已激活</Option>
                  <Option value={0}>未激活</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="创建时间" name="createTime">
                <RangePicker className="w-full" showTime />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full text-center">
                <Space>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table<UserModel> bordered dataSource={dataSource} loading={loading} rowKey={(record) => record.uid}>
        <Table.Column<UserModel> title="用户名" dataIndex="userName" align="center"></Table.Column>
        <Table.Column<UserModel>
          title="用户头像"
          dataIndex="avatar"
          align="center"
          render={(avatar) => <Avatar src={avatar} shape="square" size="large" />}
        ></Table.Column>
        <Table.Column<UserModel> title="邮箱" dataIndex="email" align="center"></Table.Column>
        <Table.Column<UserModel> title="手机号码" dataIndex="phone" align="center"></Table.Column>
        <Table.Column<UserModel>
          title="描述"
          dataIndex="description"
          align="center"
          width="40%"
          render={(description) => <div className="text-left">{description}</div>}
        ></Table.Column>
        <Table.Column<UserModel>
          title="激活账号"
          dataIndex="isActive"
          align="center"
          render={(isActive, row) => (
            <Switch
              checkedChildren="激活"
              unCheckedChildren="关闭"
              checked={isActive}
              onChange={(checked) => onSwitchActive(checked, row)}
            />
          )}
        ></Table.Column>
        <Table.Column<UserModel> title="文章创建时间" dataIndex="createTime" align="center"></Table.Column>
        <Table.Column<UserModel>
          title="操作"
          align="center"
          render={(_, row) => (
            <Popconfirm
              title={
                <span>
                  确定删除用户<span className="text-danger font-bold">{row.userName}</span>吗?
                </span>
              }
              okText="确定"
              cancelText="取消"
            >
              <Button danger type="primary">
                删除
              </Button>
            </Popconfirm>
          )}
        ></Table.Column>
      </Table>
    </Space>
  );
};

export default AuthorList;
