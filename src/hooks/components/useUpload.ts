import { useState } from "react";
import { message } from "antd";
import { upload } from "../../apis/utils";
import type { RcFile } from "antd/lib/upload";
import type { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";

/**
 * @desc 上传文件的 hook
 * @param request
 * @returns
 */
export function useUpload({ acceptType, limitSize }: { acceptType: string; limitSize: number }) {
  const [fileList, setFileList] = useState<any[]>([]);
  // 预览图
  const [preview, setPreview] = useState({ visible: false, url: "" });
  // 最大上传数量限制
  const maxCount = 1;

  /**
   * @desc 覆盖默认的上传方法
   */
  const customRequest = (params: any) => {
    try {
      const { file, onSuccess } = params;
      // 文件读取
      const reader = new FileReader();
      reader.readAsDataURL(file as Blob);
      reader.onload = async () => {
        // base64 数据
        const base64Data = reader.result;
        if (base64Data) {
          // 生成 url
          const response: any = await upload({ name: file.name, data: base64Data });
          if (response.resultCode !== 0) {
            message.error(response.errorMsg);
          } else {
            // 成功的回调，用来设置返回结构
            onSuccess(response.data);
            // 设置可控的 fileList
            setFileList([{ name: file.name, url: response.data.url }]);
          }
        }
      };
      reader.onerror = () => {
        message.error("封面图上传失败");
      };
    } catch (err) {
       throw new Error(err);
    }
  };

  /**
   * @desc 上传前的回调
   */
  const beforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < limitSize;
    if (!file.type.includes(acceptType)) {
      message.error("不支持的文件类型!");
    }
    if (!isLt2M) {
      message.error(`上传文件大小不能超过 ${limitSize}MB!`);
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
