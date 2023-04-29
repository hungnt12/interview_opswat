import Header from "./Header";
import {
    Outlet,
} from "react-router-dom";
import { SnackbarProvider, useSnackbar } from 'notistack';

const Layout = props => {
    return (
        <SnackbarProvider maxSnack={3}>
            <Header/>

            <Outlet />
        </SnackbarProvider>
    )
}

export default Layout
