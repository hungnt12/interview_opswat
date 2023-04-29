import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {createElement, useEffect, useState} from "react";
import {capitalizeFirstLetter} from "../../constant/functions";

const TableCustom = props => {
    const [componentAction, setComponentAction] = useState([]);

    const generateAction = (children = [], rowSource) => {
        let components = []
        if (children.length > 0) {
            (children || []).map(i => {
                components.push(createElement(i?.type, {
                    ...i?.props,
                    onClick: () => i?.props?.onAction(rowSource)
                    // onClick: () => props[`on${capitalizeFirstLetter(children.dataIndex)}`](rowSource, i?.props?.typeAction)
                }))
            })
        }
        return components;
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {props?.columns.map((column, key) => (
                                <TableCell
                                    key={column?.dataIndex}
                                    style={{minWidth: 170}}
                                    {
                                        ...column?.optionsHeader
                                    }
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props?.source
                            // .slice(props?.pagination?.pageIndex * props?.pagination?.pageSize, props?.pagination?.pageIndex * props?.pagination?.pageSize + props?.pagination?.pageSize)
                            .map((row, k) => {
                                return (
                                    <TableRow hover role="checkbox" key={k}>
                                        {props?.columns.map((column) => {
                                            const value = row[column.dataIndex];
                                            return (
                                                <TableCell key={column.key} {...column?.optionsContent}>
                                                    {column?.isExtend ? ((column?.optionsContent?.format?.props?.children || []).length > 0) ? (
                                                        generateAction(column?.optionsContent?.format?.props?.children, row)
                                                    ) : createElement(column?.optionsContent?.format?.type, {
                                                        ...column?.optionsContent?.format?.props,
                                                        onClick: () => column?.optionsContent?.format?.props?.onAction(row)
                                                        // onClick: () => props[`on${capitalizeFirstLetter(column.dataIndex)}`](row)
                                                    }) : column?.optionsContent?.format && typeof value === 'number'
                                                        ? column?.optionsContent?.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props?.pagination.total}
                rowsPerPage={props?.pagination?.pageSize}
                page={props?.pagination?.pageIndex-1}
                onPageChange={props?.onChangePage}
                onRowsPerPageChange={props?.onChangePageSize}
            />
        </Paper>
    )
}

export default TableCustom
