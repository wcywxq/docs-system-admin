import { useState } from "react";
import { message } from "antd";
import { upload } from "../apis/utils";
import type { RcFile } from "antd/lib/upload";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

export default function useUpload() {
  const [fileList, setFileList] = useState<any[]>([]);
  // 预览图
  const [preview, setPreview] = useState({ visible: false, url: "" });
  // 最大上传数量限制
  const maxCount = 1;

  /**
   * @desc 覆盖默认的上传方法
   */
  const customRequest = (params: any) => {
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
   * @desc 上传前的回调
   */
  const beforeUpload = (file: RcFile) => {
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
  const uploadPreview = (file: UploadFile<any>) => setPreview({ visible: true, url: file.url ?? "" });

  /**
   * @desc 图片移除的回调
   */
  const uploadRemove = () => setFileList([]);

  /**
   * @desc 可控 fileList 发生变化的监听
   */
  const uploadChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => setFileList(fileList);

  /**
   * @desc 图片预览的取消操作
   */
  const uploadCancelPreview = () => setPreview({ visible: false, url: "" });

  return { fileList, preview, maxCount, customRequest, beforeUpload, uploadPreview, uploadRemove, uploadChange, uploadCancelPreview };
}
