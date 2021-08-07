import React from 'react'
import {Link,withRouter} from 'react-router-dom';
import { signout ,isAuthenticated} from '../../auth/helper';

const checkTab = (history,path)=>{
    if(history.location.pathname === path)
        return {color:"red"}
    else
        return {color:"#00FF00"}
        

}


function Menu({history}) {
    return (
        <div>
        <ul className="nav nav-tabs bg-dark">

            <li className="nav-item">
                <Link  style={checkTab(history,"/")}className="nav-link" to="/" exact >Home</Link>
            </li>
        
            <li className="nav-item">
            <Link style={checkTab(history,"/about")} className="nav-link" to="/about" exact >About</Link>
            </li>
            
            {isAuthenticated()&& isAuthenticated().User.Role!=1&& (
            <li className="nav-item">
            <Link style={checkTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard" exact >U.DashBoard</Link>
            </li>
            )}
            {isAuthenticated()&& isAuthenticated().User.Role==1 && (
            <li className="nav-item">
            <Link style={checkTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard" exact >A.DashBoard</Link>
            </li>
            )}
            {!isAuthenticated() && (
                <React.Fragment>
                
                <li className="nav-item">
            <Link  style={checkTab(history,"/signin")}  className="nav-link" to="/signin" exact >Signin</Link>
            </li>  
            
              
        
                <li className="nav-item">
            <Link  style={checkTab(history,"/signup")}  className="nav-link" to="/signup" exact >SignUp</Link>
            </li>  
                
                </React.Fragment>
            )}
                
            
         
            
             {isAuthenticated() && (
                <li className="nav-item">
                <span className="nav-link text-warning" onClick={()=>{
                    signout(()=>{
                        history.push("/")
                    })

                }} >signout</span>
                 </li>
             )}
             
     
    
    
    
        </ul>    

        </div>
    )
}

export default withRouter( Menu)
