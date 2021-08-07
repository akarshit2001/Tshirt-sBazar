import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { addCateg } from './helper/adminapicall';

function AddCategory() {
const [name,setName] = React.useState();
const [error,setError] = React.useState(false);
const [success,setSucess] = React.useState(false);
const {_id}= isAuthenticated().User;
const {token}= isAuthenticated();
const goBack =()=>(

<div >
   <Link to ="/admin/dashboard"  className="btn btn-sm btn-success">Admin Page</Link>

</div>


)

const handleChange =event=>{
   // e.preventDefault();
    setError("")
    setName(event.target.value)
}


const eSubmit =(e)=>{
    //e.preventDefault();


    // backend 
    addCateg(_id,token,{name}).then((data)=>{
        //console.log( data.errors!=undefined?"fng":"fdxgcv")
        if( data.errors!=undefined){
            setError(true)
            setSucess(false)
            console.log(error)
        }
        else{
            setError(false)
            setSucess(true)
            console.log(error)
        }
        
    })
   


}

const errorMessage =()=>{
    return(
        
        <div className ="alert alert-danger"style={{display:error?"":"none"}} >
        <p>OOps! something is wrong!</p>
        </div>
    )
}

const sucessMessage =()=>{
    return(
        <div className ="alert alert-success" style={{display:success?"":"none"}}>
        <p>Category is successfully created! !</p>
        </div>
    )
}
const categoryForm  = ()=>{
    return(
        <form>
            <div className ="form-group">
                <label className="lead">Category</label>
                <input className="form-control" autoFocus required placeholder="Ex. winter" onChange={handleChange} value={name}/>
        
            
            </div>
        
            <button className="btn btn-info" onClick={eSubmit}>Submit</button>
        
        </form>




    )
}

    return (
        <Base title="Create Category" description="This Page to create category!">
        <h1 className="text-success text-center" style={{fontFamily:"sans-serif"}}>Create Category</h1>
        <p>Hey! Create a new Category here!</p>

        <div className="container" style ={{backgroundColor:"skyblue",border:"6px solid white"}}>
        <h1 className="p-3 text-left">{sucessMessage()}{errorMessage()}{categoryForm()}{goBack()}</h1>
        <div class="row mx-md-n5">
 
  
</div>
        </div>
        </Base>
    )
}

export default AddCategory
