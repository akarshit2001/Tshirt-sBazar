import { Api } from "../../backend"


export const getAllProduct = ()=>{
    return fetch(`${Api}/product`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err))
}
