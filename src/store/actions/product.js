import {listApi} from "../../services/products";

export default payload=> async dispatch=>{
    console.log("====payload===",payload);
    const res=await listApi(payload.page);
    dispatch({
        type:'PRODUCT_LOADED',
        payload:{...res,page:payload.page}
    })
};