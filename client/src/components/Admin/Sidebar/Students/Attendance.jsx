import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
import { tokens } from "../../../../theme";
// import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import HeaderNew from "../../DashboardNew/HeaderNew";
import { useTheme } from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";

const AttendanceSheet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);
  const columns = [
    {
      field: "slNo",
      headerName: "Sl.No",
      flex: 0.5,
      // renderCell: (params) => {
      //   const currentRowIndex = rowIndex;
      //   setRowIndex(rowIndex + 1);
      //   // return currentRowIndex + 1; // Render the incremented row index
      // },
      // valueGetter: (params) =>
      //   params.api.getRowIndexRelativeToVisibleRows(params.row, "data") + 1,
    },
    { field: "registrationno", headerName: "Registration No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "programme", headerName: "Programme", flex: 1 },
    { field: "signature", headerName: "Signature", flex: 1, editable: true },
    { field: "remark", headerName: "Remark", flex: 1, editable: true },
  ];

  const csvData = data.map((row) => [
    row.registrationno,
    row.name,
    row.programme,
    row.remark,
  ]);
  const headers = [
    "SL NO",
    "Registration No.",
    "Name",
    "Programme",
    "Signature",
    "Remark",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3000/attendancesheet")
      .then((response) => {
        setData(response.data);
        setRowIndex(0); // Reset the row index
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <HeaderNew
        title="Attendance Sheet"
        subtitle="Mark Attendance for Students"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <CSVLink
          data={csvData}
          headers={headers}
          filename="attendance_sheet.csv"
        >
          <Button variant="contained" color="primary">
            Download CSV
          </Button>
        </CSVLink>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.registrationno}
          processRowUpdate={(newRow, oldRow) => {
            // Handle row update logic here
            return newRow;
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendanceSheet;
