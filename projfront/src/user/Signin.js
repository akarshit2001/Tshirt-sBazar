import React from 'react'
import Base from '../core/Base'
import {Link,Redirect} from 'react-router-dom'
//import { isAuthenticate ,SignInL,authenticate} from '../auth/helper'
import {  signIn,isAuthenticated,authenticate } from '../auth/helper'


function Signin() {
  const sty ={backgroundImage:"url('https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80')",top:"0px"}

const [ values,setValues]= React.useState({
  email:"",
  password:"",
  error:"",
  isloading:false,
  success:"",
  didRedirect:false
})
const {user}= isAuthenticated();
const {email,password,isloading,error,success,didRedirect}= values;

const handler =name =>event =>{
  setValues({...values,error:false,[name]: event.target.value});
}

const redirect = ()=>{
  if(didRedirect){
    if(user && user.Role===1)
      return <Redirect to="/admin/dashboard"/>
    else{
      return   <Redirect to="/user/dashboard"/>
    }
   
  }
 
  if(isAuthenticated()){
    return <Redirect to="/"/>
  }
}
 
const submit = (e)=>{
  e.preventDefault();
  setValues({...values,error:false,isloading:true})
  signIn({email,password}).
  then((data)=>{
    console.log(data)
    if( data.error!=undefined){
      setValues({...values,
        error:true,
        success:false,
        isloading:false
      })
      console.log(data.errors)
     
    }
    
    
   
      else{
        
        authenticate(data,()=>{
      setValues({...values,
        email:"",
        password:"",
        success:true,
        error:"",
        isloading:false,
        didRedirect:true
   
      })})}
    
  }).catch(err=>{
    console.log("error in signup!")
  })
}



const signInForm = ()=>{
    return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
            
              <div className="form-group">
                <label className="text-light">Email</label>
                <input onChange={handler("email")} value={email}className="form-control" type="email" />
              </div>
  
              <div className="form-group">
                <label className="text-light">Password</label>
                <input className="form-control" onChange={handler("password")} value={password}type="password" />
              </div>
              <button onClick ={submit}className="btn btn-success btn-block">Submit</button>
            </form>
          </div>
        </div>
      );
}

const loadingMessage = ()=>{
  return(
    
   isloading && (
  <div className="alert alert-success" style={{display:isloading?"":"none"}} >
  loading ...

  </div>)
  )


}
const errorMessage = ()=>{
  return(
  <div className="alert alert-danger" style={{display:error?"":"none"}} >
      
      Credenetials invalid!
  </div>
  )
}





    return (
        <Base styl={sty}>
        <h1 style={{textAlign:"center",color:"wheat"}}>Signin!</h1>
        <p style={{textAlign:"center"}}>Login to continue</p>
        {errorMessage()}
        {loadingMessage()}
        {signInForm()}
       {redirect()}
        <p className="text-center"> {JSON.stringify(values)} </p>
        </Base>
    )
}

export default Signin
