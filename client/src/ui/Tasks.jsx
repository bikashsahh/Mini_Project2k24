import React from "react";
import { Box, Avatar, Badge, styled, Button, Typography } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Tasks = ({ course, text, link }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 300,
        mt: 3,
        p: 2,
      }}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          alt={course}
          sx={{ width: 140, height: 140, bgcolor: "#FFAB91" }}
        >
          <Box
            sx={{
              color: "black",
              fontFamily: "cursive",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {course}
          </Box>
        </Avatar>
      </StyledBadge>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {text}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button
          variant="outlined"
          color="secondary"
          href={link}
          sx={{ whiteSpace: "nowrap" }}
        >
          View details »
        </Button>
      </Box>
    </Box>
  );
};

export default Tasks;
