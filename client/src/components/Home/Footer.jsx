import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Email, 
  LocationOn, 
  Phone 
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      component="footer" 
      sx={{ 
        background: "linear-gradient(135deg, #f5f7fa, #e4ebf1)", // Light gradient background
        color: theme.palette.text.primary, // Use primary text color for better contrast
        py: 6, 
        textAlign: isMobile ? 'center' : 'left',
        borderTop: "1px solid #d1d9e6" // Light border for separation
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
              Quick Links
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'column',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              {['Admissions', 'Academics', 'Research', 'Campus Life', 'Alumni'].map((link) => (
                <Link 
                  key={link} 
                  href="#" 
                  color="inherit" 
                  sx={{ 
                    mb: 1, 
                    textDecoration: 'none', 
                    '&:hover': { textDecoration: 'underline', color: theme.palette.primary.main } 
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
              Contact Us
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'flex-start'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">123 College Street, City, State</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">(555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="body2">info@collegename.edu</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
              Connect With Us
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: isMobile ? 'center' : 'flex-start', 
              gap: 2 
            }}>
              {[
                { icon: <Facebook />, link: '#facebook' },
                { icon: <Instagram />, link: '#instagram' },
                { icon: <Twitter />, link: '#twitter' }
              ].map(({ icon, link }) => (
                <Link 
                  key={link} 
                  href={link} 
                  color="inherit" 
                  sx={{ 
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.2)', color: theme.palette.primary.main } 
                  }}
                >
                  {icon}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for campus updates
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                variant="outlined"
                label="Your Email"
                sx={{ 
                  mb: 2, 
                  '& .MuiOutlinedInput-root': { 
                    bgcolor: 'white', 
                    borderRadius: 2 
                  } 
                }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ borderRadius: 2 }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box 
          sx={{ 
            mt: 6, 
            pt: 2, 
            borderTop: '1px solid rgba(0,0,0,0.1)', 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            © 2024 College Name. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
