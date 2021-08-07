import { Api } from "../../backend";

export const createOrder =(userId,order,token)=>{
    return fetch(`${Api}/order/createOrder/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application,json",
            Authorization:`Bearer ${token}`
            
        }
        ,
        body:JSON.stringify({order:orderdata})
        
    })
}