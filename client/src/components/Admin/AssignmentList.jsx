import React, { useState, useEffect } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../ui/theme";
import HeaderNew from "../../ui/Heading";
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
  const [semesterFilter, setSemesterFilter] = useState("");
  const [programmeFilter, setProgrammeFilter] = useState("");
  const [submittedFilter, setSubmittedFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const columns = [
    { field: "registrationno", headerName: "Registration No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "programme", headerName: "Programme", flex: 1 },
    {
      field: "course_name",
      headerName: "Courses",
      flex: 1,
      renderCell: (params) =>
        params.value ? params.value : <HorizontalRuleIcon />,
    },
    {
      field: "submitted_at",
      headerName: "Submitted At",
      flex: 1,
      renderCell: (params) =>
        params.value ? params.value : <HorizontalRuleIcon />,
    },
    { field: "session", headerName: "Session", flex: 1 }, // Add this line
    { field: "year", headerName: "Year", flex: 1 }, // Add this line
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
              <FileDownloadOffIcon />
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
        setData(response.data);
        setPdfColumns([
          ...columns.filter((column) => column.field !== "file_path"),
          { field: "session", headerName: "Session" },
          { field: "year", headerName: "Year" },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const downloadFile = (filePath) => {
    saveAs(filePath);
  };

  const handleSemesterFilterChange = (event) => {
    setSemesterFilter(event.target.value);
  };

  const handleProgrammeFilterChange = (event) => {
    setProgrammeFilter(event.target.value);
  };

  const handleSubmittedFilterChange = (event) => {
    setSubmittedFilter(event.target.value);
  };

  const handleCourseFilterChange = (event) => {
    setCourseFilter(event.target.value);
  };

  const handleSessionFilterChange = (event) => {
    setSessionFilter(event.target.value);
  };

  const handleYearFilterChange = (event) => {
    setYearFilter(event.target.value);
  };

  const filteredData = data.filter((row) => {
    const semesterMatch = !semesterFilter || row.semester === semesterFilter;
    const programmeMatch =
      !programmeFilter ||
      (row.programme && row.programme.toString().includes(programmeFilter));
    const submittedMatch =
      submittedFilter === ""
        ? true
        : submittedFilter === "true"
        ? row.submitted_at
        : !row.submitted_at;
    const courseMatch =
      !courseFilter ||
      (row.course_name && row.course_name.toString().includes(courseFilter));
    const sessionMatch = !sessionFilter || row.session === sessionFilter;
    const yearMatch = !yearFilter || row.year === parseInt(yearFilter);

    return (
      semesterMatch &&
      programmeMatch &&
      submittedMatch &&
      courseMatch &&
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
    const headerWidth =
      (doc.getStringUnitWidth(headerText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(
      headerText,
      (doc.internal.pageSize.getWidth() - headerWidth) / 2,
      20
    ); // Align header to center

    // Add subheading 1
    const subheading1Text = "Study Center MNNIT Allahabad";
    doc.setFontSize(14);
    const subheading1Width =
      (doc.getStringUnitWidth(subheading1Text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(
      subheading1Text,
      (doc.internal.pageSize.getWidth() - subheading1Width) / 2,
      30
    ); // Align subheading 1 to center

    // Add subheading 2
    const subheading2Text = "Assignments Report";
    doc.setFontSize(14);
    const subheading2Width =
      (doc.getStringUnitWidth(subheading2Text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
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
    const footerText = "Page " + doc.internal.getNumberOfPages();
    const footerWidth =
      (doc.getStringUnitWidth(footerText) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(
      footerText,
      doc.internal.pageSize.getWidth() - footerWidth - 10,
      doc.internal.pageSize.getHeight() - 10
    );
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
      <Box display="flex" alignItems="center" mb={2}>
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
        <Box>
          <label>Submitted:</label>
          <select
            value={submittedFilter}
            onChange={handleSubmittedFilterChange}
          >
            <option value="">All</option>
            <option value="true">Submitted</option>
            <option value="false">Not Submitted</option>
          </select>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        m="20px 0"
      >
        <CSVLink data={csvData} headers={headers} filename="assignments.csv">
          <Button variant="contained" color="primary">
            Download CSV
          </Button>
        </CSVLink>
        <Button variant="contained" color="primary" onClick={generateReport}>
          Download Report
        </Button>
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid
          rows={filteredData}
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
