
export const addHelper = (item,next)=>{

        let cart =[]
        if(typeof(window)!=undefined){
            if(localStorage.getItem("cart"))
            cart = JSON.parse(localStorage.getItem("cart"));// cart ke sare item get kiye

            cart.push({...item,count:1})// apne wale item ko push kiya
            localStorage.setItem("cart",JSON.stringify(cart));

            
        }
        next()

}

export const loadCart=()=>{
    
        if(typeof(window)!=undefined){
            if(localStorage.getItem("cart"))
            return JSON.parse(localStorage.getItem("cart"));// cart ke sare item get kiye

           
            
        }
}

export const removeCarty =(product)=>{
    let cart =[]
    if(typeof(window)!=undefined){
        if(localStorage.getItem("cart"))
        cart = JSON.parse(localStorage.getItem("cart"));// cart ke sare item get kiy
        cart.map((data,index)=>{
            if(data._id ===product)
                cart.splice(index,1);
        
        })
        localStorage.setItem("cart",JSON.stringify(cart))
    }
   
    return cart;


    
}

export const emptyCart = next=>{
    if(typeof(window)!=undefined){
       localStorage.removeItem("cart")
       next()
       
        
    }

}