import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8082/api/bill';

class BillService {
  list(page) {
    let pageNo = parseInt(page.pageNo) - 1;
    return axios.get(API_URL + '/?pageNo=' + pageNo + '&size=' + page.size, { headers: authHeader() });
  }

  create(payload) {
    return axios.post(API_URL + '/', payload, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + '/' + id, { headers: authHeader() });
  }

  update(payload) {
    return axios.put(API_URL + '/', payload, { headers: authHeader() });
  }

  _delete(id) {
    return axios.delete(API_URL + '/' + id, { headers: authHeader() });
  }
}

export default new BillService();
