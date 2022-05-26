import React, { useMemo } from "react";
// import css
import "./permissionsStyle.css";
// react table
import { useTable, useSortBy, usePagination } from "react-table";

// react bootstrap
import { FaPen, FaTrash, FaQrcode, FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";

// mui
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { FormControl, InputLabel } from "@mui/material";

const BasicTable = ({
    columnHeads,
    tableData,
    hasTracing,
    hasDelete,
    hasEdit,
    hasQR,
    isFetching,
    editModalFunction,
    deleteModalFunction,
    qrModalFunction,
    tracerModalFunction,
}) => {
    // settings up headers and columns
    const columns = useMemo(() => columnHeads, [columnHeads]);
    const data = useMemo(() => tableData, [tableData]);

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 20 }
        },
        useSortBy,
        usePagination
    );

    // react table props
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        prepareRow, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize, 
        state: { pageIndex, pageSize } 
    } = tableInstance;

    // time convertion
    const convertTo112HourFormat = (time) => {
        // Check correct time format and split into components
        time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join("");
    };

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("Date");

    // sorting process starts here
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const numberSensorship = (num) => {
        let deconstruct = num.split("");
        deconstruct[4] = "*";
        deconstruct[5] = "*";
        deconstruct[6] = "*";
        deconstruct[7] = "*";
        deconstruct[8] = "*";
        deconstruct[9] = "*";
        return deconstruct.join("");
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: "63vh" }}>
                <Table stickyHeader aria-label="sticky table" {...getTableProps()}>
                {isFetching && (
                    <TableRow className="d-flex justify-content-center w-100 mt-3 mb-3">
                    <TableCell>
                        <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </TableCell>
                    </TableRow>
                )}
                {!isFetching && (
                    <>
                    <TableHead>
                        {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                            <TableCell
                                key={column.Header}
                                sortDirection={orderBy === column.Header ? order : false}
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                            >
                                <TableSortLabel
                                    active={orderBy === column.Header}
                                    direction={orderBy === column.Header ? order : "asc"}
                                    style={{ color: "#2a749f", fontWeight: "bold" }}
                                    onClick={(e) => handleRequestSort(e, column.Header)}
                                >
                                {column.render("Header")}
                                {orderBy === column.Header ? (
                                    <Box component="span" sx={visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                    </Box>
                                ) : null}
                                </TableSortLabel>
                            </TableCell>
                            ))}
                        </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {
                        // this section renders the data inside an array
                        tableData &&
                            page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    if (cell.column.Header === "No.") {
                                    return <TableCell>{pageSize * pageIndex +  i + 1}</TableCell>;
                                    }

                                    if (
                                    cell.column.Header === "Faculty Name" ||
                                    cell.column.Header === "Name"
                                    ) {
                                    return (
                                        <TableCell>
                                        {cell.row.original.firstName +
                                            " " +
                                            cell.row.original.middleName?.toUpperCase() +
                                            " " +
                                            cell.row.original.lastName}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Users Contact No.") {
                                    return (
                                        <TableCell>
                                        {numberSensorship(
                                            cell.row.original.userId.mobileNumber
                                        )}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Date") {
                                    return (
                                        <TableCell>{cell.row.original.date}</TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Role Name") {
                                    return (
                                        <TableCell>
                                        <b>{cell.row.original.name.toUpperCase()}</b>
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Time") {
                                    return (
                                        <TableCell>
                                        {convertTo112HourFormat(
                                            cell.row.original.time
                                        )}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Close Contact Number") {
                                    return (
                                        <TableCell>
                                        {numberSensorship(
                                            cell.row.original.userId.mobileNumber
                                        )}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Contact Number") {
                                    return (
                                        <TableCell>
                                        {numberSensorship(
                                            cell.row.original.mobileNumber
                                        )}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Health Status") {
                                        return (
                                            <TableCell
                                            style={{
                                                fontWeight: "bold",
                                                color:
                                                cell.row.original.userHealthStatus ===
                                                "Positive"
                                                    ? "red"
                                                    : "#30b8a6",
                                            }}
                                            >
                                            {cell.row.original.userHealthStatus}
                                            </TableCell>
                                        );
                                    }

                                    if (cell.column.Header === "Current Status") {
                                        return (
                                            <TableCell
                                            style={{
                                                fontWeight: "bold",
                                                color:
                                                cell.row.original.healthStatus ===
                                                "Positive"
                                                    ? "red"
                                                    : "#30b8a6",
                                            }}
                                            >
                                            {cell.row.original.healthStatus}
                                            </TableCell>
                                        );
                                    }

                                    if (cell.column.Header === "Registration Date") {
                                    return (
                                        <TableCell>
                                        {cell.row.original.createdAt.split("T")[0]}
                                        </TableCell>
                                    );
                                    }

                                    if (cell.column.Header === "Action") {
                                    return (
                                        <TableCell
                                        className={
                                            cell.row.original.action ===
                                            "Scanned the QR Code"
                                            ? "entry"
                                            : "exit"
                                        }
                                        >
                                        {cell.row.original.action}
                                        </TableCell>
                                    );
                                    }
                                    //Permissions
                                    if (cell.column.Header === "Permissions") {
                                    return (
                                        <TableCell>
                                        <div className="permission-container">
                                            {cell.row.original.permissions.map(
                                            (data) => {
                                                return (
                                                <Badge
                                                    className={data.name.split(":")[0]}
                                                >
                                                    {data.name}
                                                </Badge>
                                                );
                                            }
                                            )}
                                        </div>
                                        </TableCell>
                                    );
                                    }

                                    if (
                                    cell.column.Header === "Date Created" ||
                                    cell.column.Header === "Date"
                                    ) {
                                    return (
                                        <TableCell>
                                        {cell.row.original.createdAt?.split("T")[0]}
                                        </TableCell>
                                    );
                                    }

                                    if (
                                    hasTracing &&
                                    cell.column.Header === "Actions"
                                    ) {
                                    return (
                                        <TableCell className="iconBtnWrapper">
                                        <button
                                            className="accentBtn mt-0 mb-0"
                                            title="Delete"
                                            onClick={() =>
                                            tracerModalFunction(
                                                cell.row.original?.mobileNumber
                                            )
                                            }
                                        >
                                            <FaEye /> Trace Contacts
                                        </button>
                                        </TableCell>
                                    );
                                    }

                                    // note you can merge this line of code even further
                                    if (
                                    cell.column.Header === "Actions" &&
                                    hasEdit &&
                                    hasDelete &&
                                    !hasQR
                                    ) {
                                    return (
                                        <TableCell className="iconBtnWrapper">
                                        <button
                                            className="iconBtn mr-10"
                                            title="Edit"
                                        >
                                            <FaPen
                                            color="#2a749f"
                                            onClick={() =>
                                                editModalFunction(
                                                cell.row.original?._id
                                                )
                                            }
                                            />
                                        </button>
                                        <button className="iconBtn" title="Delete">
                                            <FaTrash
                                            color="red"
                                            onClick={() =>
                                                deleteModalFunction(
                                                cell.row.original?._id
                                                )
                                            }
                                            />
                                        </button>
                                        </TableCell>
                                    );
                                    } else if (
                                    cell.column.Header === "Actions" &&
                                    hasEdit &&
                                    hasDelete &&
                                    hasQR
                                    ) {
                                    return (
                                        <TableCell className="iconBtnWrapper">
                                        <button
                                            className="iconBtn mr-10"
                                            title="QR Code"
                                        >
                                            <FaQrcode
                                            color="black"
                                            onClick={() =>
                                                qrModalFunction(cell.row.original?._id)
                                            }
                                            />
                                        </button>
                                        <button
                                            className="iconBtn mr-10"
                                            title="Edit"
                                        >
                                            <FaPen
                                            color="#2a749f"
                                            onClick={() =>
                                                editModalFunction(
                                                cell.row.original?._id
                                                )
                                            }
                                            />
                                        </button>
                                        <button className="iconBtn" title="Delete">
                                            <FaTrash
                                            color="red"
                                            onClick={() =>
                                                deleteModalFunction(
                                                cell.row.original?._id
                                                )
                                            }
                                            />
                                        </button>
                                        </TableCell>
                                    );
                                    }
                                    return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </TableCell>
                                    );
                                })}
                                </TableRow>
                            );
                            })
                        }
                        {tableData.length === 0 && (
                        <TableRow>
                            <TableCell>No data to be displayed at the moment</TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                    </>
                )}
                </Table>
            </TableContainer>
            <Paper style={{ padding: "5px"}}>
                <div style={{ width: "100%", display: "flex", justifyContent: "right"}}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small">Page Size</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={pageSize}
                            onChange={e => {setPageSize(Number(e.target.value))}}
                            autoWidth
                            label="Page Size"
                        >
                            {
                                [20, 50, 75, 100, 500, 1000].map(pageSize => (<MenuItem key={pageSize} value={pageSize}>Show {pageSize}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                    <div style={{ marginTop: "13px"}}>
                        <Button variant="text" onClick={() => previousPage()} disabled={!canPreviousPage}><FaArrowLeft/></Button>{' '}
                        <span>Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <Button variant="text" onClick={() => nextPage()} disabled={!canNextPage}><FaArrowRight/></Button>
                    </div>
                </div>
            </Paper>
        </Paper>
    );
};

export default BasicTable;
