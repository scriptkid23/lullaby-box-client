import React from 'react'
import { Redirect, Route } from 'react-router-dom';
export default function AuthenticatedGuard(props) {
    const {isAuthenticated, component: Component, ...rest} = props;
    return (
       <Route
        {...rest}
        render={
            props => {
                if(!localStorage.getItem("roomId")){
                    return <Redirect to="/"/>
                }
                return <Component {...props}/>
            }
        }
       />
    )
}