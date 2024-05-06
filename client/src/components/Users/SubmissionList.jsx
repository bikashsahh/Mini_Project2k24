import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
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
import { useUserContext } from "../../context/context";

const SubmissionList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const { registrationno } = useUserContext();
  const columns = [
    { field: "course_name", headerName: "Course", flex: 1 },
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
    if (registrationno) {
      axios
        .get(
          `https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/studentsubmissionslist?registrationno=${registrationno}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [registrationno]);

  const downloadFile = (filePath) => {
    saveAs(filePath);
  };

  return (
    <Box m="20px">
      <HeaderNew
        title="Submssion List"
        subtitle="List of submission for Future Reference"
      />

      {/* <Box
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
      </Box> */}
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
          getRowId={(row) => row.course_name}
        />
      </Box>
    </Box>
  );
};

export default SubmissionList;
