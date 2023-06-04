import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { setClearMaskArr, setMaskArr } from '../store/slice/maskSlice';
import { message } from "antd";

let store = {};
export const injectStore = (_store) => {
  store = _store;
};

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const PRODUCT_URL = process.env.REACT_APP_PRODUCT_URL;
const DEV_URL = process.env.REACT_APP_PROXY_DEV_URL;
const BASE_URL = isDev || isTest ? `${DEV_URL}api` : `${PRODUCT_URL}api`;
const SYSTEM_NAME = process.env.REACT_APP_NAME || 'test';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (propsConfig) => { 

  const { customBaseUrl = '', url = '',type = 'application/json', data } = propsConfig;
  const loadingId = uuidv4();
  const instance = axios.create({
    baseURL: customBaseUrl === '' ? BASE_URL : customBaseUrl,
    headers: { common: {} },
  });
  const { dispatch = () => {} } = store;
  
  instance.defaults.headers['Content-Type'] = type;

  instance.interceptors.request.use(
    (config) => {
      const { withToken = true, withLoading = true } = config;
      if (withToken) {
        const token = Cookies.get(`${SYSTEM_NAME}_token`);
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
      if (withLoading) {
        dispatch(
          setMaskArr({
            id: loadingId,
            url: customBaseUrl === '' ? BASE_URL : customBaseUrl,
          })
        );
      }
      if (type ==='multipart/form-data') {
        const formData = new FormData();
        formData.append('file', data.get('file'));
        config.data = formData;
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      return config;
    },
    (error) => {
      dispatch(setClearMaskArr(loadingId));
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      dispatch(setClearMaskArr(loadingId));
      return response;
    },
    (e) => {
      console.log('e',e);
      const { message: errorMessage } = e.response.data;
      message.error(errorMessage);
      dispatch(setClearMaskArr(loadingId));
      return Promise.reject(e);
    }
  );

  return instance(propsConfig);
};
