import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, products } from './helper/adminapicall';

const ManageProducts=()=> {
    const [allProduct,setProduct]= React.useState([])
    const {User,token} = isAuthenticated();

    const preload =()=>{
        products ().
        then(data=>{
            if(data.error){
                console.log("error")
            }
            else{
                setProduct(data)
            }
        })
    }
const deletethis = dataId=>{
    deleteProduct(User._id,token,dataId).
    then(data=>{
        if(data.error){
            console.log("error")
        }
        else{
            preload()
        }
    })
}
    
useEffect(() => {
  preload()
}, [])

    return (
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text- my-3">Total Products : {allProduct.length}</h2>
  
           {allProduct.map((data,index)=>{
               return(
            <div className="row text-center mb-2 ">
            <div className="col-4">
              <h3 key={index} className="text-info text-left">{data.name}</h3>
            </div>
            <div className="col-4" >
            <button> <Link to={{
              pathname:`/admin/dashboard/updateProduct/${data._id}`
            }} >Update</Link></button>
             
              
            </div>
            <div className="col-4">
              <button
                onClick ={()=>{
                    deletethis(data._id);
                }}
              >
                Delete
              </button>
            </div>
            </div>
               )




           })}
               
            
              
            
          </div>
        </div>
      </Base>
    )
}

export default ManageProducts
