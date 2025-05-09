// An highlighted block
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend, RequestOptionsInit, ResponseError } from 'umi-request';

// 定义 codeMessage 的类型
type CodeMessageType = {
  [key: number]: string;
};

const codeMessage: CodeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '登录过期，重新登录',
  403: '用户权限不足',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = async (error: ResponseError): Promise<{ code: number; message: string } | Response | undefined> => {
  const { response } = error;
  if (response && response.status) {
    return {
      code: response.status,
      message: codeMessage[response.status],
    };
  }
  return response;
};

const request = extend({
  errorHandler,
  timeout: 150000, // 网络延迟 2分钟
  // credentials: 'include', // 默认请求是否带上cookie
  credentials: 'omit',
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  const result = {
    url: url,
    options: { ...options },
  };
  const c_token = localStorage.getItem('token');
  if (c_token) {
    result.options = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `bearer ${c_token}`,
      },
    };
  }
  return result;
});

request.use(async (ctx, next) => {
  // 统一国际化处理返回的message, 处理登录过期的情况
  await next();
});

export default request;
