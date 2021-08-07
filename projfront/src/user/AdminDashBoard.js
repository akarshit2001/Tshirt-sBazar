import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'

import Base from '../core/Base'


const  AdminDashBoard =()=> {
const {name,email,Role} = isAuthenticated().User;
    const leftSide = ()=>{
        //
        return(
            <div className="card">
            <h1 className="card-header bg-dark text-white">Admin Navigation</h1>
            <ul className="list-group">
            <li className="list-group-item"><Link to="/admin/dashboard/create" className="nav-link text-success">Create Category</Link></li>
            <li className="list-group-item"><Link to="/admin/dashboard/manage" className="nav-link text-success">Manage Category</Link></li>
           
            <li className="list-group-item"><Link to="/admin/dashboard/createProduct" className="nav-link text-success">Create Product</Link></li>
            <li className="list-group-item"><Link to="/admin/dashboard/manageProduct" className="nav-link text-success" >Manage Product</Link></li>
            <li className="list-group-item"><Link to="/admin/Product" className="nav-link text-success">Manage Orders</Link></li>
            </ul>
            
            </div>
        )
    }
    const RightSide = ()=>{

        return (
            <div className="card mb-4">
         
                <h4 className="card-header text-left" style={{textAlign:leftSide}}> Admin Detail</h4>
                <ul className="list-group">
                    <li className="list-group-item text-left" ><span style ={{float:"left"}} className="badge badge-success mr-2">Name:</span>{name}</li>
                    <li className="list-group-item  text-left" ><span style ={{float:"left"}} className="badge badge-success mr-2">Email:</span>{email}</li>
                    <li className="list-group-item  text-left" ><span style ={{float:"left"}}  className="badge badge-success mr-2">Role:</span>Admin</li>
                </ul>
            
            
            
            </div>
        )
        //
    }
    return (
        <div>
            <Base>
            <h1>Welcome to Mr. Admin :  {isAuthenticated().User.name}</h1>
            <p>You are the King of this webapplication</p>
            <div className="container">
                <div className= "row">
                    <div className="col-3" >{leftSide()}</div>
                
                
                
                
                <div className="col-9" >{RightSide()}</div>
            
            </div>
            
        
            
            
            </div>
            </Base>
        </div>
    )
}

export default AdminDashBoard
