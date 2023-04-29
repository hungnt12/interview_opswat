import {Outlet, Link, useNavigate} from "react-router-dom";
import Header from "../../common/Header";
import {DataGrid} from '@mui/x-data-grid';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import ArticlesResponse, {columns as col} from "../../../handle/mapping/response/articles";
import {columnsTable, getDataSource, getTitleTable} from "../../../constant/functions";
import TableCustom from "../../common/TableCustom";
// import {DeleteForeverIcon} from '@mui/icons-material';
// import {DeleteForeverIcon} from '@mui/icons-material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Layout from "../../common/Layout";
import {ActionUsersList} from "../../../handle/services/users";
import {ActionArticlesDelete, ActionArticlesList} from "../../../handle/services/articles";
import {closeSnackbar, enqueueSnackbar} from "notistack";


const Index = props => {
    const initTables = {
            tagName: "articles",
            titleTable: getTitleTable(col, ['action'], []),
            modalSource: col,
            columns: columnsTable({
                titleTable: getTitleTable(col, ['action'], []),
                component: {
                    action: {
                        isExtend: true,
                        styleCustom: {minWidth: 50},
                        optionsHeader: {
                            align: 'center',
                        },
                        optionsContent: {
                            align: 'center',
                            format: (
                                <>
                                    <DeleteForeverIcon className="cursor--pointer" typeAction="delete" onAction={item => {
                                        enqueueSnackbar('Are you sure to delete', {
                                            action: (e) => action(e, item),
                                            preventDuplicate: true
                                        })
                                    }}/>
                                    <EditIcon className="cursor--pointer" typeAction="edit"
                                              onAction={e => onCreate("UPDATE", e)}/>
                                </>
                            )
                        }
                    }
                },
                tag: "articles"
            })
        },
        [pagination, setPagination] = useState({
            total: 0,
            // totalPage: 0,
            pageIndex: 0,
            pageSize: 0
        }),
        navigate = useNavigate(),
        [resultList, setResultList] = useState([]),
        [isRemove, setIsRemove] = useState(false),
        [itemSelect, setItemSelect] = useState({});

    useEffect(() => {
        return () => {
            setItemSelect(false)
            setIsRemove()
        };
    }, []);

    async function getList(params) {
        let result = await ActionArticlesList(params)
        setResultList(result?.result)
        setPagination({
            pageIndex: result?.page_index,
            pageSize: result?.page_size,
            total: result?.total
        })
    }

    async function removeItem(e, snackbarId) {
        let result = await ActionArticlesDelete(e, null, () => {
        }, enqueueSnackbar)
        getList();
        closeSnackbar(snackbarId)
    }

    useEffect(() => {
        getList()
    }, []);
    const onChangePage = (event, newPage) => {
        getList({page_index: newPage + 1})
        setPagination({
            ...pagination,
            pageIndex: newPage
        })
        // setPage(newPage);
    };

    const onChangePageSize = (event) => {
        getList({page_size: +event.target.value})
        setPagination({
            ...pagination,
            pageSize: +event.target.value,
            pageIndex: 1
        })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    const onRemove = (e, snackbarId) => {
        removeItem(e, snackbarId)
    }

    const onCreate = (type, item) => {
        if (type.toLowerCase() === 'create') {
            navigate("/articles/action")
        } else {
            navigate(`/articles/action/${item?.id}`, {state: {id: item?.id}})
        }
    }

    const action = (snackbarId, item) => (
        <>
            <button onClick={() => onRemove(item, snackbarId)}>
                Remove
            </button>
            <button onClick={() => {
                closeSnackbar(snackbarId)
            }}>
                Cancel
            </button>
        </>
    );

    return (
        <>
            <Dialog
                open={isRemove}
                onClose={() => setIsRemove(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Notification
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={e => setIsRemove(false)}>Cancel</Button>
                    <Button onClick={e => onRemove()} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="container py-4">
                <div className="row">
                    <div className="col-6">
                        <p className="h4 py-3">Articles List</p>
                    </div>
                    <div className="col-6 text-end">
                        <Button onClick={e => onCreate("CREATE")}>
                            Create
                        </Button>
                    </div>
                </div>

                <TableCustom
                    // onAction={(e, type) => {
                    //     console.log(4444, {e, type})
                    //     setIsRemove(true)
                    //     setItemSelect(e)
                    // }}
                    columns={initTables?.columns}
                    source={getDataSource(resultList || [], initTables.modalSource)}
                    onChangePage={onChangePage}
                    onChangePageSize={onChangePageSize}
                    pagination={pagination}
                />
            </div>
        </>
    )
}

export default Index;
