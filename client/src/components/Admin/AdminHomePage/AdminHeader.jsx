import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  InputBase,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

function AdminHeader({ OpenSidebar }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={OpenSidebar}
        >
          <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "auto" }}>
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              style={{ color: "white" }}
              startAdornment={<SearchIcon style={{ color: "white" }} />}
            />
          </div>
          <div>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Link to="/redirect">
              <IconButton color="inherit">
                <EmailIcon />
              </IconButton>
            </Link>
            <IconButton color="inherit">
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
