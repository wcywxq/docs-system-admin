import request from '../utils/request';

const URL = {
    GET_TAG_LIST: '/tag/list'
};

/**
 * @desc 获取文章列表
 */
export const getTagList = () => request({ url: URL.GET_TAG_LIST });