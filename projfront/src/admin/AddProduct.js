import React,{useEffect} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { addProduct, categories } from './helper/adminapicall';

const AddProduct=()=> {
  const history = useHistory();
  const [values,setValues]=React.useState({
    name:"",
    description:"",
    price:"",
    photo:"",
    stock:"",
    Categories: [],
    category:"",
    loading:false,
    formData:new FormData(),
    error:false,
    createProduct:""
})
const{name,description,price,stock,Categories,formData,error,createProduct}=values;

const {User,token}= isAuthenticated();
// function to  load the categories stored in db.

const preload =()=>{
  categories().then(data=>{
  //  console.log(data)
    if(!data){
      setValues({...values,error:data})
    }
    else{
      setValues({...values,Categories:data});
      
    }
  })
  
}
useEffect(() => {
  preload()
}, [])

const handleChange =name=>(e)=>{
  const valu= name==="photo" ? e.target.files[0] : e.target.value
  console.log(e.target.files)
  formData.set(name,valu)
  setValues({...values,[name]:valu})
  //
}

const onSubmit = event=>{
 event.preventDefault()
  addProduct(User._id,token,formData).
  then(data=>{
    if(data.error){
      setValues({...values,error:true})
    }
    else{
      setValues({
      name:"",
      description:"",
      price:"",
      stock:"",
      category:"",
      loading:false,
      formData:new FormData(),
      error:false,
      createProduct:data.name
    })}
  }).catch(err=>console.log("error"))
  
}
  const displayMessage = ()=>{
    return(
       
        <div className="text text-warning!" style={{display:error ?"":"none"}} >
        <h1 className="text text-danger">Oops! Error</h1>
      </div>



    )
  }
  const sucessMesage =()=>{
    return(
      <div className="text bg-success" style={{display:createProduct.length==0?"none":""}} >
      <h1>{createProduct} is created sucessfully!</h1>
    </div>

    )
  }

  const redirect =()=>{
    
    if(createProduct){
    
      setTimeout(()=>{
      
        history.push("/")
      },5000)
    }


  }

    


  


 const productForm =()=>(

  <div className="col-md-6 offset-sm-3 text-left" style={{backgroundColor:"#010b14" ,width:"50%"}} >
    <form>
    
     <div className="form-group">
        <label >Photo</label>
        <input type="file" required onClick={handleChange("photo")}  name="photo" accept="image"/>
      
 </div>
      <div className="form-group">
      <label style={{textAlign:"left"}}>Name</label>
      <input type="text" required onChange={handleChange("name")} name="name" value={name} className="form-control" placeholder="name"/>
    
      </div>
      <div className="form-group">
      <label >Description</label>
      <input type="text" required onChange={handleChange("description")} name="description"  className="form-control" value={description} placeholder="description"/>
  
      </div>
     <div className="form-group">
    <label >Price</label>
    <input type="number" required onChange={handleChange("price")} name="price"  className="form-control" value={price} placeholder="price"/>



    </div>



    <div className="form-group">
    <select
     onChange={handleChange("category")}
     className="form-control"
     placeholder="Category"
>
  <option>Select</option>
  {Categories && Categories.map((data,index)=>(
    <option key={index} value={data._id}>{data.name}</option>
  ))}
 
  
  </select>
    </div>
    <div className="form-group">
  <input  onChange={handleChange("stock")} type="number" className="form-control" placeholder="Quantity" value={stock} name="stock"
  />
</div>
  <button onClick ={onSubmit} className="btn btn-info">Submit</button>
    
    </form>
</div>
 )
 
 
 
 
  return (
    <Base>
  {sucessMesage()} {displayMessage()} {productForm()}{redirect()}</Base>
  )
}

export default AddProduct
