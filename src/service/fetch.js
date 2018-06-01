import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://120.79.207.154:8080/w-paper_war/', // api的base_url
  // baseURL: 'http://127.0.0.1:8099/',
  baseURL: 'http://127.0.0.1:8081/w-paper/',
  timeout: 10000,                 // 请求超时时间
});
// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    // const res = response.data;
    // if (res.code !== 1) {
    //   // Code 不为 1 的情况 都在 catch 中处理
    //
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //
    //   }
    //   return Promise.reject(response);
    // } else {
    //   return response;
    // }
    return response.data;
  },
  error => {
    console.log('err' + error);// for debug
//  Message({
//    message: error.message,
//    type: 'error',
//    duration: 5 * 1000
//  });
    return Promise.reject(error);
  }
)
export default service
