import React from 'react'
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ManageCateg from './admin/ManageCateg';
import ManageProducts from './admin/ManageProducts';
import UpdateCategory from './admin/UpdateCategory';
import UpdateProduct from './admin/UpdateProduct';
import AdminRoutes from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import about from './core/helper/about';
import Cart from './core/helper/Cart';
import Home from'./core/Home'
import AdminDashBoard from './user/AdminDashBoard';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';


function Routes() {
    return (
        <Router>
    
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/about" component={about}/>
        <Route exact path="/signin" component={Signin}/>
        <Route exact path="/signup" component={Signup}/>
        <PrivateRoute exact path="/user/dashboard"component={UserDashBoard}/>
        <PrivateRoute exact path="/cart" component={Cart}/>
        <AdminRoutes exact path="/admin/dashboard"component={AdminDashBoard}/>
        <AdminRoutes exact path="/admin/dashboard/create"component={AddCategory}/>
        <AdminRoutes exact path="/admin/dashboard/manage"component={ManageCateg}/>
        <AdminRoutes exact path="/admin/dashboard/updateCateg/:categId"component={UpdateCategory}/>

        <AdminRoutes exact path="/admin/dashboard/createProduct" component={AddProduct}/>
        <AdminRoutes exact path ="/admin/dashboard/manageProduct" component={ManageProducts}/>
        <AdminRoutes exact path ="/admin/dashboard/updateProduct/:productId" component={UpdateProduct}/>
        </Switch>
            
        </Router>
    )
}

export default Routes
