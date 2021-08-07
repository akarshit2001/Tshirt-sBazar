import React,{useState,useEffect} from 'react'
import {Api} from '../backend';
import '../styles.css'
import Base from './Base';
import Card from './helper/Card';
import { getAllProduct } from './helper/coreapicalls';

function Home() {
    const [product,setProduct]= useState([]);
    const [error,setError]= useState(false);

    const load =()=>{
        getAllProduct().
        then(data=>{
            if(data.error || !data){
                setError(true)
                console.log("rrr")
            }
            else{
                console.log("correct")
                console.log(data)
                setProduct(data)
            }
        })
    }
    
    useEffect(() => {
        load()
    }, [])

    return (

        <Base title="Tshirt" Address="Raebareli" description="Tshirt just for fun ">
            <div className="container">
                <div className="row">
                {console.log(product)}
                    {product.map((data,index)=>{
                        console.log(data)
                        return(
                        <div key={index} className="col-4">
                    
                         <Card product={data} removeCart={false} addtoCart={true}/>
                    
                        </div>
                    )})}
                   
                
                
                </div>
            
            </div>
        </Base>
    )
}

export default Home
