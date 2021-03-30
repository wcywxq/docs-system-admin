import React, { FC, useCallback, useEffect, useState } from "react";
import { Card, Form, Row, Col, Button, Space, message, Input, DatePicker, Table, Popconfirm, Modal } from "antd";
import { getCategoryList, deleteCategory, addCategory } from "../../apis/category";
import dayjs from "dayjs";

export type CategoryModel = {
  key: string;
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

const CategoryPage: FC = () => {
  const [form] = useForm();
  const [addForm] = useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Array<CategoryModel>>([]);
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
      const response: any = await getCategoryList(query);
      if (response.resultCode === 0) {
        setDataSource(response.data.map((item: any) => ({ ...item, key: item._id })));
      } else {
        message.error(`获取分类列表失败: ${JSON.stringify(response.errorMsg)}`);
      }
    } catch (err) {
      message.error({ message: `获取分类列表失败: ${err}` });
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
   * @desc 删除分类
   * @param id 分类id
   */
  const handledeleteCategory = useCallback(
    async (id: string) => {
      try {
        const response: any = await deleteCategory({ id });
        if (response.resultCode !== 0) {
          message.error(`删除分类失败: ${response.errorMsg.toString()}`);
        }
        message.success("删除分类成功");
      } catch (err) {
        message.error(err);
      } finally {
        fetchList(form.getFieldsValue());
      }
    },
    [form]
  );

  /**
   * @desc 新增分类的提交
   */
  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response: any = await addCategory(values);
        if (response.resultCode !== 0) {
          message.error(`新增分类失败: ${response.errorMsg.toString()}`);
        }
        message.success("新增分类成功");
        setVisible(false);
        // 表单重置
        addForm.resetFields();
        fetchList(form.getFieldsValue());
      } catch (err) {
        message.error(`新增分类失败: ${err}`);
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
        新增分类
      </Button>
      <Table<CategoryModel> bordered dataSource={dataSource} loading={loading} rowKey={record => record.key}>
        <Table.Column<CategoryModel> title="分类名" dataIndex="name" align="center" />
        <Table.Column<CategoryModel> title="分类创建时间" dataIndex="createTime" align="center" render={scope => dayjs(scope).format("YYYY-MM-DD HH:mm:ss")} />
        <Table.Column<CategoryModel>
          title="操作"
          align="center"
          render={(_, row) => (
            <Space>
              <Button type="primary">编辑</Button>
              <Popconfirm
                title={
                  <span>
                    确定删除分类<span className="text-danger font-bold">{row.name}</span>吗?
                  </span>
                }
                okText="确定"
                cancelText="取消"
                onConfirm={() => handledeleteCategory(row.key)}>
                <Button danger type="primary">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
      {/* 新增分类的表单弹窗 */}
      <Modal destroyOnClose title="新增分类" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Form form={addForm} {...addFormLayout} onFinish={onSubmit}>
          <Form.Item className="w-full" label="分类名称" name="name" rules={[{ required: true, message: "分类名称不能为空!" }]}>
            <Input placeholder="请输入分类名称" />
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

export default CategoryPage;
