import axios from '@/utils/axios.js';

export const getTheaterList = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'get',
    ...props,
  });
};

export const postTheater = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'post',
    ...props,
  });
};

export const postTheaterImg = (data) => {
  
  return axios({
    url: `/admin/theaters/file/upload `,
    method: 'post',
    type: 'multipart/form-data',
    data
  });
};


