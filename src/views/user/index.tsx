import React from "react";
import type { Key } from "react";
import { Table, Space, Card, Form, Input, Button, Row, Col, Select, DatePicker, Switch, Popconfirm, message, Typography } from "antd";
import type { FormInstance } from "antd";
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getUserList, deleteUser } from "../../apis/user";

interface UserModel {
  _id: Key;
  uid: string;
  userName: string;
  avatar: string;
  email: string;
  phone: string;
  description: string;
  isActive: Boolean;
  createTime: Date;
}

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;

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

type IState = {
  loading: boolean;
  dataSource: UserModel[];
};

type SearchFormType = Partial<{
  userName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createTime: any[];
}>;

type QueryParamType = Partial<{
  userName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createBeginTime: number;
  createEndTime: number;
}>;

export default class UserPage extends React.Component<{}, IState> {
  private readonly formRef: React.RefObject<FormInstance>;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      loading: false,
      dataSource: []
    };
    this.formRef = React.createRef<FormInstance>();
  }

  async componentDidMount() {
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }

  /**
   * @description 查询列表
   * @param params
   */
  async fetchList(params: SearchFormType) {
    this.setState({ loading: true });
    const query: QueryParamType = {};
    query.userName = params.userName;
    query.email = params.email;
    query.phone = params.phone;
    query.isActive = params.isActive;
    [query.createBeginTime, query.createEndTime] = params.createTime?.map(item => dayjs(item).valueOf()) || [];
    try {
      const response: any = await getUserList(query);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      this.setState({ dataSource: response.data });
    } catch (err) {
      message.error("获取用户列表失败");
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  /**
   * @desc 搜索表单提交
   */
  async onSearch(values: SearchFormType) {
    await this.fetchList(values);
  }

  /**
   * @desc 搜索表单重置
   */
  async onReset() {
    this.formRef.current?.resetFields();
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }

  /**
   * @desc 激活状态切换监听
   * @param val
   * @param row
   */
  onSwitchActive(val: boolean, row: UserModel) {
    const newDataSource = [...this.state.dataSource];
    const target = newDataSource.find(item => item.uid === row.uid);
    if (target) {
      target.isActive = val;
      this.setState({ dataSource: newDataSource });
    }
  }

  /**
   * @desc 删除用户
   * @param id 用户 id
   */
  async handleDeleteUser(id: Key) {
    try {
      const response: any = await deleteUser({ id });
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("删除用户成功");
      await this.fetchList(this.formRef.current?.getFieldsValue());
    } catch (err) {
      message.error("删除用户失败");
      console.log(err);
    }
  }

  render() {
    return (
      <Space className="w-full" direction="vertical" size="large">
        <Card>
          <Form ref={this.formRef} {...formLayout} layout="horizontal" onFinish={values => this.onSearch(values)}>
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
                    <Button htmlType="button" onClick={() => this.onReset()}>
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Table<UserModel> bordered dataSource={this.state.dataSource} loading={this.state.loading} rowKey={record => record._id}>
          <Table.Column<UserModel> title="用户名" dataIndex="userName" align="center" />
          <Table.Column<UserModel> title="邮箱" dataIndex="email" align="center" />
          <Table.Column<UserModel> title="手机号码" dataIndex="phone" align="center" />
          <Table.Column<UserModel>
            title="激活账号"
            dataIndex="isActive"
            align="center"
            render={(isActive, row) => <Switch checkedChildren="激活" unCheckedChildren="关闭" checked={isActive} onChange={checked => this.onSwitchActive(checked, row)} />}
          />
          <Table.Column<UserModel> title="注册时间" dataIndex="createTime" align="center" render={createTime => dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")} />
          <Table.Column<UserModel>
            title="操作"
            align="center"
            render={(_, row) => (
              <React.Fragment>
                <Button type="link" icon={<FormOutlined />}>
                  编辑
                </Button>
                <Popconfirm
                  title={
                    <Space>
                      <Text>确定删除用户</Text>
                      <Text type="danger">{row.userName}</Text>
                      <Text>吗?</Text>
                    </Space>
                  }
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => this.handleDeleteUser(row._id)}>
                  <Button danger type="link" icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>
              </React.Fragment>
            )}
          />
        </Table>
      </Space>
    );
  }
}
