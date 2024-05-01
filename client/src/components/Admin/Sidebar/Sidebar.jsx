import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Slide,
  Stack,
} from "@mui/material";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsFillGearFill,
  BsLock,
  BsAwardFill,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

// Define the components to be rendered for each menu item
const Courses = () => <div>courses</div>;
const Categories = () => <div>categories</div>;
const Students = () => <div>students</div>;
const Institutions = () => <div>institution</div>;
const SendEmailsButton = () => <div>SendEmailsButton</div>;
const Logout = () => <div>Logout</div>;

const Sidebar = ({
  openSidebarToggle,
  OpenSidebar,
  selectedTab,
  setSelectedTab,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(!isSmallScreen);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    {
      text: "Courses",
      icon: <BsFillArchiveFill />,
      component: Courses,
    },
    {
      text: "Categories",
      icon: <BsFillGrid3X3GapFill />,
      component: Categories,
    },
    {
      text: "Students",
      icon: <BsPeopleFill />,
      component: Students,
    },
    {
      text: "Institutions",
      icon: <BsListCheck />,
      component: Institutions,
    },
    {
      text: "EmailService",
      icon: <BsFillGearFill />,
      component: SendEmailsButton,
    },
    {
      text: "Logout",
      icon: <BsLock />,
      component: Logout,
    },
  ];

  const drawer = (
    <Box
      sx={{
        width: isCollapsed ? 80 : 250,
        transition: "width 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          <BsAwardFill style={{ marginRight: "8px" }} />
          {!isCollapsed && "ADMIN"}
        </Typography>
        {isSmallScreen ? (
          <IconButton onClick={toggleDrawer}>
            <BsGrid1X2Fill />
          </IconButton>
        ) : (
          <IconButton onClick={toggleCollapse}>
            {isCollapsed ? <BsChevronRight /> : <BsChevronLeft />}
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{ pl: isCollapsed ? 2 : 4 }}
            onClick={() => setSelectedTab(item.component)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {!isCollapsed && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{
          width: { sm: isOpen ? "auto" : isCollapsed ? 80 : 250 },
          flexShrink: { sm: 0 },
        }}
      >
        {isSmallScreen ? (
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: isCollapsed ? 80 : 250,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: isCollapsed ? 80 : 250,
              },
            }}
          >
            {drawer}
          </Drawer>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "all 0.3s ease-in-out",
          position: "relative",
        }}
      >
        {/* <Slide direction="right" in={!!selectedTab} mountOnEnter unmountOnExit>
          <Stack sx={{ m: 10 }}>{selectedTab && <selectedTab />}</Stack>
        </Slide> */}
      </Box>
    </Box>
  );
};

export default Sidebar;
