import React from "react";
import type { Key } from 'react';
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
  Tag,
  Switch,
  Avatar,
  Popconfirm,
  message,
  Typography,
  Badge
} from "antd";
import type { FormInstance } from 'antd';
import { Link } from "react-router-dom";
import { DeleteOutlined, FormOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { deleteArticle, getArticleList, updateArticleStatus } from "../../apis/article";
import dayjs from "dayjs";
import type { TagModel } from "../tag";
import type { CategoryModel } from "../category";
import valueEnumHoc from "../../Hoc/valueEnum";
import type { ValueEnumHocProps } from '../../Hoc/valueEnum';

type ArticleModel = {
  _id: Key;
  title: string;
  author: string;
  desc: string;
  thumbUrl: string;
  tags: TagModel[];
  category: CategoryModel;
  isPublish: 0 | 1; // 0 未发布 1 已发布
  source: 0 | 1; // 0 原创 1 转载
  createTime: Date;
  editable: boolean;
};

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

type IProps = ValueEnumHocProps;

type IState = {
  loading: boolean;
  dataSource: ArticleModel[];
  visible: boolean;
};

type SearchFormType = Partial<{
  title: string;
  author: string;
  tags: string[];
  category: string;
  isPublish: 0 | 1;
  source: 0 | 1;
  createTime: number[];
}>;

type QueryParamType = Partial<{
  title: string;
  author: string;
  tags: string;
  category: string;
  isPublish: 0 | 1;
  source: 0 | 1;
  createBeginTime: number;
  createEndTime: number;
}>;

class ArticleList extends React.PureComponent<IProps, IState> {
  private readonly formRef: React.RefObject<FormInstance>;

  constructor(props: IProps | Readonly<IProps>) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
      visible: false
    };
    this.formRef = React.createRef<FormInstance>();
  }

  async componentDidMount() {
    await this.props.request?.tag();
    await this.props.request?.category();
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }

  async fetchList(params: SearchFormType) {
    this.setState({ loading: true });
    const query: QueryParamType = {};
    query.title = params.title;
    query.author = params.author;
    query.tags = params.tags?.join();
    query.category = params.category;
    query.isPublish = params.isPublish;
    query.source = params.source;
    [query.createBeginTime, query.createEndTime] = params.createTime?.map(item => dayjs(item).valueOf()) || [];
    try {
      const response: any = await getArticleList(query);
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      this.setState({ dataSource: response.data });
    } catch (err) {
      message.error('获取文章列表失败');
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  /**
   * @desc 搜索
   * @param values
   */
  async onSearch(values: SearchFormType) {
    await this.fetchList(values);
  }

  /**
   * @desc 重置
   */
  async onReset() {
    this.formRef.current?.resetFields();
    await this.fetchList(this.formRef.current?.getFieldsValue());
  }

  /**
   * @desc 开始编辑
   * @param id
   * @param value
   */
  onEditArticle(id: Key, value: boolean) {
    const newData = [...this.state.dataSource];
    const target = newData.find(item => item._id === id);
    if (target) {
      target.editable = value;
      this.setState({ dataSource: newData });
    }
  }

  /**
   * @desc 删除文章
   * @param id
   */
  async onDeleteArticle(id: Key) {
    try {
      const response: any = await deleteArticle({ id });
      if (response.resultCode !== 0) throw new Error(response.errorMsg);
      message.success("删除文章成功");
    } catch (err) {
      message.error('删除文章失败');
      console.log(err);
    } finally {
      await this.fetchList(this.formRef.current?.getFieldsValue());
    }
  }

  /**
   * @desc 确定
   * @param obj
   */
  onOkArticle(obj: ArticleModel) {
    this.onEditArticle(obj._id, false);
  }

  /**
   * @desc 取消
   * @param obj
   */
  onCancelArticle(obj: ArticleModel) {
    this.onEditArticle(obj._id, false);
  }

  render() {
    return (
      <Space className="w-full" direction="vertical" size="large">
        <Card>
          <Form {...formLayout} ref={this.formRef} layout="horizontal" onFinish={values => this.onSearch(values)}>
            <Row justify="space-between" gutter={[8, 0]}>
              <Col span={8}>
                <Form.Item className="w-full" label="文章标题" name="title">
                  <Input placeholder="请输入文章标题" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className="w-full" label="文章作者" name="author">
                  <Select placeholder="请选择文章作者" allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className="w-full" label="文章标签" name="tags">
                  <Select mode="multiple" showArrow maxTagCount={"responsive" as const} placeholder="请选择文章标签"
                          allowClear>
                    {this.props.options?.tag?.map(tag => (
                      <Option key={tag._id} value={tag._id}>
                        {tag.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className="w-full" label="文章分类" name="category">
                  <Select placeholder="请选择文章分类" allowClear>
                    {this.props.options?.category?.map(cart => (
                      <Option key={cart._id} value={cart._id}>
                        {cart.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className="w-full" label="发布状态" name="isPublish">
                  <Select placeholder="全部" allowClear>
                    <Option value={0}>未发布</Option>
                    <Option value={1}>已发布</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item className="w-full" label="文章来源" name="source">
                  <Select placeholder="全部" allowClear>
                    <Option value={0}>原创</Option>
                    <Option value={1}>转载</Option>
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
                    <Button htmlType="button" onClick={() => this.onReset()}>
                      重置
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Table<ArticleModel>
          bordered
          size="small"
          dataSource={this.state.dataSource}
          loading={this.state.loading}
          rowKey={record => record._id}
        >
          <Table.Column<ArticleModel>
            title="文章标题"
            dataIndex="title"
            align="center"
            render={(scope: string, row) => <Link to={`/article/detail/${row._id}`}>{scope}</Link>}
          />
          <Table.Column<ArticleModel>
            title="文章作者"
            dataIndex="author"
            align="center"
          />
          <Table.Column<ArticleModel>
            title="文章简介"
            dataIndex="desc"
            align="center"
          />
          <Table.Column<ArticleModel>
            title="封面图"
            dataIndex="thumbUrl"
            align="center"
            render={(scope: string) => <Avatar src={scope} shape="square" size="large" />}
          />
          <Table.Column<ArticleModel>
            title="文章标签"
            dataIndex="tags"
            align="center"
            render={(tags: TagModel[]) => (
              <React.Fragment>
                {tags.map(tag => <Tag color="blue" key={tag._id}>{tag.name}</Tag>)}
              </React.Fragment>
            )}
          />
          <Table.Column<ArticleModel>
            title="文章分类"
            dataIndex="category"
            align="center"
            render={(_, row) => <Tag color="blue">{row.category.name}</Tag>}
          />
          <Table.Column<ArticleModel>
            title="下架/发布"
            dataIndex="isPublish"
            align="center"
            render={(scope: 0 | 1, row) => {
              const valueEnum: Record<0 | 1, { text: string; status?: "warning" | "success" | "default" | "processing" | "error"; color: string; }> = {
                0: { text: '已下架', status: 'error', color: 'error' },
                1: { text: '已发布', status: 'success', color: 'success' },
              };
              const defaultRender = valueEnum[scope] ?
                <Tag color={valueEnum[scope].color}><Badge status={valueEnum[scope].status} />{valueEnum[scope].text}
                </Tag> : null;
              const editRender = <Switch checked={!!row.isPublish} onChange={checked => {
                const newData = [...this.state.dataSource];
                const target = newData.find(item => item._id === row._id);
                if (target) {
                  target.isPublish = checked ? 1 : 0;
                  this.setState({ dataSource: newData });
                }
              }
              } />;
              return row.editable ? editRender : defaultRender;
            }}
          />
          <Table.Column<ArticleModel>
            title="文章来源"
            dataIndex="source"
            align="center"
            render={(scope: 0 | 1) => {
              const valueEnum = {
                0: { text: '转载', color: 'orange' },
                1: { text: '原创', color: 'purple' },
              };
              return valueEnum[scope] ? <Tag color={valueEnum[scope].color}>{valueEnum[scope].text}</Tag> : null;
            }}
          />
          <Table.Column<ArticleModel>
            title="文章创建时间"
            dataIndex="createTime"
            align="center"
            render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")}
          />
          <Table.Column<ArticleModel>
            title="操作"
            align="center"
            render={(_, row) => (
              <Space>
                {row.editable ? (
                  <React.Fragment>
                    <Button style={{ color: '#389e0d' }} type="link" icon={<CheckCircleOutlined />}
                            onClick={() => this.onOkArticle(row)}>确定</Button>
                    <Button style={{ color: '#d46b08' }} type="link" icon={<CloseCircleOutlined />}
                            onClick={() => this.onCancelArticle(row)}>取消</Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button type="link" icon={<FormOutlined />}
                            onClick={() => this.onEditArticle(row._id, true)}>编辑</Button>
                    <Popconfirm
                      title={
                        <Space>
                          <Text>确定删除文章</Text>
                          <Text type="danger" strong>{row.title}</Text>
                          <Text>吗?</Text>
                        </Space>
                      }
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => this.onDeleteArticle(row._id)}>
                      <Button danger type="link" icon={<DeleteOutlined />}>
                        删除
                      </Button>
                    </Popconfirm>
                  </React.Fragment>
                )}
              </Space>
            )}
          />
        </Table>
      </Space>
    );
  }
}

export default valueEnumHoc(ArticleList);
