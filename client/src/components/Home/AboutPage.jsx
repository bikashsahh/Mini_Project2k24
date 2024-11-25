import React from "react";
import { Box, Typography, Grid, Card, CardContent, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[6],
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
  background: "linear-gradient(145deg, #f0f4f8, #e6eaf3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%", // Ensures cards fill their container height
}));

const AboutPage = () => {
  const theme = useTheme();

  const aboutSections = [
    {
      title: "About Us",
      content:
        "MNNIT Allahabad IGNOU Study Centre is a collaborative effort between Motilal Nehru National Institute of Technology Allahabad and Indira Gandhi National Open University (IGNOU). Our centre is dedicated to providing quality, accessible education to students in the region.",
      icon: "🎓",
    },
    {
      title: "Our Mission",
      content:
        "We aim to empower students through flexible learning opportunities, fostering academic excellence and personal growth. Our collaborative approach breaks down educational barriers, creating pathways for learners to achieve their full potential.",
      icon: "🚀",
    },
    {
      title: "Our Values",
      content:
        "We are committed to inclusivity, innovation, and individual development. By combining the strengths of MNNIT and IGNOU, we create a dynamic learning environment that supports diverse educational needs.",
      icon: "🌟",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 4 },
        maxWidth: 1200,
        margin: "auto",
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{
          textAlign: "center",
          mb: { xs: 2, md: 4 },
          typography: { xs: "h3", md: "h2" },
        }}
      >
        MNNIT IGNOU Study Centre
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center">
        {aboutSections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: "flex" }}>
            <StyledCard>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <span role="img" aria-label={section.title}>
                    {section.icon}
                  </span>
                  {section.title}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: "justify" }}>
                  {section.content}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: { xs: 3, md: 5 },
          textAlign: "center",
          p: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Join Us in Transforming Education
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, margin: "auto" }}>
          Together, we're creating an innovative learning ecosystem that adapts
          to your needs, breaks traditional educational boundaries, and prepares
          you for a dynamic future.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutPage;
