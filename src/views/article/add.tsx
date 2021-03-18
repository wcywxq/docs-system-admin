import React, { FC, useState, useCallback, useEffect } from "react";
import { Card, ColProps, Form, Input, Select, Upload, message, Button, Row, Col, Space, notification } from "antd";
import { LoadingOutlined, UploadOutlined, RedoOutlined, CheckOutlined } from "@ant-design/icons";
import { getCategoryList } from "../../apis/category";
import { getTagList } from "../../apis/tag";
import type { UploadChangeParam } from "antd/lib/upload";
import type { RcFile, UploadFile } from "antd/lib/upload/interface";

const { TextArea } = Input;
const { Option } = Select;

const formLayout = {
  labelCol: { xs: 24, sm: 4 },
  wrapperCol: { xs: 24, sm: 20 }
};

const ArticleAdd: FC = () => {
  const [form] = Form.useForm();
  // 标签和分类配置项
  const [tagOptions, setTagOptions] = useState<any[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  // 上传封面图最大上传限制
  const MAX_COUNT = 1;
  // 表单数据
  const [formData, setFormData] = useState({
    thumbUrl: "" // 封面图
  });
  // loading 对象
  const [loading, setLoading] = useState({
    thumbUrl: false // 封面图上传的 loading 状态
  });

  /**
   * @desc 获取标签列表
   */
  const fetchTagList = async () => {
    try {
      const result = await getTagList();
      setTagOptions(result.data);
    } catch (err) {
      notification.error({ message: `获取标签数据失败: ${err}` });
    }
  };

  /**
   * @desc 获取分类列表
   */
  const fetchCategoryList = async () => {
    try {
      const result = await getCategoryList();
      setCategoryOptions(result.data);
    } catch (err) {
      notification.error({ message: `获取分类数据失败: ${err}` });
    }
  };

  /**
   * @desc 提交
   */
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  /**
   * @desc 表单内容重置
   */
  const handleReset = () => {
    form.resetFields();
  };

  /**
   * @desc 封面图上传前的回调
   */
  const handleThumbUrlBeforeUpload = useCallback((file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }, []);

  /**
   * @desc 封面图上传变化的回调
   */
  const handleThumbUrlChange = useCallback(
    (info: UploadChangeParam<UploadFile<any>>) => {
      if (info.file.status === "uploading") {
        setLoading({ ...loading, thumbUrl: true });
        return;
      }
      if (info.file.status === "done") {
        const reader = new FileReader();
        console.log(reader.result);
        reader.addEventListener("load", () => () => {
          setFormData({ ...form, thumbUrl: reader.result as string });
          setLoading({ ...loading, thumbUrl: false });
        });
        info.file.originFileObj && reader.readAsDataURL(info.file.originFileObj);
      }
    },
    [form, loading]
  );

  useEffect(() => {
    fetchTagList();
  }, []);

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Card>
      <Form layout="inline" labelAlign="left" form={form} {...formLayout} onFinish={handleSubmit}>
        <Row gutter={[0, 16]}>
          <Col span={12}>
            <Form.Item label="标题" name="title" rules={[{ required: true, message: "文章标题不能为空!" }]}>
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="分类" rules={[{ required: true, message: "请选择文章分类!" }]}>
              <Select placeholder="请选择文章分类">
                {tagOptions.map(tag => (
                  <Option key={tag.tag_id} value={tag.tag_id}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="简介" name="desc" rules={[{ required: true, message: "文章简介不能为空!" }]}>
              <TextArea className="w-full" placeholder="请输入文章简介" autoSize={{ minRows: 5 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="标签" rules={[{ required: true, message: "请选择文章标签" }]}>
              <Select mode="multiple" placeholder="请选择选择标签" showArrow>
                {categoryOptions.map(cate => (
                  <Option key={cate.category_id} value={cate.category_id}>
                    {cate.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="内容" name="content" rules={[{ required: true, message: "文章内容不能为空!" }]}>
              <TextArea placeholder="请输入文章内容，支持 markdown 格式" autoSize={{ minRows: 50 }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="封面图" name="thumbUrl" rules={[{ required: true, message: "封面图不能为空!" }]}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                showUploadList={false}
                maxCount={MAX_COUNT}
                beforeUpload={handleThumbUrlBeforeUpload}
                onChange={handleThumbUrlChange}>
                {formData.thumbUrl ? (
                  <img className="w-full" src={formData.thumbUrl} alt="avatar" />
                ) : (
                  <div>
                    {loading.thumbUrl ? <LoadingOutlined /> : <UploadOutlined />}
                    <div className="mt-2">封面图</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24} className="text-center">
            <Form.Item>
              <Space>
                <Button htmlType="button" icon={<RedoOutlined />} onClick={handleReset}>
                  重置
                </Button>
                <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
                  完成
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ArticleAdd;
