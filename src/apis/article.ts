import request from '../utils/request';

const URL = {
    GET_ARTICLE_LIST: '/article/list'
};

/**
 * @desc 获取文章列表
 */
export const getArticleList = () => request({ url: URL.GET_ARTICLE_LIST });