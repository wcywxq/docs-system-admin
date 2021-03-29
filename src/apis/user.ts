import request from "../utils/request";

const URL = {
    USER_LOGIN: '/user/login',
    USER_REGISTER: '/user/register',
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