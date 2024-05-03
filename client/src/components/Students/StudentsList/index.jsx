import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import HeaderNew from "../../Admin/DashboardNew/HeaderNew";
import { useTheme } from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

const StudentsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [pdfColumns, setPdfColumns] = useState([]);
  const [programmeFilter, setProgrammeFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [registrationFilter, setRegistrationFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const columns = [
    { field: "registrationno", headerName: "Registration No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "programme", headerName: "Programme", flex: 1 },
    { field: "courses", headerName: "Courses", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "session", headerName: "Session", flex: 1 }, // Add this line
    { field: "year", headerName: "Year", flex: 1 }, // Add this line
  ];

  const csvData = data.map((row) => columns.map((column) => row[column.field]));
  const headers = columns.map((column) => column.headerName);

  useEffect(() => {
    axios
      .get("http://localhost:3000/studentslist")
      .then((response) => {
        setData(response.data);
        setPdfColumns(columns);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProgrammeFilterChange = (event) => {
    setProgrammeFilter(event.target.value);
  };

  const handleCourseFilterChange = (event) => {
    setCourseFilter(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleRegistrationFilterChange = (event) => {
    setRegistrationFilter(event.target.value);
  };

  const handleSessionFilterChange = (event) => {
    setSessionFilter(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };
  const filteredData = data.filter((row) => {
    const programmeMatch =
      !programmeFilter ||
      (row.programme &&
        row.programme
          .toString()
          .toLowerCase()
          .includes(programmeFilter.toLowerCase()));
    const courseMatch =
      !courseFilter ||
      (row.courses &&
        row.courses
          .toString()
          .toLowerCase()
          .includes(courseFilter.toLowerCase()));
    const nameMatch =
      !nameFilter ||
      (row.name &&
        row.name.toString().toLowerCase().includes(nameFilter.toLowerCase()));
    const registrationMatch =
      !registrationFilter ||
      (row.registrationno &&
        row.registrationno
          .toString()
          .toLowerCase()
          .includes(registrationFilter.toLowerCase()));

    const sessionMatch =
      !sessionFilter ||
      (row.session &&
        row.session
          .toString()
          .toLowerCase()
          .includes(sessionFilter.toLowerCase()));
    const yearMatch = !yearFilter || row.year === parseInt(yearFilter);
    return (
      programmeMatch &&
      courseMatch &&
      nameMatch &&
      registrationMatch &&
      sessionMatch &&
      yearMatch
    );
  });

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
    const tableRows = filteredData.map((row) =>
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

    doc.save("student_report.pdf");
  };

  return (
    <Box m="20px">
      <HeaderNew
        title="Student List"
        subtitle="List of Students for Future Reference"
      />
      <Box display="flex" alignItems="center" mb={2}>
        <Box mr={2}>
          <label>Name:</label>
          <input
            type="text"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </Box>
        <Box mr={2}>
          <label>Registration No:</label>
          <input
            type="text"
            value={registrationFilter}
            onChange={handleRegistrationFilterChange}
          />
        </Box>
        <Box mr={2}>
          <label>Programme:</label>
          <input
            type="text"
            value={programmeFilter}
            onChange={handleProgrammeFilterChange}
          />
        </Box>
        <Box mr={2}>
          <label>Course:</label>
          <input
            type="text"
            value={courseFilter}
            onChange={handleCourseFilterChange}
          />
        </Box>
        <Box mr={2}>
          <label>Session:</label>
          <input
            type="text"
            value={sessionFilter}
            onChange={handleSessionFilterChange}
          />
        </Box>
        <Box mr={2}>
          <label>Year:</label>
          <input
            type="text"
            value={yearFilter}
            onChange={handleYearFilterChange}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <CSVLink data={csvData} headers={headers} filename="students.csv">
          <Button variant="contained" color="primary">
            Download CSV
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
          rows={filteredData}
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
