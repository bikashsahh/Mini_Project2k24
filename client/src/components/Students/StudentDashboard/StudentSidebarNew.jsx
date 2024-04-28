import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const StudentSidebarNew = ({ handlePage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  function handleClick(pg) {
    console.log("Side Bar click", pg);
    setSelected(pg);
    handlePage(pg);
  }
  // const dispatch = useDispatch();
  // const tab = useSelector((state) => state.selectedTab.tab);
  // // const setTab = useSelector((state) => state.selectedTab.setTab);
  // console.log("settab at sidebar", tab);
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
              // padding: "5px",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="50px"
                    height="50px"
                    src={`logo.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                {/* <Typography variant="h2" color={colors.grey[100]}>
                  Admin
                </Typography> */}
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  sx={{ marginLeft: "10px" }}
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px">
              <Box textAlign="center">
                <Typography
                  // className=" logotext"
                  variant="h4"
                  sx={{ marginLeft: "10px", p: 1 }}
                >
                  MNNIT ALLAHABAD
                  <br />
                  <span className="">IGNOU Study Centre</span>
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Box onClick={() => handleClick("Dashboard")}>
              <Item
                title="Dashboard"
                // to="/"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Student
            </Typography>
            <Box onClick={() => handleClick("Profile")}>
              <Item
                title="Profile"
                // to="/"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>

            {/* <Box onClick={() => handleClick("EnrolledCourses")}>
              <Item
                title="Enrolled Courses"
                // to="/ImportStudentData"
                icon={<ImportExportIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Services
            </Typography>
            <Box onClick={() => handleClick("Assignments")}>
              <Item
                title="Assignments"
                // to="/"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
            <Box onClick={() => handleClick("PreviousAssignment")}>
              <Item
                title="Submitted"
                // to="/email"
                icon={<AttachEmailIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default StudentSidebarNew;
