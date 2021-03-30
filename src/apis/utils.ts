import request from '../utils/request';

const URL = {
    UPLOAD: '/upload'
};

/**
 * @desc 上传文件
 * @param data 请求体
 */
export const upload = (data: any) => request({ url: URL.UPLOAD, method: "POST", data });