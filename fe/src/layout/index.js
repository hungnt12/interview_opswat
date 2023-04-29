import {Outlet, Link} from "react-router-dom";
import Header from "./common/Header";
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
import UsersResponse, {columns as col, UserResponse} from "../handle/mapping/response/users";
import {columnsTable, getDataSource, getTitleTable} from "../constant/functions";
import TableCustom from "./common/TableCustom";
// import {DeleteForeverIcon} from '@mui/icons-material';
// import {DeleteForeverIcon} from '@mui/icons-material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Layout from "./common/Layout";
import {ActionUsersList} from "../handle/services/users";


const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'code', label: 'ISO\u00a0Code', minWidth: 100},
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return new UsersResponse({name, code, population, size, density}).exportList();
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    // createData('France', 'FR', 67022000, 640679),
    // createData('United Kingdom', 'GB', 67545757, 242495),
    // createData('Russia', 'RU', 146793744, 17098246),
    // createData('Nigeria', 'NG', 200962417, 923768),
    // createData('Brazil', 'BR', 210147125, 8515767),
    // createData('1123123123', 'BR', 210147125, 8515767),
    // createData('123412341234', 'BR', 210147125, 8515767),
    // createData('23452352345', 'BR', 210147125, 8515767),
    // createData('sầ', 'BR', 210147125, 8515767),
];

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
                            format: <DeleteForeverIcon className="cursor--pointer"/>
                        }
                    }
                },
                tag: "users"
            })
        },
        [pagination, setPagination] = useState({
            // total: 0,
            // totalPage: 0,
            pageIndex: 0,
            pageSize: 0
        }),
        [resultList, setResultList] = useState([]),
        [isRemove, setIsRemove] = useState(false),
        [itemSelect, setItemSelect] = useState({});

    useEffect(() => {
        return () => {
            setItemSelect(false)
            setIsRemove()
        };
    }, []);

    useEffect(() => {
        async function getList() {
            let result = await ActionUsersList()
            setResultList(result?.result)
            setPagination({
                pageIndex: result?.page_index,
                pageSize: result?.page_size
            })
        }

        getList()
    }, []);

    const onChangePage = (event, newPage) => {
        setPagination({
            ...pagination,
            pageIndex: newPage
        })
        // setPage(newPage);
    };

    const onChangePageSize = (event) => {
        setPagination({
            ...pagination,
            pageSize: +event.target.value,
            pageIndex: 1
        })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };

    const onRemove = (e) => {

    }

    const onAction = (type) => {
        if (type.toLowerCase()) {

        } else {

        }
    }

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
                        <p className="h4 py-3">Users List</p>
                    </div>
                    <div className="col-6 text-end">
                        <Button onClick={e => onAction("CREATE")} autoFocus>
                            Create
                        </Button>
                    </div>
                </div>
                <TableCustom
                    onAction={e => {
                        setIsRemove(true)
                        setItemSelect(e)
                    }}
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
