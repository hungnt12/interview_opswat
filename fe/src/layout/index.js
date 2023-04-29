import {Outlet, Link, useNavigate} from "react-router-dom";
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
import {columns as col} from "../handle/mapping/response/users";
import {columnsTable, getDataSource, getTitleTable} from "../constant/functions";
import TableCustom from "./common/TableCustom";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {closeSnackbar, enqueueSnackbar} from "notistack";
import {ActionUsersList, ActionUsersDelete} from "../handle/services/users";


const Index = props => {
    const initTables = {
            tagName: "users",
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
                            format: <DeleteForeverIcon className="cursor--pointer" typeAction="delete" onAction={item => {
                                enqueueSnackbar('Are you sure to delete', {
                                    action: (e) => action(e, item),
                                    preventDuplicate: true
                                })
                            }}/>
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
        let result = await ActionUsersList(params)
        setResultList(result?.result)
        setPagination({
            pageIndex: result?.page_index,
            pageSize: result?.page_size,
            total: result?.total
        })
    }

    async function removeItem(e, snackbarId) {
        let result = await ActionUsersDelete(e, null, () => {
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
            navigate("/users/action")
        } else {
            navigate(`/users/action/${item?.id}`, {state: {id: item?.id}})
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
            <div className="container py-4">
                <div className="row">
                    <div className="col-12">
                        <p className="h4 py-3">Users List</p>
                    </div>
                </div>

                <TableCustom
                    // onAction={(item) => {
                    //     enqueueSnackbar('Are you sure to delete', {
                    //         action: (e) => action(e, item),
                    //         preventDuplicate: true
                    //     })
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
