import request from '../utils/request';

const URL = {
    GET_CATEGORY_LIST: '/category/list'
};

/**
 * @desc 获取文章列表
 */
export const getCategoryList = () => request({ url: URL.GET_CATEGORY_LIST });