import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "", pt: 6, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Section
            </Typography>
            <Box component="nav">
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Home
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Features
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Pricing
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    FAQs
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    About
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Section
            </Typography>
            <Box component="nav">
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Home
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Features
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Pricing
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    FAQs
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    About
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Section
            </Typography>
            <Box component="nav">
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Home
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Features
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    Pricing
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    FAQs
                  </Link>
                </Box>
                <Box component="li" sx={{ mb: 1 }}>
                  <Link href="#" color="text.secondary" variant="body2">
                    About
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Subscribe to our newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Monthly digest of what's new and exciting from us.
            </Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="newsletter1"
                    label="Email address"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth>
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            borderTop: "1px solid #ccc",
            pt: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Company, Inc. All rights reserved.
          </Typography>
          <Box>
            <Link href="#" color="text.secondary" sx={{ mx: 1 }}>
              <Facebook />
            </Link>
            <Link href="#" color="text.secondary" sx={{ mx: 1 }}>
              <Instagram />
            </Link>
            <Link href="#" color="text.secondary" sx={{ mx: 1 }}>
              <Twitter />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
