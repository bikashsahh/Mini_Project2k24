import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Divider,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { tokens, ColorModeContext, useMode } from "../../theme";
import HeaderNew from "../Admin/DashboardNew/HeaderNew";

const UserDetails = () => {
  const { state } = useLocation();
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  if (!state || Object.keys(state).length === 0) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box>
            <HeaderNew
              title="Welcome To Your Profile"
              subtitle="Have a Good Day"
            />
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: colors.primary[400],
            padding: "2rem",
            borderRadius: "100px",
            height: "80vh", // Set a fixed height
            overflow: "hidden", // Hide overflow content
          }}
        >
          <HeaderNew
            title={`Welcome To Your Profile ${state.name}`}
            subtitle="Have a Good Day"
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Registration No.:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.registrationno}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Programme:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.programme}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Courses:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.courses}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Email:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Mobile:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{state.mobile}</Typography>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default UserDetails;
