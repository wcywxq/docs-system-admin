import React, { FC, useState } from "react";
import { Card, ColProps, Form, Input, Select, Upload, message, Button, Row, Col, Space } from "antd";
import { LoadingOutlined, PlusOutlined, RedoOutlined, CheckOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const formColsLayout = {
  labelCol: { xs: 24, sm: 3 },
  wrapperCol: { xs: 24, sm: 21 },
};

const formRowsLayout = {
  labelCol: { xs: 24, sm: 1 },
  wrapperCol: { xs: 24, sm: 23 },
};

const ArticleAdd: FC = () => {
  const maxCount = 1; // 最大上传限制
  const [thumbUrl, setThumbUrl] = useState<string>(""); // 上传的封面图
  const [uploadThumbUrlLoading, setUploadThumbUrlLoading] = useState<boolean>(false);

  return (
    <Card>
      <Form layout="horizontal" {...formColsLayout} labelAlign="left">
        <Row gutter={[32, 0]}>
          <Col span={8}>
            <Form.Item label="标题">
              <Input placeholder="请输入文章标题" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="分类">
              <Select placeholder="请选择文章分类">
                <Option value="分类1">分类1</Option>
                <Option value="分类2">分类2</Option>
                <Option value="分类3">分类3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签">
              <Select mode="multiple" placeholder="请选择选择标签" showArrow>
                <Option value="标签1">标签1</Option>
                <Option value="标签2">标签2</Option>
                <Option value="标签3">标签3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="简介" {...formRowsLayout}>
              <TextArea placeholder="请输入文章简介" autoSize={{ minRows: 5 }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="内容" {...formRowsLayout}>
              <TextArea placeholder="请输入文章内容，支持 markdown 格式" autoSize={{ minRows: 50 }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="封面图" {...formRowsLayout}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                showUploadList={false}
                maxCount={maxCount}
                beforeUpload={(file) => {
                  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
                  if (!isJpgOrPng) {
                    message.error("You can only upload JPG/PNG file!");
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error("Image must smaller than 2MB!");
                  }
                  return isJpgOrPng && isLt2M;
                }}
                onChange={(info) => {
                  if (info.file.status === "uploading") {
                    setUploadThumbUrlLoading(true);
                    return;
                  }
                  if (info.file.status === "done") {
                    const reader = new FileReader();
                    console.log(reader.result);
                    reader.addEventListener("load", () => () => {
                      setThumbUrl(reader.result as string);
                      setUploadThumbUrlLoading(false);
                    });
                    info.file.originFileObj && reader.readAsDataURL(info.file.originFileObj);
                  }
                }}
              >
                {thumbUrl ? (
                  <img className="w-full" src={thumbUrl} alt="avatar" />
                ) : (
                  <div>
                    {uploadThumbUrlLoading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div className="mt-2">上传</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col span={24} className="text-center">
            <Form.Item>
              <Space>
                <Button icon={<RedoOutlined />}>重置</Button>
                <Button type="primary" icon={<CheckOutlined />}>
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
