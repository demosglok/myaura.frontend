import axios from 'axios';
import store from './store';

const $http = axios.create({
   baseURL: 'https://landing.myaura.io/',
   withCredentials: true
});


$http.interceptors.response.use((response) => {
   return Promise.resolve(response.data);
}, (error) => {
   if (error.response && error.response.status === 401) {
      store.commit('setAuthorized', false);
      store.commit('setRole', null);
   }
   return Promise.reject(error);
});

export default $http;
