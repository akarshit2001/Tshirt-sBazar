// all for signin and signout and authentication
import { Api } from "../../backend";


export const Signupf= user=>{
    return fetch(`${Api}signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json"
        },
        body:JSON.stringify(user)
    }).then(res=>{
            return (
                
                res.json())
    }).catch(err=>{
        console.log(err)
    })



}

export const signIn= user=>{
    return ( fetch('http://localhost:8000/api/login',{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    }).then(res=>{
        return (res.json())
    }).catch(err=>{
        console.log(err)
    }))



}

export const authenticate = (data,next)=>{
    console.log(JSON.stringify(data.error))
    if(typeof window !=undefined && data.error==undefined){
        console.log(JSON.stringify(data))
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
    else{
        return false;
    }
}

export const signout= next=>{
    if(typeof window !=undefined){
        localStorage.removeItem("jwt");
        next();
        return fetch(`$ {Api}/signout`,{
            method:"GET"
        }).then(res=>{
            return res.json()
        }).catch(err=>{
            console.log(err)
        })
    }
}
// check user is authenticate or not.

export const isAuthenticated = (data,next)=>{
    if(typeof window ==undefined){
        return false;
    }
    else if(localStorage.getItem("jwt")){

        return (
            JSON.parse(localStorage.getItem("jwt")));
    }
    else{
        return (false);
    }
}