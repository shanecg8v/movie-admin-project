import axios from "@/utils/axios.js";

export const movieShelfGetAll = (props) => {//7-10電影上架頁面-取得list
    return axios({
      customBaseUrl: `http://localhost:3000`,
      url: `/api/admin/moviesShelf?branch=&&hell=&&sdate=&edate`,
      method: "GET",
      ...props,
    });
  };
  export const movieShelfAdd = (props) => {//7-11電影上架頁面-新增
    return axios({
      customBaseUrl: `http://localhost:3000`,
      url: `/api/admin/moviesShelf `,
      method: "POST",
      ...props,
    });
  };
  export const movieShelfUpdate = (props) => {//7-12電影上架頁面-編輯
    return axios({
      customBaseUrl: `http://localhost:3000`,
      url: `/api/admin/moviesShelf `,
      method: "PATCH",
      ...props,
    });
  };
  