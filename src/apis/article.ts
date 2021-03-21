import request from '../utils/request';

const URL = {
    GET_ARTICLE_LIST: '/article/list',
    ADD_ARTICLE: '/article/add'
};

/**
 * @desc 获取文章列表
 */
export const getArticleList = () => request({ url: URL.GET_ARTICLE_LIST });

/**
 * @desc 添加文章
 * @param data 请求体
 */
export const addArticle = (data: any) => request({ method: "POST", url: URL.ADD_ARTICLE, data })