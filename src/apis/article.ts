import request from '../utils/request';

const URL = {
    GET_ARTICLE_LIST: '/article/list',
    GET_ARTICLE_BYID: '/article/item',
    ADD_ARTICLE: '/article/add',
    DELETE_ARTICLE: '/article/delete',
    UPDATE_STATUS: '/article/update_status'
};

/**
 * @desc 获取文章列表
 * @param params 查询参数
 */
export const getArticleList = (params?: any) => request({ url: URL.GET_ARTICLE_LIST, params });

/**
 * @desc 根据 id 获取文章列表
 * @param id 查询参数
 */
export const getArticleById = (params?: any) => request({ url: URL.GET_ARTICLE_BYID, params });

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

/**
 * @desc 更新文章发布状态
 * @param data 请求体
 */
 export const updateArticleStatus = (data: any) => request({ method: "POST", url: URL.UPDATE_STATUS, data });