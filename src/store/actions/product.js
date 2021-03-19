import {listApi} from "../../services/products";

export default payload=> async dispatch=>{
    console.log("====payload===",payload);
    const res=await listApi();
    dispatch({
        type:'PRODUCT_LOADED',
        payload:res
    })
};