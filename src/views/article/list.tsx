import React, { FC, useState, useEffect } from "react";
import { Table, Space, Card, Form, Input, Button, Row, Col, Select, DatePicker, Tag, Switch } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";

interface Article {
  key: number;
  articleId: string;
  title: string;
  author: string;
  keywords: string[];
  thumbUrl: string;
  tag: string[];
  category: string;
  releaseStatus: 0 | 1; // 0 未发布 1 已发布
  source: 0 | 1; // 0 原创 1 转载
  createTime: Date;
}

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

const { Option } = Select;
const { RangePicker } = DatePicker;

const ArticleList: FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<Article>>([]);

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
      const fetchData = await axios.get("/api/article/list");
      console.log(fetchData);
      setDataSource(fetchData.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description 发布状态切换监听事件
   * @param val 
   * @param row 
   */
  const onSwitchReleaseStatus = (val: boolean, row: Article) => {
    const newData = [...dataSource];
    const target = newData.find((item) => item.articleId === row.articleId);
    if (target) {
      target.releaseStatus = val ? 1 : 0;
    }
    setDataSource(newData);
  };

  useEffect(() => {
    queryList();
  }, []);

  return (
    <Space className="w-full" direction="vertical" size="large">
      <Card>
        <Form {...formLayout} form={form} layout="inline" onFinish={onSearch}>
          <Row justify="space-between" gutter={[8, 8]}>
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
              <Form.Item className="w-full" label="关键字" name="keywords">
                <Input className="w-full" placeholder="请输入关键字" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="文章标签" name="tag">
                <Select
                  mode="multiple"
                  showArrow
                  maxTagCount={"responsive" as const}
                  placeholder="请选择文章标签"
                  allowClear
                >
                  <Option value="vue">vue</Option>
                  <Option value="react">react</Option>
                  <Option value="angular">angular</Option>
                  <Option value="node">node</Option>
                  <Option value="typescript">typescript</Option>
                  <Option value="mongo">mongo</Option>
                  <Option value="redis">redis</Option>
                  <Option value="mysql">mysql</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="文章分类" name="category">
                <Select placeholder="请选择文章分类" allowClear>
                  <Option value="前端">前端</Option>
                  <Option value="后端">后端</Option>
                  <Option value="数据库">数据库</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item className="w-full" label="发布状态" name="releaseStatus">
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
      <Table<Article> bordered dataSource={dataSource} loading={loading} rowKey={(record) => record.articleId}>
        <Table.Column<Article> title="文章标题" dataIndex="title" align="center"></Table.Column>
        <Table.Column<Article> title="文章作者" dataIndex="author" align="center"></Table.Column>
        <Table.Column<Article>
          title="关键字"
          dataIndex="keywords"
          align="center"
          render={(keywords: string[]) => (
            <>
              {keywords.map((keyword, index) => (
                <Tag color="blue" key={keyword + index}>
                  {keyword}
                </Tag>
              ))}
            </>
          )}
        ></Table.Column>
        <Table.Column<Article> title="封面图" dataIndex="thumbUrl" align="center"></Table.Column>
        <Table.Column<Article>
          title="文章标签"
          dataIndex="tag"
          align="center"
          render={(tag: string[]) => (
            <>
              {tag.map((item, index) => (
                <Tag color="blue" key={item + index}>
                  {item}
                </Tag>
              ))}
            </>
          )}
        ></Table.Column>
        <Table.Column<Article>
          title="文章分类"
          dataIndex="category"
          align="center"
          render={(category) => <Tag color="blue">{category}</Tag>}
        ></Table.Column>
        <Table.Column<Article>
          title="文章发布状态"
          dataIndex="releaseStatus"
          align="center"
          render={(releaseStatus, row) => (
            <Switch
              checkedChildren="已发布"
              unCheckedChildren="未发布"
              checked={releaseStatus === 1}
              onChange={(checked) => onSwitchReleaseStatus(checked, row)}
            />
          )}
        ></Table.Column>
        <Table.Column<Article>
          title="文章来源"
          dataIndex="source"
          align="center"
          render={(source) =>
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
        ></Table.Column>
        <Table.Column<Article> title="文章创建时间" dataIndex="createTime" align="center"></Table.Column>
        <Table.Column<Article> title="操作" align="center"></Table.Column>
      </Table>
    </Space>
  );
};

export default ArticleList;
