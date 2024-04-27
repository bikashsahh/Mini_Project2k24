// import { Box, Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
// import { mockDataContacts } from "../mockData";
// import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
// import { useTheme } from "@mui/material";
// import { CSVLink } from "react-csv";

// const Contacts = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const columns = [
//     { field: "id", headerName: "ID", flex: 0.5 },
//     { field: "registrarId", headerName: "Registrar ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "age",
//       headerName: "Age",
//       type: "number",
//       headerAlign: "left",
//       align: "left",
//     },
//     { field: "phone", headerName: "Phone Number", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "address", headerName: "Address", flex: 1 },
//     { field: "city", headerName: "City", flex: 1 },
//     { field: "zipCode", headerName: "Zip Code", flex: 1 },
//   ];

//   const csvData = mockDataContacts.map((row) =>
//     columns.map((column) => row[column.field])
//   );
//   const headers = columns.map((column) => column.headerName);
//   // const headers = columns.map((column) => ({
//   //   label: column.headerName,
//   //   key: column.field,
//   // }));

//   return (
//     <Box m="20px">
//       <HeaderNew
//         title="Student List"
//         subtitle="List of Contacts for Future Reference"
//       />
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         m="20px 0"
//       >
//         <CSVLink data={csvData} headers={headers} filename="contacts.csv">
//           <Button variant="contained" color="primary">
//             Download CSV
//           </Button>
//         </CSVLink>
//       </Box>
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           rows={mockDataContacts}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Contacts;
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import { useTheme } from "@mui/material";
import { CSVLink } from "react-csv";
import axios from "axios";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const columns = [
    { field: "registrationno", headerName: "Registration No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "programme", headerName: "Programme", flex: 1 },
    { field: "courses", headerName: "Courses", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    // { field: "submitted_at", headerName: "Submitted At", flex: 1 },
  ];

  const csvData = data.map((row) => columns.map((column) => row[column.field]));
  const headers = columns.map((column) => column.headerName);

  useEffect(() => {
    axios
      .get("http://localhost:3000/studentslist")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Box m="20px">
      <HeaderNew
        title="Student List"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <CSVLink data={csvData} headers={headers} filename="contacts.csv">
          <Button variant="contained" color="primary">
            {" "}
            Download CSV{" "}
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
          "& .name-column--cell": {
            color: colors.greenAccent[300],
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
        {/* <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        /> */}
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.registrationno}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
