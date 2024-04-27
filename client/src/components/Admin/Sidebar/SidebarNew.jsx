import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import MessageIcon from "@mui/icons-material/Message";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubjectIcon from "@mui/icons-material/Subject";
import NotesIcon from "@mui/icons-material/Notes";
import DvrIcon from "@mui/icons-material/Dvr";

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

const SidebarNew = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

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
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h2" color={colors.grey[100]}>
                  Admin
                </Typography>
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`logo.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
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
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Student
            </Typography>
            <Item
              title="Student List"
              to="/"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Assignment"
              to="/"
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Import Excel"
              to="/ImportStudentData"
              icon={<ImportExportIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Services
            </Typography>
            <Item
              title="Email"
              to="/email"
              icon={<AttachEmailIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Message"
              to="/message"
              icon={<MessageIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Announcement"
              to="/announcement"
              icon={<AnnouncementIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Programs
            </Typography>
            <Item
              title="MCA"
              to="/mca"
              icon={<SubjectIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="BCA"
              to="/bca"
              icon={<LibraryBooksIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="CIT"
              to="/cit"
              icon={<NotesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="PGDCA"
              to="/pgdca"
              icon={<DvrIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarNew;
