import axios from "@/utils/axios.js";

export const getSessionsList = (props) => {
  return axios({
    url: `/admin/sessions/list`,
    method: "GET",
    ...props,
  });
};
export const postSessionsList = (props) => {
  return axios({
    url: `/admin/sessions/list`,
    method: "POST",
    ...props,
  });
};
