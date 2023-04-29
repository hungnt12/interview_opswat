import React from 'react'
import {connect} from 'react-redux'
import {Route, withRouter, Redirect} from 'react-router-dom'
import ContainerIndex from "./ContainerIndex";
import routers from '../routers';
import {collectChildrenParentToArray} from "@/utils/functions";
import {find} from "lodash"
import action from "../actions";
import Cookies from "js-cookie";
import {CONFIG_LOCAL_STORAGE, PATHS} from "../constants/Define";
import {LocalStorage} from "../utils";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const {authentication} = rest;
        const path = rest.path,
            permissions = authentication?.user?.rights,
            getAllPermission = [].concat(...Object.values(permissions || {})),
            permissionInRoute = (find(collectChildrenParentToArray(routers), {path: rest.path})?.permission_value || []);
        if (permissionInRoute.length > 0 && permissions) {
            if (rest.path !== "/403") {
                if ((permissionInRoute.map(i => getAllPermission.includes(i)) || []).includes(false)) {
                    props.isUnauthorized = true
                    props.history.push("/403");
                }
            }
            // return !authentication
            // return !authentication.logged
            //     ? <ContainerIndex>
            //         <Component {...props} />
            //     </ContainerIndex>
            //     :
            //     <Redirect to={{pathname: '/login', state: { from: rest.location }}}/>
        }
        return <ContainerIndex>
            <Component {...props} />
        </ContainerIndex>
    }}/>
);

const mapStateToProps = state => ({
    authentication: state.authReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onCheckUser: (token) => {
            dispatch(action.checkUserAction(token))
        },
        // onLogoutRequest: () => {
        //     dispatch(logoutAction());
        // },
        // refreshToken: token => dispatch(action.refreshTokenAction(token)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
