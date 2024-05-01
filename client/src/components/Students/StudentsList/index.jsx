// import React, { useState, useEffect } from "react";
// import { Box, Button } from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import { tokens } from "../../../theme";
// import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
// import { useTheme } from "@mui/material";
// import { CSVLink } from "react-csv";
// import axios from "axios";

// const StudentsList = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [data, setData] = useState([]);

//   const columns = [
//     { field: "registrationno", headerName: "Registration No.", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "programme", headerName: "Programme", flex: 1 },
//     { field: "courses", headerName: "Courses", flex: 1 },
//     { field: "mobile", headerName: "Mobile", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     // { field: "submitted_at", headerName: "Submitted At", flex: 1 },
//   ];

//   const csvData = data.map((row) => columns.map((column) => row[column.field]));
//   const headers = columns.map((column) => column.headerName);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/studentslist")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   return (
//     <Box m="20px">
//       <HeaderNew
//         title="Student List"
//         subtitle="List of Students for Future Reference"
//       />
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         m="20px 0"
//       >
//         <CSVLink data={csvData} headers={headers} filename="contacts.csv">
//           <Button variant="contained" color="primary">
//             {" "}
//             Download CSV{" "}
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
//           rows={data}
//           columns={columns}
//           components={{ Toolbar: GridToolbar }}
//           getRowId={(row) => row.registrationno}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default StudentsList;
import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import { useTheme } from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const StudentsList = () => {
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
  ];

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

  // const generateReport = () => {
  //   const doc = new jsPDF();

  //   // Add header
  //   const headerText = "INDIRA GANDHI NATIONAL OPEN UNIVERSITY";
  //   doc.setFontSize(18);
  //   const headerWidth = doc.getTextWidth(headerText) + 10; // Add some padding
  //   doc.text(
  //     headerText,
  //     (doc.internal.pageSize.getWidth() - headerWidth) / 2,
  //     20
  //   ); // Align header to center

  //   // Add table data
  //   const tableRows = data.map((row) =>
  //     columns.map((column) => row[column.field])
  //   );
  //   const tableColumns = columns.map((column) => ({
  //     header: column.headerName,
  //     dataKey: column.field,
  //   }));

  //   doc.autoTable({
  //     head: [tableColumns.map((column) => column.header)],
  //     body: tableRows,
  //     startY: 30, // Start the table a bit below the header
  //   });

  //   // Add footer
  //   const footerText = "Page " + doc.getCurrentPageInfo().pageNumber;
  //   const footerWidth = doc.getTextWidth(footerText);
  //   doc.text(
  //     footerText,
  //     doc.internal.pageSize.getWidth() - footerWidth - 10,
  //     doc.internal.pageSize.getHeight() - 10
  //   ); // Position the footer on the bottom-right

  //   doc.save("student_report.pdf");
  // };
  const generateReport = () => {
    const doc = new jsPDF();

    // Add logo (if available)
    // You need to provide the logo image file path or data URL
    const logoImageData = "/logo.png"; // Replace with the actual logo image file path or data URL
    doc.addImage(logoImageData, "PNG", 10, 10, 30, 30); // Adjust the positioning and dimensions as needed

    // Add header
    const headerText = "Indira Gandhi National Open University";
    doc.setFontSize(18);
    const headerWidth = doc.getTextWidth(headerText) + 10; // Add some padding
    doc.text(
      headerText,
      (doc.internal.pageSize.getWidth() - headerWidth) / 2,
      20
    ); // Align header to center

    // Add subheading 1
    const subheading1Text = "Study Center MNNIT Allahabad";
    doc.setFontSize(14);
    const subheading1Width = doc.getTextWidth(subheading1Text) + 10; // Add some padding
    doc.text(
      subheading1Text,
      (doc.internal.pageSize.getWidth() - subheading1Width) / 2,
      30
    ); // Align subheading 1 to center

    // Add subheading 2
    const subheading2Text = "Students Report";
    doc.setFontSize(14);
    const subheading2Width = doc.getTextWidth(subheading2Text) + 10; // Add some padding
    doc.text(
      subheading2Text,
      (doc.internal.pageSize.getWidth() - subheading2Width) / 2,
      40
    ); // Align subheading 2 to center

    // Add table data
    const tableRows = data.map((row) =>
      columns.map((column) => row[column.field])
    );
    const tableColumns = columns.map((column) => ({
      header: column.headerName,
      dataKey: column.field,
    }));

    doc.autoTable({
      head: [tableColumns.map((column) => column.header)],
      body: tableRows,
      startY: 50, // Start the table a bit below the subheadings
    });

    // Add footer
    const footerText = "Page " + doc.getCurrentPageInfo().pageNumber;
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(
      footerText,
      doc.internal.pageSize.getWidth() - footerWidth - 10,
      doc.internal.pageSize.getHeight() - 10
    ); // Position the footer on the bottom-right

    doc.save("student_report.pdf");
  };
  return (
    <Box m="20px">
      <HeaderNew
        title="Student List"
        subtitle="List of Students for Future Reference"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <Button variant="contained" color="primary" onClick={generateReport}>
          Download Report
        </Button>
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
        <DataGrid
          rows={data}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          getRowId={(row) => row.registrationno}
        />
      </Box>
    </Box>
  );
};

export default StudentsList;
