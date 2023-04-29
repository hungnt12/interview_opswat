import {Alert, AlertTitle, Box, Button, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import axios from "axios";
import {URL_API} from "../../../constant/common";
import {ActionLogin} from "../../../handle/services/authentication";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Index = props => {
    // console.log(312, window.history)
    let navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("tk")){
            navigate("/")
        }
        setErrors([])

        return () => {
            setErrors([])
        };
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await ActionLogin({
            email: data.get('email'),
            password: data.get('password'),
        }, navigate, (e) => {
            if ((e?.errors || []).length > 0) {
                setErrors(e?.errors)
            }
        })
        // let result = await axios({
        //     method: 'post',
        //     url: URL_API.LOGIN,
        //     data: {
        //         email: data.get('email'),
        //         password: data.get('password'),
        //     }
        // });
    };

    return (
        <div className="hn__login--wrapper">
            <Typography component="h1" variant="h5" className="text-center">
                OPSWAT
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {
                    (errors || []).length > 0 ? (
                        <Alert severity="error">
                            {
                                errors.map((i, k) => {
                                    return <p className="mb-1" key={k}>* {i?.raw}</p>
                                })
                            }
                        </Alert>
                    ) : null
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
            </Box>
        </div>
    )
}

export default Index
