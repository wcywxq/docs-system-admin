import request from '../utils/request';

const URL = {
    GET_CATEGORY_LIST: '/category/list',
    ADD_CATEGORY: '/category/add',
    DELETE_CATEGORY: '/category/delete',
};

/**
 * @desc 获取分类列表
 */
export const getCategoryList = (params?: any) => request({ url: URL.GET_CATEGORY_LIST, params });

/**
 * @desc 添加分类
 * @param data 请求体
 */
export const addCategory = (data: any) => request({ method: "POST", url: URL.ADD_CATEGORY, data });

/**
 * @desc 删除分类
 * @param data 请求体
 */
export const deleteCategory = (data: any) => request({ method: "POST", url: URL.DELETE_CATEGORY, data });
