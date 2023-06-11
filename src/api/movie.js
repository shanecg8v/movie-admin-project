import axios from "@/utils/axios.js";

export const movieGet = (pageNo,pageSize,search,sort) => {//7-6取得電影列表
    return axios({
      url: `/admin/movies?pageNo=${pageNo}&pageSize=${pageSize}${search==undefined?'':`&search=${search}`}${sort==undefined?'':`&sort=${sort}`}`,
      method: "GET"
    });
  };
  export const movieAdd = (body) => {//7-7新增電影列表
    return axios({
      url: `/admin/movies`,
      method: "POST",
      data:body,
    });
  };
  export const movieUpdate = (id,body) => {//7-8編輯電影列表
    return axios({
      url: `/admin/movies/${id}`,
      method: "PATCH",
      data:body,
    });
  };
  export const movieRemove = (id) => {//7-9刪除電影列表
    return axios({
      url: `/admin/movies/${id}`,
      method: "DELETE"
    });
  };