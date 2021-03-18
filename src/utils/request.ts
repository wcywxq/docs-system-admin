import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type ErrResponseMap = {
  200: string;
  201: string;
  202: string;
  204: string;
  400: string;
  401: string;
  403: string;
  404: string;
  406: string;
  410: string;
  422: string;
  500: string;
  502: string;
  503: string;
  504: string;
};

const request = axios.create({
  withCredentials: true,
  baseURL: "/api",
  timeout: 0 // 0 => 不设置超时时间
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  err => {
    const errResponseMap: ErrResponseMap = {
      200: "请求成功!",
      201: "新建或修改数据成功!",
      202: "一个请求已经进入后台排队（异步任务）",
      204: "删除数据成功!",
      400: "请求参数错误!",
      401: "用户没有权限（令牌、用户名、密码错误）。",
      403: "账户未激活或用户暂无权限",
      404: "发出的请求不存在!",
      406: "请求的格式不可得。",
      410: "请求的资源被永久删除，且不会再得到的。",
      422: "当创建一个对象时，发生一个验证错误。",
      500: "服务器出错!",
      502: "网关错误!",
      503: "服务不可用，服务器暂时过载或维护!",
      504: "网关超时!"
    };
    const { response } = err;
    const status = response.status as keyof ErrResponseMap | undefined;

    // const status = response.status as
    if (status) {
      throw new Error(errResponseMap[status] ?? "");
    }
    return Promise.reject(err);
  }
);

export default request;