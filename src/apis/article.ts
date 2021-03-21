import request from '../utils/request';

const URL = {
    GET_ARTICLE_LIST: '/article/list',
    ADD_ARTICLE: '/article/add',
    DELETE_ARTICLE: '/article/delete'
};

/**
 * @desc 获取文章列表
 * @param params 查询参数
 */
export const getArticleList = (params: any) => request({ url: URL.GET_ARTICLE_LIST, params });

/**
 * @desc 添加文章
 * @param data 请求体
 */
export const addArticle = (data: any) => request({ method: "POST", url: URL.ADD_ARTICLE, data })

/**
 * @desc 删除文章
 * @param data 请求体
 */
export const deleteArticle = (data: any) => request({ method: "POST", url: URL.DELETE_ARTICLE, data });