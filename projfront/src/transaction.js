import React,{useState,useEffect} from 'react'
import DropIn, {dropin} from 'braintree-web-drop-in-react';
import { authenticate, isAuthenticated } from './auth/helper';

import { getMeToken, payment } from './user/helper/payment';



function Transaction({product,setReload=f=>f,reload= undefined}) {

const [info, setinfo] = useState({
    loading:false,
    sucess:true,
    clientToken :null,// as per documentation
    err:false,
    instance :{}
})

const{clientToken}= info;
const {token}=isAuthenticated()
const {_id}= isAuthenticated().User

// this for get the token.
const GetToken =(userId,token)=>{
    
        getMeToken(userId,token).
        then(data=>{
                console.log(data)
                if (data.error) {
                    setinfo({...info,err:data.error})

                } else {
                const client = data.clientToken;
                setinfo({
                ...info,clientToken:client
            })
           // console.log("kya aya yaha "+data.clientToken)
        }
        }).
        catch(err=>console.log(err))

}

// to dispaly payment menu!

const dropin =()=>{
    return(
    <div>
    {console.log("token"+info.clientToken)}
    {info.clientToken!=null ?(
        <div>
    <DropIn
      options={{ authorization: info.clientToken }}
      onInstance={(instance) => (info.instance = instance)}
    />
    
        <button onClick={paymentProcessing}   className="btn btn-block btn-success ">Buy</button>
  </div>
    ):( <h1>Plese check</h1>)}
  </div>

    )
}

// for payment execution start
const getAmount =()=>{
    let amount =0;
    

    product.map((prod)=>{
            amount=amount+prod.price;
    })
    return amount;
}


const paymentProcessing  = ()=>{
    console.log("yaha tak aa gaya")
   setinfo({loading:true})

   let nonce;
   info.instance.requestPaymentMethod().then(data=>{
       console.log("Dc")
       nonce = data.nonce;
       const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
        
      payment(_id,token,paymentData).then((res)=>{
          console.log("done")
      }).catch(err=>console.log(err))
   })
   console.log("yaha bhi")

}





useEffect(() => {
    
    GetToken(_id,token);
}, [])

    return (
        <div>
            <h1>Your amount {getAmount()}</h1>
            {dropin()}
        </div>
    )
}

export default Transaction
