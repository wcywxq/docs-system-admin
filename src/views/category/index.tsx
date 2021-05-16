import React from "react";
import type { Key } from "react";
import { Card, Form, Row, Col, Button, Space, message, Input, DatePicker, Table, Popconfirm, Modal, Typography } from "antd";
import type { FormInstance } from "antd";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategoryList, deleteCategory, addCategory } from "../../apis/category";
import dayjs from "dayjs";

export type CategoryModel = {
  _id: Key;
  name: string;
  createTime: Date;
};

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

const addFormLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};

const { Text } = Typography;

type IState = {
  loading: boolean;
  dataSource: CategoryModel[];
  visible: boolean;
};

type SearchFormType = Partial<{
  name: string;
  createTime: number[];
}>;

type QueryParamType = Partial<{
  name: string;
  createBeginTime: number;
  createEndTime: number;
}>;

type AddFormType = Partial<{
  name: string;
}>;

export default class CategoryPage extends React.Component<{}, IState> {
  private readonly formRef: React.RefObject<FormInstance>;
  private readonly addFormRef: React.RefObject<FormInstance>;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      visible: false
    };
    this.formRef = React.createRef<FormInstance>();
    this.addFormRef = React.createRef<FormInstance>();
  }

  async componentDidMount() {
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }

  /**
   * @desc 查询
   * @param params
   */
  async fetchList(params: SearchFormType) {
    this.setState({ loading: true });
    const query: QueryParamType = {};
    query.name = params.name;
    [query.createBeginTime, query.createEndTime] = params.createTime?.map(item => dayjs(item).valueOf()) || [];
    try {
      const response: any = await getCategoryList(query);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      this.setState({ dataSource: response.data });
    } catch (err) {
      message.error("获取分类列表失败");
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  /**
   * @desc 搜索表单提交
   * @param values
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
   * @desc 删除分类
   * @param id
   */
  async onDeleteCategory(id: Key) {
    try {
      const response: any = await deleteCategory({ id });
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("删除分类成功");
    } catch (err) {
      message.error("删除分类失败");
      console.log(err);
    } finally {
      await this.fetchList(this.formRef.current?.getFieldsValue());
    }
  }

  /**
   * @desc 新增分类表单提交
   */
  async onSubmit(values: AddFormType) {
    try {
      const response: any = await addCategory(values);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("新增分类成功");
    } catch (err) {
      message.error("新增分类失败");
      console.log(err);
    } finally {
      this.setState({ visible: false });
      // 表单重置
      this.addFormRef.current?.resetFields();
      await this.fetchList(this.formRef.current?.getFieldsValue());
    }
  }

  render() {
    return (
      <Space className="w-full" direction="vertical" size="large">
        <Card>
          <Form {...formLayout} ref={this.formRef} layout="horizontal" onFinish={values => this.onSearch(values)}>
            <Row justify="space-between" gutter={[8, 0]}>
              <Col span={8}>
                <Form.Item className="w-full" label="分类名称" name="name">
                  <Input placeholder="请输入分类名称" />
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
                    <Button htmlType="button" onClick={() => this.onReset()}>
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Button type="primary" onClick={() => this.setState({ visible: true })}>
          新增分类
        </Button>
        <Table<CategoryModel> size="small" bordered dataSource={this.state.dataSource} loading={this.state.loading} rowKey={record => record._id}>
          <Table.Column<CategoryModel> title="分类名" dataIndex="name" align="center" />
          <Table.Column<CategoryModel> title="分类创建时间" dataIndex="createTime" align="center" render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")} />
          <Table.Column<CategoryModel>
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
                      <Text>确定删除分类</Text>
                      <Text type="danger" strong>
                        {row.name}
                      </Text>
                      <Text>吗?</Text>
                    </Space>
                  }
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => this.onDeleteCategory(row._id)}>
                  <Button danger type="link" icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>
              </React.Fragment>
            )}
          />
        </Table>
        {/* 新增分类的表单弹窗 */}
        <Modal destroyOnClose title="新增分类" visible={this.state.visible} onCancel={() => this.setState({ visible: false })} footer={null}>
          <Form ref={this.addFormRef} {...addFormLayout} onFinish={values => this.onSubmit(values)}>
            <Form.Item className="w-full" label="分类名称" name="name" rules={[{ required: true, message: "分类名称不能为空!" }]}>
              <Input placeholder="请输入分类名称" />
            </Form.Item>
            <Row align="middle" justify="end">
              <Space>
                <Button onClick={() => this.setState({ visible: false })}>取消</Button>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Space>
            </Row>
          </Form>
        </Modal>
      </Space>
    );
  }
}
