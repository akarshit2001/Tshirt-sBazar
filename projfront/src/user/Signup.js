import React from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import { Signin, Signupf } from '../auth/helper'
function Signup() {
  const sty ={backgroundImage:"url('https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80')",top:"0px"}
 const [values,setValues]= React.useState({
    name:"",
    email:"",
    password:"",
    error:"",
    lastName:"",
    userInfo:"",
    success:false
  })
  const [check,setCheck]= React.useState(0);
  const {name,lastName,email,password,error,success,userInfo} = values;

  const handler =name =>event =>{
    setValues({...values,error:false,[name]: event.target.value});
  }
 
  const submit = (e)=>{
    e.preventDefault();
    setValues({...values,error:false})
    Signupf({name,email,password,lastName,userInfo}).
    then((data)=>{
      if( data.errors!=undefined){
        setValues({...values,
        
        
          error:true,
          success:false
        })
        console.log("error hai babau")
        {<h1>error hai baba</h1>}
        
        console.log(check);
      }
      
     
        else{
          
        setValues({...values,
          name:"",
          lastName:"",
          userInfo:"",
          email:"",
          userInfo:"",
          password:"",
          success:true
        })}
      
    }).catch(err=>{
      console.log("error in signup!")
    })
  }
  const sucessMessage = ()=>{
    return(
      console.log(success),
    <div className="alert alert-success" style={{display:success?"":"none"}} >
    You are Sucessfully registered. <Link to="/signin" exact >Click to login</Link>

    </div>
    )
  }
  const errorMessage = ()=>{
    return(
    <div className="alert alert-danger" style={{display:error?"":"none"}} >
        
        "Sorry signup failed. Please fill carefully"
    </div>
    )
  }
  const SignUpForm = ()=>{
    return (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left" style={{backgroundColor:"#010b14" ,width:"50%"}} >
            <form>
            
              <div className="form-group">
                <label className="text-light">Name</label>
                <input  onChange={handler("name")}className="form-control" type="name" value={name} />
              </div>
              <div className="form-group">
              <label className="text-light">lastName</label>
              <input  onChange={handler("lastName")}className="form-control" type="text" value={lastName} />
            </div>
              <div className="form-group">
              <label className="text-light">Email</label>
              <input  onChange={handler("email")}className="form-control" type="email" value={email} />
            </div>
  
              <div className="form-group">
                <label className="text-light">Password</label>
                <input onChange ={handler("password")} className="form-control" type="password" value={password} />
              </div>
              <div className="form-group">
              <label className="text-light">userInfo</label>
              <input  onChange={handler("userInfo")}className="form-control" type="text"  value={userInfo}/>
            </div>
              <button onClick={submit} className="btn btn-success btn-block" style={{fontWeight:""}}>Submit</button>
            </form>
          </div>
        </div>
      );
}

    return (
        <Base title ="Sign up"  styl={sty}>
        <h1 style={{textAlign:"center",color:"wheat"}}>Please Register!</h1>
        {sucessMessage()}
        {errorMessage()}
        {SignUpForm()}
  
        {JSON.stringify(values)}
      
        </Base>
    )
}

export default Signup
