import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";

const StyledRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(4),
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledLogo = styled("img")(({ theme }) => ({
  width: "100px",
  height: "auto",
  marginBottom: theme.spacing(2),
}));

const AboutPage = () => {
  return (
    <StyledRoot>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledSection>
            <StyledLogo src="/img1.webp" alt="MNNIT Logo" />
            <Typography variant="h5" gutterBottom>
              About MNNIT Allahabad IGNOU Study Centre
            </Typography>
            <Typography variant="body1">
              MNNIT Allahabad IGNOU Study Centre is a collaborative effort
              between Motilal Nehru National Institute of Technology Allahabad
              and Indira Gandhi National Open University (IGNOU). The study
              centre is dedicated to providing quality education and
              opportunities to students in the region.
            </Typography>
          </StyledSection>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledSection>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              Our mission is to empower students with accessible and flexible
              learning options, fostering their academic and personal growth.
              Through our collaborative efforts, we aim to expand educational
              horizons and contribute to the holistic development of the
              community.
            </Typography>
          </StyledSection>
        </Grid>
        <Grid item xs={12}>
          <StyledSection>
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="body1">
                - Commitment to Excellence
              </Typography>
              <Typography variant="body1">
                - Inclusivity and Diversity
              </Typography>
              <Typography variant="body1">
                - Fostering Innovation and Collaboration
              </Typography>
              <Typography variant="body1">
                - Empowering Lifelong Learning
              </Typography>
            </Box>
          </StyledSection>
        </Grid>
      </Grid>
    </StyledRoot>
  );
};

export default AboutPage;
