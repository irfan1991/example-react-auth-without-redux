import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class ArticleDataService {

    getAll(){
        return axios.get(API_URL+"/article" , {headers : authHeader()});
    }

    getPublished(){
        return axios.get(API_URL+"/article/published" );
    }

    get(id){
        return axios.get(`${API_URL}/article/${id}`, {headers : authHeader()});
    }

    getUser(id){
        return axios.get(`${API_URL}/article/user/${id}`, {headers : authHeader()});
    }

    create(data){
      //  console.log(axios.post(API_URL+"/article",data ,{headers : authHeader()}));
        return axios.post(`${API_URL}/article`,data ,{headers : authHeader()});
    }

    update(id, data){
        return axios.put(`${API_URL}/article/${id}`, data, {headers : authHeader()});
    }

    delete(id) {
        //console.log(axios.delete(`${API_URL}/article/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/article/${id}`, {headers : authHeader()});
    }

    deleteUser(id) {
        //console.log(axios.delete(`${API_URL}/article/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/article/user/${id}`, {headers : authHeader()});
    }
    
    deleteAll() {
        return axios.delete(`${API_URL}/article`, {headers : authHeader()});
    }
    
    findByTitle(title) {
        return axios.get(`${API_URL}/article?title=${title}`, {headers : authHeader()});
    }
}

export default new ArticleDataService;