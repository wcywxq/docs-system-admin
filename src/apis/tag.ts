import request from "../utils/request";

const URL = {
  GET_TAG_LIST: "/tag/list",
  ADD_TAG: "/tag/add",
  DELETE_TAG: "/tag/delete"
};

/**
 * @desc 获取标签列表
 */
export const getTagList = (params?: any) => request({ url: URL.GET_TAG_LIST, params });

/**
 * @desc 添加标签
 * @param data 请求体
 */
export const addTag = (data: any) => request({ method: "POST", url: URL.ADD_TAG, data });

/**
 * @desc 删除标签
 * @param data 请求体
 */
export const deleteTag = (data: any) => request({ method: "POST", url: URL.DELETE_TAG, data });
