import React,{useState,useEffect} from 'react'
import Transaction from '../../transaction';
import { payement } from '../../user/helper/payment';



import Base from '../Base';
import { getProd, loadCart } from './addHelper';
import Card from './Card';

function Cart() {
    const [product,setProduct]= useState([]);
    const [error,setError]= useState(false);
    const [reload, setreload] = useState(false);
    const loadAll =(product)=>{
            setProduct(loadCart)

    }
 
    useEffect(() => {
        loadAll()
    }, [reload])

    return (

        <Base title="Tshirt" Address="Raebareli" description="Tshirt just for fun ">
            <div className="container">
            <h1>Product in Cart: {product.length}</h1>
                <div className="row">
               
               <div className="col-6">
                    {product.map((data,index)=>{
                       // console.log(data)
                        return(
                        <div key={index} className="col-4">
                    
                         <Card  key={index}product={data} removeCart={true} addToCart={false} reload={reload} setReload={setreload}/>
                    
                        </div>
                    )})}
                        
                
                   
                </div>

                <div className="col-6">
                
            
               {/* <payement product={product} setReload={setreload} reload={reload}/>*/}
                
                <Transaction product={product} setReload={setreload} reload={reload}/>
                </div>
                        
                </div>
            
            </div>
        </Base>
    )
}

export default Cart;
