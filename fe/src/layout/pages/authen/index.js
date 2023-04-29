import {Alert, AlertTitle, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import axios from "axios";
import {URL_API} from "../../../constant/common";
import {ActionLogin} from "../../../handle/services/authentication";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FIELDS_NAME, FIELDS_VALIDATION} from "../../../handle/mapping/request/users";
import {ActionUsersCreate} from "../../../handle/services/users";
import {SnackbarProvider, useSnackbar} from 'notistack';
import {handleFormError} from "../../../constant/functions";

const Index = props => {
    // console.log(312, window.history)
    let navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [errors, setErrors] = useState([]);
    const [type, setType] = useState("LOGIN"),
        [actionSuccess, setActionSuccess] = useState(""),
        [valueForm, setValueForm] = useState({
            [FIELDS_NAME.email]: "",
            [FIELDS_NAME.username]: "",
            [FIELDS_NAME.fullname]: "",
            [FIELDS_NAME.password]: "",
        });

    useEffect(() => {
        if (localStorage.getItem("tk")) {
            navigate("/")
        }
        setErrors([])

        return () => {
            setType("LOGIN")
            setErrors([])
        };
    }, []);

    const onTypeChange = (type) => {
        setType(type)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            let result = handleFormError(data, FIELDS_VALIDATION)
            if (type === "LOGIN") {
                await ActionLogin({
                    email: data.get('email'),
                    password: data.get('password'),
                }, navigate, (e) => {
                    if ((e?.errors || []).length > 0) {
                        setErrors(e?.errors)
                    }
                })
            } else {
                await ActionUsersCreate({
                    [FIELDS_NAME.email]: data.get(FIELDS_NAME.email),
                    [FIELDS_NAME.username]: data.get(FIELDS_NAME.username),
                    [FIELDS_NAME.fullname]: data.get(FIELDS_NAME.fullname),
                    [FIELDS_NAME.password]: data.get(FIELDS_NAME.password),
                }, navigate, (e) => {
                    if ((e?.errors || []).length > 0) {
                        setErrors(e?.errors)
                    }
                }, e => {
                    setValueForm({
                        [FIELDS_NAME.email]: "",
                        [FIELDS_NAME.username]: "",
                        [FIELDS_NAME.fullname]: "",
                        [FIELDS_NAME.password]: "",
                    })
                    setType("LOGIN")
                    setActionSuccess(e)
                    setTimeout(() => {
                        setActionSuccess("")
                    }, 4000)
                })
            }
            setErrors(result)
        } catch (e) {
            console.log(321, e)
            setErrors(e)
        }
    };

    return (
        <SnackbarProvider maxSnack={3}>
            <div className="hn__login--wrapper">
                <Typography component="h1" variant="h5" className="text-center">
                    OPSWAT
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate sx={{mt: 1}}
                    onChange={e => {
                        e.preventDefault();
                        let data = new FormData(e.currentTarget);
                        setValueForm({
                            [FIELDS_NAME.email]: data.get(FIELDS_NAME.email),
                            [FIELDS_NAME.username]: data.get(FIELDS_NAME.username),
                            [FIELDS_NAME.fullname]: data.get(FIELDS_NAME.fullname),
                            [FIELDS_NAME.password]: data.get(FIELDS_NAME.password),
                        })
                        try {
                            setErrors(handleFormError(new FormData(e.currentTarget), FIELDS_VALIDATION))
                        } catch (e) {
                            setErrors(e)
                        }
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={valueForm[FIELDS_NAME.email]}
                    />
                    {
                        (type === "REGISTER") ? (
                            <>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoFocus
                                    value={valueForm[FIELDS_NAME.username]}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="fullname"
                                    label="Fullname"
                                    type="fullname"
                                    id="fullname"
                                    value={valueForm[FIELDS_NAME.fullname]}
                                />
                            </>
                        ) : null
                    }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={valueForm[FIELDS_NAME.password]}
                    />
                    {
                        actionSuccess ? (
                            <Alert onClose={() => setActionSuccess("")}>{actionSuccess}</Alert>
                        ) : null
                    }

                    {
                        (errors || []).length > 0 ? (
                            <Alert severity="error">
                                {
                                    errors.map((i, k) => {
                                        return <p className="mb-1" key={k}>* {i?.message}</p>
                                    })
                                }
                            </Alert>
                        ) : null
                    }
                    <div className="row mt-3">
                        <div className="col-6">
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                onClick={e => onTypeChange(type === "REGISTER" ? "LOGIN" : "REGISTER")}
                            >
                                {
                                    type === "REGISTER" ? "Cancel" : "Register"
                                }
                            </Button>
                        </div>
                        <div className="col-6">

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                {
                                    type === "LOGIN" ? "Sign In" : "Submit"
                                }
                            </Button>
                        </div>
                    </div>
                </Box>
            </div>
        </SnackbarProvider>
    )
}

export default Index
