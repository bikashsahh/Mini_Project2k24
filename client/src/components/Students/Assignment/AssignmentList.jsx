import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import { useTheme } from "@mui/material";
import { CSVLink } from "react-csv";
import axios from "axios";
import { saveAs } from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AssignmentList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [isReportDownloaded, setIsReportDownloaded] = useState(false);
  const [pdfColumns, setPdfColumns] = useState([]);

  const columns = [
    { field: "registrationno", headerName: "Registration No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "programme", headerName: "Programme", flex: 1 },
    {
      field: "course_name",
      headerName: "Courses",
      flex: 1,
      renderCell: (params) =>
        params.value ? params.value : <HorizontalRuleIcon size={24} />,
    },
    {
      field: "submitted_at",
      headerName: "Submitted At",
      flex: 1,
      renderCell: (params) =>
        params.value ? params.value : <HorizontalRuleIcon size={24} />,
    },
    {
      field: "file_path",
      headerName: "Download",
      flex: 1,
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            params.row.file_path ? (
              <IconButton onClick={() => downloadFile(params.row.file_path)}>
                <DownloadIcon />
              </IconButton>
            ) : (
              <FileDownloadOffIcon size={24} />
            )
          }
          label="Download"
          disabled={!params.row.file_path}
        />,
      ],
    },
  ];

  const csvData = data.map((row) => columns.map((column) => row[column.field]));
  const headers = columns.map((column) => column.headerName);

  useEffect(() => {
    axios
      .get("http://localhost:3000/assignmentlist")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        // Exclude the "Download" column from pdfColumns
        setPdfColumns(columns.filter((column) => column.field !== "file_path"));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const downloadFile = (filePath) => {
    saveAs(filePath);
  };

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
    const subheading2Text = "Assignments Report";
    doc.setFontSize(14);
    const subheading2Width = doc.getTextWidth(subheading2Text) + 10; // Add some padding
    doc.text(
      subheading2Text,
      (doc.internal.pageSize.getWidth() - subheading2Width) / 2,
      40
    ); // Align subheading 2 to center

    // Add table data
    const tableRows = data.map((row) =>
      pdfColumns.map((column) => row[column.field])
    );
    const tableColumns = pdfColumns.map((column) => ({
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

    doc.save("assignments_report.pdf");
    setIsReportDownloaded(true);
    setPdfColumns([]); // Reset pdfColumns to an empty array
  };

  return (
    <Box m="20px">
      <HeaderNew
        title="Assignment List"
        subtitle="List of Assignments for Future Reference"
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <CSVLink data={csvData} headers={headers} filename="assignments.csv">
          <Button variant="contained" color="primary">
            {" "}
            Download CSV{" "}
          </Button>
        </CSVLink>
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
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) =>
            `${row.registrationno}-${row.name}-${row.course_name}-${row.submitted_at}-${row.file_path}`
          }
        />
      </Box>
    </Box>
  );
};

export default AssignmentList;
