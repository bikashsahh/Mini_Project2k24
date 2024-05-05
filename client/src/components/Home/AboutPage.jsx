import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import { tokens } from "../../ui/theme";
import styled from "@emotion/styled";

const StyledSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  borderBlockColor: "black",
  // border: "0.0001px outset white",
  textAlign: "justify",
}));

const AboutPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", p: 0 }}
      >
        About Us
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledSection>
            <Typography variant="h4">
              MNNIT Allahabad IGNOU Study Centre is a collaborative effort
              between Motilal Nehru National Institute of Technology Allahabad
              and Indira Gandhi National Open University (IGNOU). The study
              centre is dedicated to providing quality education and
              opportunities to students in the region.
            </Typography>
          </StyledSection>
        </Grid>
        {/* <Grid md={0} p={2} mt={1} ml={8} mr={7}>
          <StyledSection>
            <Typography variant="h3" gutterBottom sx={{ textAlign: "center", p: 0 }}>
              Our Mission
            </Typography>
            <Typography variant="h4">
              Our mission is to empower students with accessible and flexible learning options, fostering their academic and personal growth. Through our collaborative efforts, we aim to expand educational horizons and contribute to the holistic development of the community.
            </Typography>
          </StyledSection>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default AboutPage;
