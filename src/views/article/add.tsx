import { FC, useCallback, useState } from "react";
import { Card, Form, Input, Select, Upload, message, Button, Row, Col, Space, Modal } from "antd";
import { UploadOutlined, RedoOutlined, CheckOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import useSelect from "../../hooks/useSelect";
import { getCategoryList } from "../../apis/category";
import { getTagList } from "../../apis/tag";
import { upload } from "../../apis/utils";
import { addArticle } from "../../apis/article";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

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
  // 上传封面图最大上传限制
  const MAX_COUNT = 1;
  const [fileList, setFileList] = useState<any[]>([]);
  const [preview, setPreview] = useState({ visible: false, url: "" });

  /**
   * @desc 覆盖默认的上传方法
   */
  const uploadCustomRequest = (params: any) => {
    const { file, onSuccess } = params;
    // 文件读取
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = async () => {
      // base64 数据
      const base64Data = reader.result;
      if (base64Data) {
        try {
          // 生成 url
          const response: any = await upload({ name: file.name, data: base64Data });
          if (response.resultCode !== 0) throw new Error(`封面图上传失败: ${response.errorMsg}`);
          // 成功的回调，用来设置返回结构
          onSuccess(response.data);
          // 设置可控的 fileList
          setFileList([{ name: file.name, url: response.data.url }]);
        } catch (err) {
          message.error(err);
        }
      }
    };
    reader.onerror = () => {
      message.error("封面图上传失败");
    };
  };

  /**
   * @desc 封面图上传前的回调
   */
  const uploadThumbUrlBeforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!file.type.includes("image/")) {
      message.error("不支持的文件类型!");
    }
    if (!isLt2M) {
      message.error("上传文件大小不能超过 1MB!");
    }
    return isLt2M;
  };

  /**
   * @desc 图片预览的回调
   */
  const uploadThumbUrlPreview = (file: UploadFile<any>) => setPreview({ visible: true, url: file.url ?? "" });

  /**
   * @desc 图片移除的回调
   */
  const uploadThumbUrlRemove = () => setFileList([]);

  /**
   * @desc 可控 fileList 发生变化的监听
   */
  const uploadThumbUrlChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => setFileList(fileList);

  /**
   * @desc 图片预览的取消操作
   */
  const uploadThumbUrlCancelPreview = () => setPreview({ visible: false, url: "" });

  /**
   * @desc 表单内容重置
   */
  const handleReset = useCallback(() => {
    form.resetFields();
    uploadThumbUrlRemove();
  }, [form]);

  /**
   * @desc 提交
   */
  const handleSubmit = useCallback(async (values: any) => {
    const requestBody = {
      ...values,
      thumbUrl: values.thumbUrl.file.response.url, // 封面图 url
      createTime: new Date().getTime() // 创建时间
    };
    try {
      const response: any = await addArticle(requestBody);
      if (response.resultCode === 0) {
        message.success('添加文章成功');
        // 表单重置
        handleReset();
      } else {
        message.error(`添加文章失败: ${JSON.stringify(response.errorMsg)}`);
      }
    } catch (err) {
      message.error(`添加文章失败: ${err}`);
    }
  }, [handleReset]);

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
                  <Option key={cate._id} value={cate._id}>
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
                  <Option key={tag._id} value={tag._id}>
                    {tag.name}
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
                maxCount={MAX_COUNT}
                beforeUpload={uploadThumbUrlBeforeUpload}
                customRequest={uploadCustomRequest}
                fileList={fileList}
                onPreview={uploadThumbUrlPreview}
                onRemove={uploadThumbUrlRemove}
                onChange={uploadThumbUrlChange}>
                {fileList.length === 1 ? null : (
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
      <Modal visible={preview.visible} title={null} footer={null} onCancel={uploadThumbUrlCancelPreview}>
        <img alt="example" className="w-full" src={preview.url} />
      </Modal>
    </Card>
  );
};

export default ArticleAdd;
