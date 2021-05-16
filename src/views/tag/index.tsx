import React from "react";
import type { Key } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Space,
  message,
  Input,
  DatePicker,
  Table,
  Popconfirm,
  Modal,
  Typography
} from "antd";
import type { FormInstance } from 'antd';
import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getTagList, deleteTag, addTag } from "../../apis/tag";

export type TagModel = {
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
  dataSource: TagModel[];
  visible: boolean;
};

type SearchFormType = Partial<{
  name: string;
  createTime: any[];
}>;

type QueryParamType = Partial<{
  name: string;
  createBeginTime: number;
  createEndTime: number;
}>;

type AddFormType = Partial<{
  name: string;
}>;

export default class TagPage extends React.Component<{}, IState> {
  private readonly formRef: React.RefObject<FormInstance>;
  private readonly addFormRef: React.RefObject<FormInstance>;

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      visible: false,
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
      const response: any = await getTagList(query);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      this.setState({ dataSource: response.data });
    } catch (err) {
      message.error('获取标签列表失败');
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

  async onSearch(values: SearchFormType) {
    await this.fetchList(values);
  }

  async onReset() {
    this.formRef.current?.resetFields();
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }


  /**
   * @desc 删除标签
   * @param id
   */
  async onDeleteTag(id: Key) {
    try {
      const response: any = await deleteTag({ id });
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("删除标签成功");
    } catch (err) {
      message.error('删除标签失败');
      console.log(err);
    } finally {
      await this.fetchList(this.formRef.current?.getFieldsValue());
    }
  }

  /**
   * @desc 新增标签表单提交
   */
  async onSubmit(values: AddFormType) {
    try {
      const response: any = await addTag(values);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("新增标签成功");
    } catch (err) {
      message.error('新增标签失败');
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
                <Form.Item className="w-full" label="标签名称" name="name">
                  <Input placeholder="请输入标签名称" />
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
          新增标签
        </Button>
        <Table<TagModel> bordered dataSource={this.state.dataSource} loading={this.state.loading}
                         rowKey={record => record._id}>
          <Table.Column<TagModel> title="标签名" dataIndex="name" align="center" />
          <Table.Column<TagModel> title="标签创建时间" dataIndex="createTime" align="center"
                                  render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")} />
          <Table.Column<TagModel>
            title="操作"
            align="center"
            render={(_, row) => (
              <Space>
                <Button type="link" icon={<FormOutlined />}>编辑</Button>
                <Popconfirm
                  title={
                    <Space>
                      <Text>确定删除标签</Text>
                      <Text type="danger" strong>{row.name}</Text>
                      <Text>吗?</Text>
                    </Space>
                  }
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => this.onDeleteTag(row._id)}>
                  <Button danger type="link" icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
        {/* 新增标签的表单弹窗 */}
        <Modal destroyOnClose title="新增标签" visible={this.state.visible}
               onCancel={() => this.setState({ visible: false })} footer={null}>
          <Form ref={this.addFormRef} {...addFormLayout} onFinish={values => this.onSubmit(values)}>
            <Form.Item className="w-full" label="标签名称" name="name" rules={[{ required: true, message: "标签名称不能为空!" }]}>
              <Input placeholder="请输入标签名称" />
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
