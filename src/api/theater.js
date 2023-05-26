import axios from '@/utils/axios.js';

export const getTheaterList = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'get',
    ...props,
  });
};

