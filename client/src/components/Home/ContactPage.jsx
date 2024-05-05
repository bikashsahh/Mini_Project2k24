import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokens } from "../../ui/theme";
import { useTheme } from "@mui/material";

const StyledRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledContact = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  // backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const StyledIcon = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ContactPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      await axios.post("http://localhost:3000/contact", formData);
      setFormData({ name: "", email: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error sending message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <StyledRoot>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledContact>
              <Typography variant="h2" gutterBottom>
                Contact Information
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <PhoneIcon />
                  </StyledIcon>
                  <Typography variant="body1">+1 (123) 456-7890</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <EmailIcon />
                  </StyledIcon>
                  <Typography variant="body1">info@example.com</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <LocationOnIcon />
                  </StyledIcon>
                  <Typography variant="body1">
                    123 Main Street, Anytown USA
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
                Motilal Nehru National Institute of Technology Allahabad
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Typography variant="body1">
                  Prayagraj - 211004, INDIA
                </Typography>
                <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <PhoneIcon />
                  </StyledIcon>
                  <Typography variant="body1">
                    91-0532-2545404, 2545407
                  </Typography>
                </Box>
                {/* <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <PhoneIcon />
                  </StyledIcon>
                  <Typography variant="body1">
                    Fax No.: 91-0532-2545341
                  </Typography>
                </Box> */}
                <Box display="flex" alignItems="center">
                  <StyledIcon>
                    <EmailIcon />
                  </StyledIcon>
                  <Typography variant="body1">secretary@mnnit.ac.in</Typography>
                </Box>
                <Typography variant="body1">
                  <a href="http://www.mnnit.ac.in/index.php/tel">
                    Telephone Directory (Click Here)
                  </a>
                </Typography>
              </Box>
            </StyledContact>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledContact>
              <Typography variant="h3" gutterBottom>
                Get in Touch
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  color="secondary"
                  value={formData.name}
                  onChange={handleInputChange}
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
                />
                <TextField
                  color="secondary"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  color="secondary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Send Message"}
                </Button>
              </form>
            </StyledContact>
          </Grid>
        </Grid>
      </StyledRoot>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
