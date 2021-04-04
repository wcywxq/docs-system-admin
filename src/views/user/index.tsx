import { FC, useState, useEffect, useCallback } from "react";
import { Table, Space, Card, Form, Input, Button, Row, Col, Select, DatePicker, Switch, Popconfirm, message } from "antd";
import { getUserList, deleteUser } from "../../apis/user";
import dayjs from "dayjs";

interface UserModel {
  key: string;
  uid: string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  description: string;
  isActive: Boolean;
  createTime: Date;
}

const { useForm } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
};

const UserPage: FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<UserModel>>([]);

  /**
   * @description 查询
   * @param values
   */
  const onSearch = (values: any) => {
    fetchList(values);
  };

  /**
   * @desc 重置
   */
  const onReset = useCallback(() => {
    form.resetFields();
    fetchList(form.getFieldsValue());
  }, [form]);

  /**
   * @description 查询列表
   * @param params
   */
  const fetchList = async (params?: any) => {
    setLoading(true);
    const query = {} as any;
    params.userName !== undefined && (query.userName = params.userName);
    params.email !== undefined && (query.email = params.email);
    params.phone !== undefined && (query.phone = params.phone);
    params.isActive !== undefined && (query.isActive = !!params.isActive);
    params.createTime !== undefined && params.createTime.length && ([query.createBeginTime, query.createEndTime] = params.createTime.map((time: any) => dayjs(time).valueOf()));
    try {
      const response: any = await getUserList(query);
      if (response.resultCode === 0) {
        setDataSource(response.data.map((item: any) => ({ ...item, key: item._id })));
      } else {
        message.error(`获取用户列表失败: ${JSON.stringify(response.errorMsg)}`);
      }
    } catch (err) {
      message.error({ message: `获取用户列表失败: ${err}` });
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
    const target = newData.find(item => item.uid === row.uid);
    if (target) {
      target.isActive = !!val;
    }
    setDataSource(newData);
  };

  /**
   * @desc 删除用户
   * @param id 用户id
   */
   const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        const response: any = await deleteUser({ id });
        if (response.resultCode !== 0) {
          message.error(`删除用户失败: ${response.errorMsg.toString()}`);
        }
        message.success("删除用户成功");
      } catch (err) {
        message.error(err);
      } finally {
        fetchList(form.getFieldsValue());
      }
    },
    [form]
  );

  useEffect(() => {
    fetchList(form.getFieldsValue());
  }, [form]);

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
              <Form.Item className="w-full" label="注册时间" name="createTime">
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
      <Table<UserModel> bordered dataSource={dataSource} loading={loading} rowKey={record => record.key}>
        <Table.Column<UserModel> title="用户名" dataIndex="userName" align="center"></Table.Column>
        {/* <Table.Column<UserModel>
          title="用户头像"
          dataIndex="avatar"
          align="center"
          render={(avatar) => <Avatar src={avatar} shape="square" size="large" />}
        ></Table.Column> */}
        <Table.Column<UserModel> title="邮箱" dataIndex="email" align="center"></Table.Column>
        <Table.Column<UserModel> title="手机号码" dataIndex="phone" align="center"></Table.Column>
        {/* <Table.Column<UserModel>
          title="描述"
          dataIndex="description"
          align="center"
          width="40%"
          render={(description) => <div className="text-left">{description}</div>}
        ></Table.Column> */}
        <Table.Column<UserModel>
          title="激活账号"
          dataIndex="isActive"
          align="center"
          render={(isActive, row) => <Switch checkedChildren="激活" unCheckedChildren="关闭" checked={isActive} onChange={checked => onSwitchActive(checked, row)} />}></Table.Column>
        <Table.Column<UserModel> title="注册时间" dataIndex="createTime" align="center" render={createTime => dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}></Table.Column>
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
              onConfirm={() => handleDeleteUser(row.key)}>
              <Button danger type="primary">
                删除
              </Button>
            </Popconfirm>
          )}></Table.Column>
      </Table>
    </Space>
  );
};

export default UserPage;
