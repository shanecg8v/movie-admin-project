import axios from '@/utils/axios.js';
import moment from 'moment'

export const getBranchRp = (sd, ed) => {
  sd = moment().subtract(6, 'months').format('YYYY-MM-DD')
  ed = moment().format('YYYY-MM-DD')
  return axios({
    url: `/admin/statistics/branch?sdate=${sd}&edate=${ed}`,
    method: 'get',
  });
};




