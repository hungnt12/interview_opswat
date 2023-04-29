import {Alert, Box, Button, InputLabel, OutlinedInput, TextField, FormControl} from "@mui/material";
import {FIELDS_NAME, FIELDS_VALIDATION} from "../../../../handle/mapping/request/authentication";
import {handleFormError} from "../../../../constant/functions";
import {useEffect, useState} from "react";
import {find} from "lodash";
import {
    ActionArticlesCreate,
    ActionArticlesItem,
    ActionArticlesList,
    ActionArticlesUpdate
} from "../../../../handle/services/articles";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {SnackbarProvider, useSnackbar} from 'notistack';


const Index = props => {
    const [type, setType] = useState("CREATE"),
        [errors, setErrors] = useState([]),
        [valueForm, setValueForm] = useState({
            [FIELDS_NAME.title]: "",
            [FIELDS_NAME.body]: "",
        }),
        [item, setItem] = useState(),
        searchParams = useParams();
    const {enqueueSnackbar} = useSnackbar();
    let navigate = useNavigate();

    useEffect(() => {
        if (searchParams?.id) {
            setType("UPDATE")
            getItem();
        } else {
            setType("CREATE")
        }
        return () => {
            setItem(undefined)
        }
    }, []);

    useEffect(() => {
        if (Object?.keys(item || {}).length) {
            setValueForm({
                [FIELDS_NAME.title]: item[FIELDS_NAME.title],
                [FIELDS_NAME.body]: item[FIELDS_NAME.body]
            })
        }
    }, [item]);

    async function getItem() {
        let result = await ActionArticlesItem(searchParams);
        setItem(result)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        try {
            let result = handleFormError(data, FIELDS_VALIDATION),
                values = {
                    title: data.get("title"),
                    body: data.get("body")
                };
            if (type === "CREATE") {
                await ActionArticlesCreate(valueForm, navigate, (e) => {
                    if ((e?.errors || []).length > 0) {
                        setErrors(e?.errors)
                    }
                }, enqueueSnackbar)
            } else {
                await ActionArticlesUpdate({...valueForm, id: searchParams?.id}, navigate, (e) => {
                    if ((e?.errors || []).length > 0) {
                        setErrors(e?.errors)
                    }
                }, enqueueSnackbar)
            }
            setErrors(result)
        } catch (e) {
            setErrors(e)
        }
    }

    return (
        <div className="container hn__articles-action--wrapper">
            <p className="h4 py-3">Articles {`${type === "CREATE" ? "Create" : "Update"}`}</p>
            <Box
                component="form"
                onSubmit={handleSubmit}
                onChange={e => {
                    e.preventDefault();
                    let values = new FormData(e.currentTarget);
                    setValueForm({
                        [FIELDS_NAME.title]: values.get(FIELDS_NAME.title),
                        [FIELDS_NAME.body]: values.get(FIELDS_NAME.body)
                    })
                    try {
                        setErrors(handleFormError(new FormData(e.currentTarget), FIELDS_VALIDATION))
                    } catch (e) {
                        setErrors(e)
                    }
                }}
                noValidate
                sx={{mt: 1}}>
                <FormControl className="w-100 mb-4">
                    <InputLabel htmlFor="component-outlined">Title</InputLabel>
                    <OutlinedInput
                        required
                        id="component-outlined"
                        label="Title"
                        name={FIELDS_NAME.title}
                        error={Object?.keys(find(errors, {field: FIELDS_NAME.title}) || {}).length > 0}
                        helperText={find(errors, {field: FIELDS_NAME.title})?.message}
                        value={valueForm[FIELDS_NAME.title]}
                    />
                </FormControl>
                <TextField
                    className="w-100"
                    id="outlined-multiline-static"
                    required
                    label="Content"
                    multiline
                    rows={4}
                    name={FIELDS_NAME.body}
                    error={Object?.keys(find(errors, {field: FIELDS_NAME.body}) || {}).length > 0}
                    helperText={find(errors, {field: FIELDS_NAME.body})?.message}
                    value={valueForm[FIELDS_NAME.body]}
                />
                <div className="text-end mt-4">
                    <Button
                        type="button"
                        variant="outlined"
                        className="me-3"
                        onClick={e => navigate("/articles/list")}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Box>
        </div>
    )
}

export default Index
