import { Api } from "../../backend";

export const addCateg =(user,token,category)=>{

    return fetch(`${Api}/category/create/${user}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    }
        ).then(res=>{
            return  ( res.json());
        }).catch(err =>console.log(err))
}
// to create product


export const addProduct =(user,token,product)=>{

    return fetch(`${Api}/product/createProduct/${user}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }
        ).
        then(res=>{
            return  ( console.log("vcxv"),
                res.json());
        }).
        catch(err =>console.log(err))
}
// getCategoryById

export const getCategoryById =(categ_id)=>{
    return fetch(`${Api}category/${categ_id}`).
    then(res=>{
        return(res.json())
    }).
    catch(err=>console.log(err))
}

// getAll Categories

export const categories = ()=>{
    return fetch(`${Api}/category`,{
        method:"GET"
    }).then(res=>{
       
        return(
            res.json()
        )
            
    }).catch(err=>console.log(err))
}

/// update product 

export const updateProduct =(user,token,product,prod_id)=>{

    return fetch(`${Api}product/${prod_id}/${user}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }
        ).
        then(res=>{
            return  ( res.json());
        }).
        catch(err =>console.log(err))
}

// delete of product

export const deleteProduct =(user,token,prod_id)=>{

    return fetch(`${Api}product/${prod_id}/${user}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
       
    }
        ).
        then(res=>{
            return  ( res.json());
        }).
        catch(err =>console.log(err))
}


// getproduct 

export const getProduct = (prod_id)=>{
    {console.log(prod_id)}
    return fetch(` http://localhost:8000/api/product/${prod_id}`,{
        method:"GET"
    }).then(res=>{
        return (res.json());
    }).catch(err=>console.log(err))
}

// get all product 

export const products = ()=>{
    return fetch(`${Api}/product`,{
        method:"GET"
    }).then(res=>{
        return res.json()
    }).catch(err=>console.log(err))
}

// to update Category 
export const updateCateg = (user_id,categ_id,token,name)=>{
    return fetch(`${Api}category/${categ_id}/${user_id}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`

        },
        body:JSON.stringify(name)
    }).then(res=>{
        return(res.json())
    }).
    catch(err=>console.log(err))
}


// for delete category!

export const deleteCateg = (cat_id,user_id,token)=>{
    console.log(user_id)
    return fetch(`http://localhost:8000/api/category/${cat_id}/${user_id}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).
    then(res=>{
        return (res.json())
    }).
    catch(err=>console.log(err))
}
