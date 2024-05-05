import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../ui/theme";
import HeaderNew from "../../ui/Heading";
import { useTheme } from "@mui/material";
import axios from "axios";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AttendanceSheet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [programmeFilter, setProgrammeFilter] = useState("");
  const [registrationFilter, setRegistrationFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const columns = [
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
    row.signature,
    row.remark,
  ]);
  const headers = [
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleProgrammeFilterChange = (event) => {
    setProgrammeFilter(event.target.value);
  };

  const handleRegistrationFilterChange = (event) => {
    setRegistrationFilter(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const filteredData = data.filter(
    (row) =>
      (!programmeFilter ||
        (row.programme &&
          row.programme.toString().includes(programmeFilter))) &&
      (!registrationFilter ||
        row.registrationno.includes(registrationFilter.trim().toUpperCase())) &&
      (!nameFilter ||
        row.name.toLowerCase().includes(nameFilter.trim().toLowerCase()))
  );

  const generateReport = () => {
    const doc = new jsPDF();

    doc.addImage("logo.png", "PNG", 10, 10, 30, 30);
    doc.addImage(
      "logo.png",
      "PNG",
      doc.internal.pageSize.getWidth() - 40,
      10,
      30,
      30
    );

    const headerText = "Indira Gandhi National Open University";
    doc.setFontSize(18);
    const headerWidth = doc.getTextWidth(headerText) + 10;
    doc.text(
      headerText,
      (doc.internal.pageSize.getWidth() - headerWidth) / 2,
      20
    );

    const subheading1Text = "Study Center MNNIT Allahabad";
    doc.setFontSize(14);
    const subheading1Width = doc.getTextWidth(subheading1Text) + 10;
    doc.text(
      subheading1Text,
      (doc.internal.pageSize.getWidth() - subheading1Width) / 2,
      30
    );

    const subheading2Text = "Attendance Sheet";
    doc.setFontSize(14);
    const subheading2Width = doc.getTextWidth(subheading2Text) + 10;
    doc.text(
      subheading2Text,
      (doc.internal.pageSize.getWidth() - subheading2Width) / 2,
      40
    );

    const tableRows = filteredData.map((row) => [
      row.registrationno,
      row.name,
      row.programme,
      row.signature || "", // Ensure signature is not null or undefined
      row.remark || "", // Ensure remark is not null or undefined
    ]);

    const tableColumns = [
      { header: "Registration No.", dataKey: "registrationno" },
      { header: "Name", dataKey: "name" },
      { header: "Programme", dataKey: "programme" },
      { header: "Signature", dataKey: "signature" },
      { header: "Remark", dataKey: "remark" },
    ];

    doc.autoTable({
      head: [tableColumns.map((column) => column.header)],
      body: tableRows,
      startY: 50,
    });

    // const footerText = "Page " + doc.getCurrentPageInfo().pageNumber;
    // const footerWidth = doc.getTextWidth(footerText);
    // doc.text(
    //   footerText,
    //   doc.internal.pageSize.getWidth() - footerWidth - 10,
    //   doc.internal.pageSize.getHeight() - 10
    // );

    // Add signature, name, stamp, and date to the footer vertically aligned
    const footerY = doc.internal.pageSize.getHeight() - 40;
    const lineSpacing = 10;
    const signatureText = "Signature: ________________________";
    const nameText = "Name: ____________________________";
    const stampText = "Stamp: ___________________________";
    const dateText = "Date: _________________________________";

    doc.text(signatureText, 10, footerY);
    doc.text(nameText, 10, footerY + lineSpacing);
    doc.text(stampText, 10, footerY + lineSpacing * 2);
    doc.text(dateText, 10, footerY + lineSpacing * 3);

    doc.save("attendance_sheet.pdf");
  };

  return (
    <Box m="20px">
      <HeaderNew
        title="Attendance Sheet"
        subtitle="Mark Attendance for Students"
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
          <label>Registration No.:</label>
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
      </Box>
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
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.registrationno}
          processRowUpdate={(newRow, oldRow) => {
            return newRow;
          }}
        />
      </Box>
    </Box>
  );
};

export default AttendanceSheet;
