
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { addHelper, removeCarty } from "./addHelper";
import ImageHelper from "./Imagehelper";
import { useHistory } from 'react-router-dom';

const Card = ({product ,addtoCart,removeCart,reload=undefined,setReload=f=>f}
    ) => {



        const history = useHistory();
        const [redirect,setRedirect]= useState(false);// if true then redirect to certain pages.
        //const[count,setCount] = useState(product.count)
        
        const name= product ? product.name:"Default"
        const description=product ? product.description:"default"
        const price=product ? product.price:"default"

        // this function is used to add the item in the cart.
        const addToCart=()=>{
          addHelper(product,()=>setRedirect(true))
          

        } 

        const getRedirect =(redirect)=>{
        //  console.log(redirect)
              if(redirect)
                history.push("/cart")
                
        }

        const showAddToCart =()=>{
            return (
                (addtoCart && (
                    <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                  >
                    Add to Cart
                  </button>
                ))
            )
        }
          const showRemoveCart =()=>{
            return (

                (removeCart && (
                    <button
                    onClick={()=>{removeCarty(product._id);setReload(true)}}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                ))
            )
        }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{name}</div>
        <div className="card-body">
          <div className="rounded border border-success ">
          {/*console.log(product._id)*/}
            {
              getRedirect(redirect)}
           <ImageHelper prod ={product._id}/>
          </div>
          <p className="lead bg-success font-weight-normal text-wrap">
            {description}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {price}</p>
          <div className="row">
            <div className="col-12">
             {showAddToCart(addtoCart)}
            </div>
            <div className="col-12">
             {showRemoveCart(removeCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Card