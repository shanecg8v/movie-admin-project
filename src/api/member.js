import axios from "@/utils/axios.js";

export const memberGet = (pageNo,pageSize,search,sort) => {//7-2取得會員列表全部
  return axios({
    url: `/admin/member?pageNo=${pageNo}&pageSize=${pageSize}${search==undefined?'':`&search=${search}`}${sort==undefined?'':`&sort=${sort}`}`,
    method: "GET"
  });
};
export const memberAdd = (body) => {//7-3新增會員列表
  return axios({
    url: `/admin/member`,
    method: "POST",
    data:body
  });
};
export const memberUpdate = (id,body) => {//7-4編輯會員列表
  return axios({
    url: `/admin/member/${id}`,
    method: "PATCH",
    data:body
  });
};
export const memberRemove = (id) => {//7-5刪除會員列表
  return axios({
    url: `/admin/member/${id}`,
    method: "DELETE"
  });
};