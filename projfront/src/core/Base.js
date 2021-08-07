import React, { Children } from 'react'
import Menu from './helper/Menu'
 const Base=({
     title = "Ram",
     Address ="",
     description ="",
    children,
    styl
 })=> {
    return (
        <div>
             <div className ="conatiner-fluid ">
                <Menu/>
                <br></br>
                 <div style={styl} className ="jumbotron  text-center">
                   
                    <p>{children}</p>
                </div>
             <div className="footer">
                <div className="container-fluid bg-sucess text-center">


                    <h2 style={{color:"wheat"}}>If you have any  issue the ping below!</h2>
                    <button className="btn btn-warning btn-lg">Contact us</button>

                    
             
             
             
                 </div>
             
             
             
             </div>
             
            

            </div>
        </div>
        
    )
}

export default Base
