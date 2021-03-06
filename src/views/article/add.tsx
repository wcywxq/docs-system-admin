import { FC, useCallback, useEffect, useState, memo } from "react";
import { Card, Form, Input, Select, Upload, message, Button, Row, Col, Space, Modal, Drawer } from "antd";
import { ImportOutlined, UploadOutlined, RedoOutlined, CheckOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelect, useUpload } from "../../hooks/components";
import { getCategoryList } from "../../apis/category";
import { getTagList } from "../../apis/tag";
import { addArticle } from "../../apis/article";
import RenderMarkdown from "../../components/RenderMarkdown";

const { TextArea } = Input;
const { Option } = Select;

const formLayout = {
  labelCol: { xs: 24, sm: 4 },
  wrapperCol: { xs: 24, sm: 20 }
};

const ArticleAdd: FC = () => {
  const [form] = Form.useForm();
  // 标签和分类配置项
  const { options: tagOptions } = useSelect(getTagList);
  const { options: categoryOptions } = useSelect(getCategoryList);

  // 内容相关 api
  const {
    fileList: contentList,
    maxCount: contentMaxCount,
    customRequest: contentCustomRequest,
    beforeUpload: contentBeforeUpload,
    uploadRemove: contentUploadRemove,
    uploadChange: contentUploadChange
  } = useUpload({ acceptType: "text/markdown", limitSize: 10 });

  // 封面图相关 api
  const {
    fileList: thumbUrlList,
    preview: thumbUrlPreview,
    maxCount: thumbUrlMaxCount,
    customRequest: thumbUrlCustomRequest,
    beforeUpload: thumbUrlBeforeUpload,
    uploadPreview: thumbUrlUploadPreview,
    uploadRemove: thumbUrlUploadRemove,
    uploadChange: thumbUrlUploadChange,
    uploadCancelPreview: thumbUrlUploadCancelPreview
  } = useUpload({ acceptType: "image/", limitSize: 1 });

  const [preview, setPreview] = useState(false);

  /**
   * @desc 表单内容重置
   */
  const handleReset = useCallback(() => {
    // 上传的缩略图重置
    thumbUrlUploadRemove();
    // 导入的文件重置
    contentUploadRemove();
    // 表单重置
    form.resetFields();
  }, [contentUploadRemove, form, thumbUrlUploadRemove]);

  /**
   * @desc 提交
   */
  const handleSubmit = useCallback(
    async (values: any) => {
      const requestBody = {
        ...values,
        thumbUrl: values.thumbUrl.file.response.url, // 封面图 url
        createTime: new Date().getTime() // 创建时间
      };
      try {
        const response: any = await addArticle(requestBody);
        if (response.resultCode === 0) {
          message.success("添加文章成功");
          // 表单重置
          handleReset();
        } else {
          message.error(`添加文章失败: ${JSON.stringify(response.errorMsg)}`);
        }
      } catch (err) {
        message.error(`添加文章失败: ${err}`);
      }
    },
    [handleReset]
  );

  // 动态获取导入的内容
  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const res = await axios(url);
        form.setFieldsValue({ content: res.data });
        message.success("导入内容成功");
      } catch (err) {
        message.error("获取导入内容失败!");
      }
    };
    if (contentList.length && contentList[0].url) {
      fetchData(contentList[0].url);
    }
  }, [contentList, form]);

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
            <Form.Item label="分类" name="category" rules={[{ required: true, message: "请选择文章分类!" }]}>
              <Select placeholder="请选择文章分类">
                {categoryOptions.map(cate => (
                  <Option key={cate.key} value={cate.key}>
                    {cate.name}
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
            <Form.Item label="标签" name="tags" rules={[{ required: true, message: "请选择文章标签" }]}>
              <Select mode="multiple" placeholder="请选择选择标签" showArrow>
                {tagOptions.map(tag => (
                  <Option key={tag.key} value={tag.key}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space className="mb-4">
              {/* 预览内容 */}
              <Button icon={<EyeOutlined />} onClick={() => setPreview(true)}>
                预览
              </Button>
              {/* 导入内容 */}
              <Upload
                accept="text/markdown"
                maxCount={contentMaxCount}
                beforeUpload={contentBeforeUpload}
                customRequest={contentCustomRequest}
                fileList={contentList}
                onRemove={contentUploadRemove}
                onChange={contentUploadChange}>
                {contentList.length ? null : <Button icon={<ImportOutlined />}>导入</Button>}
              </Upload>
            </Space>
            <Form.Item className="mt-2" label="内容" name="content" rules={[{ required: true, message: "文章内容不能为空!" }]}>
              <TextArea placeholder="请输入文章内容，支持 markdown 格式" autoSize={{ minRows: 10, maxRows: 20 }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="封面图"
              name="thumbUrl"
              rules={[
                {
                  required: true,
                  validator: (_, value, callback) => {
                    try {
                      if (value && value.fileList.length) callback();
                      throw new Error("请上传封面图!");
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}>
              <Upload
                listType="picture-card"
                accept="image/*"
                maxCount={thumbUrlMaxCount}
                beforeUpload={thumbUrlBeforeUpload}
                customRequest={thumbUrlCustomRequest}
                fileList={thumbUrlList}
                onPreview={thumbUrlUploadPreview}
                onRemove={thumbUrlUploadRemove}
                onChange={thumbUrlUploadChange}>
                {thumbUrlList.length ? null : (
                  <div>
                    <UploadOutlined />
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
      {/* 上传封面图图片预览 */}
      <Modal visible={thumbUrlPreview.visible} title={null} footer={null} onCancel={thumbUrlUploadCancelPreview}>
        <img alt="example" className="w-full" src={thumbUrlPreview.url} />
      </Modal>
      {/* 上传内容的预览 */}
      <Drawer destroyOnClose visible={preview} placement="top" height="100%" title="内容预览" footer={null} onClose={() => setPreview(false)}>
        <RenderMarkdown content={form.getFieldValue("content") || ""} />
      </Drawer>
    </Card>
  );
};

export default memo(ArticleAdd);
