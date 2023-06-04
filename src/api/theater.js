import axios from '@/utils/axios.js';

export const getTheaterList = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'get',
    ...props,
  });
};

export const getTheaterRow = (id) => {
  console.log(id)
  return axios({
    url: `/admin/theaters/${id}`,
    method: 'get',
  });
};

export const postTheater = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'post',
    ...props,
  });
};

export const patchTheater = (props) => {
  console.log(props)
  return axios({
    url: `/admin/theaters/${props.id}`,
    method: 'patch',
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

export const getRooms = (id) => {
  
  return axios({
    url: `/admin/rooms?theaterId=${id}`,
    method: 'get',
  });
};


