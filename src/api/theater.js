import axios from '@/utils/axios.js';

export const getTheaterList = (props) => {
  return axios({
    url: `/admin/theaters`,
    method: 'get',
    ...props,
  });
};
export const getFrontTheaterList = (props) => {
  return axios({
    url: `/theaters`,
    method: "GET",
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
    data: props
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

export const getRoomTemplate = () => {
  
  return axios({
    url: `/admin/seats/examples`,
    method: 'get',
  });
};

export const postAddRoom = (data) => {
  
  return axios({
    url: `/admin/rooms`,
    method: 'post',
    data
  });
};

export const getSeatMap = ( theaterId = '' , roomId = '' ) => {
  console.log(theaterId, roomId)
  return axios({
    url: `/admin/seats?theaterId=${theaterId}&roomId=${roomId}`,
    method: 'get',
  });
};

export const deleteRoom = (id) => {
  
  return axios({
    url: `/admin/rooms?id=${id}`,
    method: 'delete',
  });
};

export const patchRoom = (data) => {
  return axios({
    url: `/admin/rooms`,
    method: 'patch',
    data
  });
};






