import React, { useState } from "react";
import { 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  Box, 
  useMediaQuery, 
  useTheme,
  Paper,
  Container
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        "https://mnnit-ignou-study-center-server-git-main-bikash-sahs-projects.vercel.app/contact",
        formData
      );
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2 
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4, 
            overflow: 'hidden',
            boxShadow: theme.shadows[2],
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Grid container>
            {/* Contact Information Section */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                backgroundColor: theme.palette.grey[100], 
                color: theme.palette.text.primary,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                fontWeight="bold" 
                sx={{ 
                  mb: 3 
                }}
              >
                Contact Information
              </Typography>
              
              {/* Contact Details */}
              <Box display="flex" flexDirection="column" gap={2}>
                {[ 
                  { icon: <PhoneIcon />, text: "+1 (123) 456-7890" },
                  { icon: <EmailIcon />, text: "info@example.com" },
                  { icon: <LocationOnIcon />, text: "123 Main Street, Anytown USA" }
                ].map((item, index) => (
                  <Box 
                    key={index} 
                    display="flex" 
                    alignItems="center"
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(10px)',
                      }
                    }}
                  >
                    <Box mr={2} color="inherit">{item.icon}</Box>
                    <Typography variant="body1">{item.text}</Typography>
                  </Box>
                ))}
              </Box>

              {/* College Details */}
              <Box mt={4}>
                <Typography 
                  variant="h5" 
                  fontWeight="bold" 
                  gutterBottom
                >
                  MNNIT Allahabad
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Prayagraj - 211004, INDIA
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <PhoneIcon sx={{ mr: 2 }} />
                  <Typography variant="body1">
                    91-0532-2545404, 2545407
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mt={2}>
                  <EmailIcon sx={{ mr: 2 }} />
                  <Typography variant="body1">
                    secretary@mnnit.ac.in
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Contact Form Section */}
            <Grid 
              item 
              xs={12} 
              md={6} 
              sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                backgroundColor: theme.palette.background.paper
              }}
            >
              <Typography 
                variant="h4" 
                fontWeight="bold" 
                color="text.primary" 
                gutterBottom
                sx={{ 
                  mb: 3,
                }}
              >
                Get in Touch
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.grey[400],
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.grey[600],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.grey[400],
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.grey[600],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }}
                />
                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.grey[400],
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.grey[600],
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      }
                    }
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                  endIcon={!isLoading && <SendIcon />}
                  sx={{ 
                    mt: 2,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Send Message"}
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default ContactPage;
