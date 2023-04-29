import React, {Component} from 'react';
import {Button} from "@mui/material";
import {Route, Routes, Navigate, useLocation, useHistory} from "react-router-dom";
import Layouts from "./layouts";
import Error from "./layout/Error";
import Authentication from "./layout/pages/authen";
// import {
//     Routes,
//     Route,
//     Link,
//     useNavigate,
//     useLocation,
//     Navigate,
//     Outlet,
// } from "react-router-dom";
// import {PATHS} from '../constants/Define';
// import Layout from '../containers/layout/Main';
// import LoginRoute from './LoginRoute';
// import PrivateRoute from './PrivateRoute';
//
// import App from './App';
// import Error from './layout/Error';

const MainRouter = props => {
    let location = useLocation();


    return (
        <Routes>
            <Route path='/login' exact={false} element={<Layouts.Authentication/>}/>
            <Route path="/" element={<Layouts.Layout/>}>
                <Route index exact={true} element={
                    <AuthVerify>
                        <Layouts.Index/>
                    </AuthVerify>}/>
                <Route path='/articles/list' loader={({ params }) => {
                    return "articles";
                }} exact={false} element={
                    <AuthVerify>
                        <Layouts.Article/>
                    </AuthVerify>}/>
                <Route path='/articles/action'  exact={false} element={
                    <AuthVerify>
                        <Layouts.ArticleAction/>
                    </AuthVerify>}/>
                <Route path='/articles/action/:id'  exact={false} element={
                    <AuthVerify>
                        <Layouts.ArticleAction/>
                    </AuthVerify>}/>
                {/*<Route path='/404' exact={false} element={Error}/>*/}
                {/*<LoginRoute path="/login" element={Layout.Login} />*/}
                {/*<PrivateRoute path="/" exact element={Layout.Index} />*/}
                {/*<PrivateRoute path="/" exact element={Layout.Voucher}/>*/}
                {/*<PrivateRoute path="/403" exact element={Layout.Error403}/>*/}
                <Route path='' exact={false} element={Error}/>
            </Route>
        </Routes>
    );
}

export default MainRouter;

const AuthVerify = props => {
    let token = localStorage.getItem("tk");
    let location = useLocation();
    if (token) {
        return props?.children
    } else {
        return <Navigate to="/login" state={{from: location}} replace/>;
    }
}

