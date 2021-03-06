import {get,post,put,del} from '../utils/request';

export function listApi(page=1){
    return get("/test/index",{page});
}

export function createApi(data){
    return post("/test/create",data);
}

export function oneApi(id){
    return get(`/test/one/${id}`);
}

export function  modifyOne(id,data){
    return post(`/test/update/${id}`,data);
}

export function  delOne(id){
    return post(`/test/delete/${id}`);
}