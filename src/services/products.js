import {get,post,put,del} from '../utils/request';

export function listApi(page=1){
    return get("/api/v1/admin/products",{page});
}

export function createApi(data){
    return post("/api/v1/admin/products",data);
}

export function  modifyOne(id,data){
    return post("/api/v1/admin/products/`${id}`",data);
}

export function  delOne(id,data){
    return post("/api/v1/admin/products/`${id}`",data);
}