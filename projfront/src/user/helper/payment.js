
import { Api } from "../../backend";


export const getMeToken  = (userId,token)=>{
    
    return fetch(`http://localhost:8000/api/gateway/${userId}`,{

        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        
        
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))


}

export const payment  = (userId,token,paymentInfo)=>{
    return fetch(`${Api}gateway/payment/${userId}`,{

        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Baerer ${token}`
        },

        body:JSON.stringify(paymentInfo)
        
        
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))


}