import React from 'react'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'

const  UserDashBoard =()=> {
    return (
        <div>
            <Base>
            <h1>This is {isAuthenticated().User.name}</h1>
            </Base>
        </div>
    )
}

export default UserDashBoard;
