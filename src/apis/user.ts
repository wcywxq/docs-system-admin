import request from "../utils/request";

const URL = {
    USER_LOGIN: '/user/login',
    USER_REGISTER: '/user/register',
    USER_LIST: '/user/list',
    USER_DELETE: '/user/delete'
};

/**
 * @desc 登陆
 * @param data 请求体
 */
 export const userLogin = (data: any) => request({ method: "POST", url: URL.USER_LOGIN, data });

/**
 * @desc 注册
 * @param data 请求体
 */
 export const userRegister = (data: any) => request({ method: "POST", url: URL.USER_REGISTER, data });

 /**
 * @desc 获取所有用户
 * @param params 查询参数
 */
export const getUserList = (params?: any) => request({ url: URL.USER_LIST, params });

/**
 * @desc 删除用户
 * @param data 请求体
 */
 export const deleteUser = (data: any) => request({ method: "POST", url: URL.USER_DELETE, data });