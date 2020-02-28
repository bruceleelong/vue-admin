import axios from "axios";

console.log(process.env.VUE_APP_ABC);

// 自定义 axios 实例添加拦截器
// 手把手撸码前端API,地址:http://www.web-jshtml.cn/productapi

const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";

const instance = axios.create({
  baseURL: BASEURL, // http://192.168.3.3:8080/devApi/ == http://www.web-jshtml.cn/productapi
  timeout: 1000
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
