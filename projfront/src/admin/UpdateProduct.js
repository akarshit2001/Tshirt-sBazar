import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {  categories, getProduct, updateProduct } from './helper/adminapicall';

const UpdateProduct =({match})=> {
    const history = useHistory();
    const [values,setValues]=React.useState({
      name:"",
      description:"",
      price:"",
      photo:"",
      stock:"",
      
      category:"",
      loading:false,
      formData:"",
      error:false,
      createProduct:""
  })
  const{name,description,price,stock,formData,error,createProduct}=values;
  const [Categories,setCategories]= React.useState([]);
  const {User,token}= isAuthenticated();
  


  // This function is used to get the partucular product through id !
  const preload =productId=>{
    
    getProduct(productId).then(data=>{
    
      if(!data){
        setValues({...values,error:data})
      }
      else{
        console.log(data)
       preloadCateg()
        setValues({...values,
        name:data.name,
        description: data.description,
        price:data.price,
        stock:data.stock,
        formData:new FormData(),
        category:data.category._id
        
        
        });
        
      }
    })
    
  }

const preloadCateg = ()=>{
  
  categories().then(data=>{
    if(!data){
      console.log("error hai category loading me!")
    }
    else{
      
      setCategories(data)
    }
  })
}

  useEffect(() => {
    
    preload(match.params.productId)
   
  }, [])
  

  const handleChange =name=>(e)=>{
    const value= name==="photo" ? e.target.files[0] : e.target.value
    console.log(value)
    formData.set(name,value)
    setValues({...values,[name]:value})
    //
  }
  
  const onSubmit = event=>{
   event.preventDefault()
    updateProduct(User._id,token,formData,match.params.productId).
    then(data=>{
      console.log(data.error)
      if(data.error){
        setValues({...values,error:true})
      }
      else{
        setValues({
        name:"",
        description:"",
        price:"",
        stock:"",
        
        loading:false,
        
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
        console.log(createProduct),
        <div className="text bg-success" style={{display:createProduct?"":"none"}} >
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
     console.log(name),
  
    <div className="col-md-6 offset-sm-3 text-left" style={{backgroundColor:"#010b14" ,width:"50%"}} >
      <form>
      <h1>{name}</h1>
       <div className="form-group">
          <label >Photo</label>
          <input type="file" onChange={handleChange("photo")}  name="photo" accept="image/*"/>
        
   </div>
        <div className="form-group">
        <label style={{textAlign:"left"}}>Name</label>
        <input type="text" required onChange={handleChange("name")}  value={name} className="form-control" placeholder="name"/>
      
        </div>
        <div className="form-group">
        <label >Description</label>
        <input type="text" required onChange={handleChange("description")}   className="form-control" value={description} placeholder="description"/>
    
        </div>
       <div className="form-group">
      <label >Price</label>
      <input type="number" required onChange={handleChange("price")}  className="form-control" value={price} placeholder="price"/>
  
  
  
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
            <h1>Here you can update your product stuff!</h1>
           {sucessMesage()}
            {displayMessage()}
            {productForm()}
           
            {redirect()}
        </Base>
    )
}

export default UpdateProduct;
