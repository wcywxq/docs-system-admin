import React, { FC, useCallback, useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, Space, message, Input, DatePicker, Table, Popconfirm, Modal } from "antd";
import { getTagList, deleteTag, addTag } from "../../apis/tag";
import dayjs from "dayjs";

export type TagModel = {
  key: string;
  _id: string;
  name: string;
  createTime: Date;
};

const { useForm } = Form;
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

const TagPage: FC = () => {
  const [form] = useForm();
  const [addForm] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<TagModel>>([]);
  const [visible, setVisible] = useState(false);

  /**
   * @desc 查询
   * @param params
   */
  const fetchList = async (params?: any) => {
    setLoading(true);
    const query = {} as any;
    params.name && (query.name = params.name);
    params.createTime !== undefined && params.createTime.length && ([query.createBeginTime, query.createEndTime] = params.createTime.map((time: any) => dayjs(time).valueOf()));
    try {
      const response: any = await getTagList(query);
      if (response.resultCode === 0) {
        setDataSource(response.data.map((item: any) => ({ ...item, key: item._id })));
      } else {
        message.error(`获取标签列表失败: ${JSON.stringify(response.errorMsg)}`);
      }
    } catch (err) {
      message.error({ message: `获取标签列表失败: ${err}` });
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
   * @desc 删除标签
   * @param id 标签id
   */
  const handleDeleteTag = useCallback(
    async (id: string) => {
      try {
        const response: any = await deleteTag({ id });
        if (response.resultCode !== 0) {
          message.error(`删除标签失败: ${response.errorMsg.toString()}`);
        }
        message.success("删除标签成功");
      } catch (err) {
        message.error(err);
      } finally {
        fetchList(form.getFieldsValue());
      }
    },
    [form]
  );

  /**
   * @desc 新增标签的提交
   */
  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response: any = await addTag(values);
        if (response.resultCode !== 0) {
          message.error(`新增标签失败: ${response.errorMsg.toString()}`);
        }
        message.success("新增标签成功");
        setVisible(false);
        // 表单重置
        addForm.resetFields();
        fetchList(form.getFieldsValue());
      } catch (err) {
        message.error(`新增标签失败: ${err}`);
      }
    },
    [addForm, form]
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
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Button type="primary" onClick={() => setVisible(true)}>
        新增标签
      </Button>
      <Table<TagModel> bordered dataSource={dataSource} loading={loading} rowKey={record => record.key}>
        <Table.Column<TagModel> title="标签名" dataIndex="name" align="center" />
        <Table.Column<TagModel> title="标签创建时间" dataIndex="createTime" align="center" render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")} />
        <Table.Column<TagModel>
          title="操作"
          align="center"
          render={(_, row) => (
            <Space>
              <Button type="primary">编辑</Button>
              <Popconfirm
                title={
                  <span>
                    确定删除标签<span className="text-danger font-bold">{row.name}</span>吗?
                  </span>
                }
                okText="确定"
                cancelText="取消"
                onConfirm={() => handleDeleteTag(row.key)}>
                <Button danger type="primary">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      {/* 新增标签的表单弹窗 */}
      <Modal destroyOnClose title="新增标签" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Form form={addForm} {...addFormLayout} onFinish={onSubmit}>
          <Form.Item className="w-full" label="标签名称" name="name" rules={[{ required: true, message: "标签名称不能为空!" }]}>
            <Input placeholder="请输入标签名称" />
          </Form.Item>
          <Row align="middle" justify="end">
            <Space>
              <Button onClick={() => setVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Space>
          </Row>
        </Form>
      </Modal>
    </Space>
  );
};

export default TagPage;
