import React, { FC, useState } from "react";
import {
  Card,
  ColProps,
  Form,
  Input,
  Select,
  Checkbox,
  CheckboxOptionType,
  Col,
  Row,
  Switch,
  Upload,
  message,
  Button,
} from "antd";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import useCheckGroup from "../../hooks/useCheckGroup";

const { TextArea } = Input;
const { Option } = Select;

const labelCol: ColProps = { span: 4 };
const wrapperCol: ColProps = { span: 14 };

const tagOptions: Array<CheckboxOptionType> = [
  { label: "标签1", value: "标签1" },
  { label: "标签2", value: "标签2" },
  { label: "标签3", value: "标签3" },
  { label: "标签4", value: "标签4" },
];

const ArticleAdd: FC = () => {
  const { indeterminate, checkAll, checkList, onCheckAllChange, onCheckChange } = useCheckGroup(tagOptions);
  const [checked, setChecked] = useState(false);
  const maxCount = 1; // 最大上传限制
  const [file, setFile] = useState<any>(null); // 上传的文件
  const [thumbUrl, setThumbUrl] = useState<string>(""); // 上传的封面图
  const [uploadThumbUrlLoading, setUploadThumbUrlLoading] = useState<boolean>(false);

  const onSwitchChange = (val: boolean) => setChecked(val);

  return (
    <Card>
      <Form labelCol={labelCol} wrapperCol={wrapperCol} layout="horizontal">
        <Form.Item label="标题">
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item label="简介">
          <TextArea placeholder="请输入文章简介" autoSize={{ minRows: 5 }} />
        </Form.Item>
        <Form.Item label="分类">
          <Select placeholder="请选择文章分类">
            <Option value="分类1">分类1</Option>
            <Option value="分类2">分类2</Option>
            <Option value="分类3">分类3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="选择标签">
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>
                全选
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox.Group options={tagOptions} value={checkList} onChange={onCheckChange} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="内容">
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Switch checkedChildren="编辑" unCheckedChildren="导入" checked={checked} onChange={onSwitchChange} />
            </Col>
            <Col span={24}>
              {checked ? (
                <TextArea placeholder="请输入文章内容，支持 markdown 格式" autoSize={{ minRows: 50 }} />
              ) : (
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // headers={{ authorization: 'authorization-text' }}
                  maxCount={maxCount}
                  onChange={(info) => {
                    if (info.file.status !== "uploading") {
                      console.log(info.file, info.fileList);
                    }
                    if (info.file.status === "done") {
                      message.success(`${info.file.name} file uploaded successfully`);
                      setFile(info.file);
                    } else {
                      message.error(`${info.file.name} file upload failed`);
                    }
                  }}
                >
                  {file ? null : <Button icon={<UploadOutlined />}>本地文章上传</Button>}
                </Upload>
              )}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="封面图">
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
      </Form>
    </Card>
  );
  // readonly title: string;
  // readonly description: string;
  // readonly publishTime: Date;
  // readonly createTime: Date;
  // readonly countStatis: CountStatis;
  // readonly likedCount: number;
  // readonly categories: string[];
  // readonly tags: string[];
  // readonly creator: string;
  // readonly avatar: string;
  // readonly duration: number;
  // readonly content: string;
};

export default ArticleAdd;
