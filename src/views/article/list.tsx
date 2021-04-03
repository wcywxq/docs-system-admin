import { FC, useState, useCallback, useEffect, Fragment, memo } from "react";
import { Table, Space, Card, Form, Input, Button, Row, Col, Select, DatePicker, Tag, Switch, Avatar, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import { deleteArticle, getArticleList, updateArticleStatus } from "../../apis/article";
import dayjs from "dayjs";
import { useSelect } from "../../hooks/components";
import { getTagList } from "../../apis/tag";
import { getCategoryList } from "../../apis/category";
import type { TagModel } from "../tag";
import type { CategoryModel } from "../category";

type ArticleModel = {
  key: string;
  title: string;
  author: string;
  desc: string;
  thumbUrl: string;
  tags: TagModel[];
  category: CategoryModel;
  isPublish: 0 | 1; // 0 未发布 1 已发布
  source: 0 | 1; // 0 原创 1 转载
  createTime: Date;
};

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

const ArticleList: FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<ArticleModel>>([]);
  const [statusLoading, setStatusLoading] = useState(false);
  const { options: tagOptions } = useSelect(getTagList);
  const { options: categoryOptions } = useSelect(getCategoryList);

  /**
   * @desc 查询
   * @param params
   */
  const fetchList = async (params?: any) => {
    setLoading(true);
    const query = {} as any;
    params.title && (query.title = params.title);
    params.author !== undefined && (query.author = params.author);
    params.tags !== undefined && params.tags.length && (query.tags = params.tags.join(","));
    params.category !== undefined && (query.category = params.category);
    params.isPublish !== undefined && (query.isPublish = params.isPublish);
    params.source !== undefined && (query.source = params.source);
    params.createTime !== undefined && params.createTime.length && ([query.createBeginTime, query.createEndTime] = params.createTime.map((time: any) => dayjs(time).valueOf()));
    try {
      const response: any = await getArticleList(query);
      if (response.resultCode === 0) {
        setDataSource(response.data.map((item: any) => ({ ...item, key: item._id })));
      } else {
        message.error(`获取文章列表失败: ${JSON.stringify(response.errorMsg)}`);
      }
    } catch (err) {
      message.error(`获取文章列表失败: ${JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @desc 查询
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
   * @desc 发布状态切换监听事件
   * @param val
   * @param row
   */
  const onSwitchisPublish = useCallback(
    async (val: boolean, row: ArticleModel) => {
      try {
        setStatusLoading(true);
        const response: any = await updateArticleStatus({ id: row.key, isPublish: val ? 1 : 0 });
        if (response.resultCode === 0) {
          val ? message.success("文章发布成功") : message.warning("文章已下架");
          fetchList(form.getFieldsValue());
        } else {
          message.error(`变更文章状态失败: ${JSON.stringify(response.errorMsg)}`);
        }
      } catch (err) {
        message.error(`变更文章状态失败: ${err}`);
      } finally {
        setStatusLoading(false);
      }
    },
    [form]
  );

  /**
   * @desc 删除文章
   * @param id 文章id
   */
  const handleDeleteArticle = useCallback(
    async (id: string) => {
      try {
        const response: any = await deleteArticle({ id });
        if (response.resultCode !== 0) {
          message.error(`删除文章失败: ${response.errorMsg.toString()}`);
        }
        message.success("删除文章成功");
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
                <Select mode="multiple" showArrow maxTagCount={"responsive" as const} placeholder="请选择文章标签" allowClear>
                  {tagOptions.map(tag => (
                    <Option key={tag.key} value={tag.key}>
                      {tag.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="文章分类" name="category">
                <Select placeholder="请选择文章分类" allowClear>
                  {categoryOptions.map(cate => (
                    <Option key={cate.key} value={cate.key}>
                      {cate.name}
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
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table<ArticleModel> bordered dataSource={dataSource} loading={loading} rowKey={record => record.key}>
        <Table.Column<ArticleModel> title="文章标题" dataIndex="title" align="center" render={(title, row) => <Link to={`/article/detail/${row.key}`}>{title}</Link>} />
        <Table.Column<ArticleModel> title="文章作者" dataIndex="author" align="center" />
        <Table.Column<ArticleModel> title="文章简介" dataIndex="desc" align="center" />
        <Table.Column<ArticleModel> title="封面图" dataIndex="thumbUrl" align="center" render={thumbUrl => <Avatar src={thumbUrl} shape="square" size="large" />} />
        <Table.Column<ArticleModel>
          title="文章标签"
          dataIndex="tags"
          align="center"
          render={(tags: TagModel[]) => (
            <Fragment>
              {tags.map(tag => {
                return (
                  <Tag color="blue" key={tag._id}>
                    {tag.name}
                  </Tag>
                );
              })}
            </Fragment>
          )}
        />
        <Table.Column<ArticleModel> title="文章分类" dataIndex="category" align="center" render={(category: CategoryModel | null) => <Tag color="blue">{category?.name}</Tag>} />
        <Table.Column<ArticleModel>
          title="下架/发布"
          dataIndex="isPublish"
          align="center"
          render={(isPublish, row) => <Switch loading={statusLoading} checked={isPublish === 1} onChange={checked => onSwitchisPublish(checked, row)} />}
        />
        <Table.Column<ArticleModel>
          title="文章来源"
          dataIndex="source"
          align="center"
          render={source =>
            source === 1 ? (
              <Tag color="purple">
                <span>原创</span>
              </Tag>
            ) : (
              <Tag color="orange">
                <span>转载</span>
              </Tag>
            )
          }
        />
        <Table.Column<ArticleModel> title="文章创建时间" dataIndex="createTime" align="center" render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")} />
        <Table.Column<ArticleModel>
          title="操作"
          align="center"
          render={(_, row) => (
            <Space>
              <Button type="primary">编辑</Button>
              <Popconfirm
                title={
                  <span>
                    确定删除文章<span className="text-danger font-bold">{row.title}</span>吗?
                  </span>
                }
                okText="确定"
                cancelText="取消"
                onConfirm={() => handleDeleteArticle(row.key)}>
                <Button danger type="primary">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </Space>
  );
};

export default memo(ArticleList);
