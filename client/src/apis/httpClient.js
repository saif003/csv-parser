import axios from 'axios';

const requestInterceptor = (config) => {
  return config;
};

const responseInterceptor = (response) => {
  return response.data;
};

const errorInterceptor = (error) => {
  const errorResponse = error?.response;
  const errorBody = errorResponse?.data;
  const status = +errorResponse?.status;
  return Promise.reject({ ...(errorBody || errorResponse), status });
};

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: '/api/v1',
  });
  // Add interceptors
  instance.interceptors.request.use(requestInterceptor, errorInterceptor);
  instance.interceptors.response.use(responseInterceptor, errorInterceptor);
  return instance;
};

export class HttpClient {
  static instance;

  static request(config, secondary = false) {
    if (!HttpClient.instance) {
      HttpClient.instance = getAxiosInstance();
    }
    return HttpClient.instance.request(config);
  }

  static get(url, isSecondary = false) {
    return HttpClient.request(
      {
        url,
        method: 'get',
      },
      isSecondary
    );
  }

  static delete(url, config) {
    return HttpClient.request({
      ...config,
      url,
      method: 'delete',
    });
  }

  static head(url, config) {
    return HttpClient.request({
      ...config,
      url,
      method: 'head',
    });
  }

  static post(url, data, isSecondary = false) {
    return HttpClient.request(
      {
        url,
        data,
        method: 'post',
      },
      isSecondary
    );
  }

  static put(url, data, isSecondary = false) {
    return HttpClient.request(
      {
        url,
        data,
        method: 'put',
      },
      isSecondary
    );
  }

  static patch(url, data, config) {
    return HttpClient.request({
      ...config,
      url,
      data,
      method: 'patch',
    });
  }
}
