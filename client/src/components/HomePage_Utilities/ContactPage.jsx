import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { tokens } from "../../../theme";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const StyledRoot = styled("div")(({ theme }) => ({
  padding: theme.spacing(6),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledContact = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const StyledIcon = styled(({ className, ...props }) => (
  <div className={className}>
    <props.icon />
  </div>
))(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
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
              <Typography variant="h5" gutterBottom>
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
                <StyledButton
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Send Message"}
                </StyledButton>
              </form>
            </StyledContact>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledContact>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <div>
                <StyledIcon icon={PhoneIcon} />
                <Typography variant="body1">+1 (123) 456-7890</Typography>
              </div>
              <div>
                <StyledIcon icon={EmailIcon} />
                <Typography variant="body1">info@example.com</Typography>
              </div>
              <div>
                <StyledIcon icon={LocationOnIcon} />
                <Typography variant="body1">
                  123 Main Street, Anytown USA
                </Typography>
              </div>
              <div>
                <Typography variant="h5" gutterBottom>
                  Motilal Nehru National Institute of Technology Allahabad
                </Typography>
                <Typography variant="body1">
                  Prayagraj - 211004, INDIA
                </Typography>
                <div>
                  <StyledIcon icon={PhoneIcon} />
                  <Typography variant="body1">
                    91-0532-2545404, 2545407
                  </Typography>
                </div>
                <div>
                  <StyledIcon icon={PhoneIcon} />
                  <Typography variant="body1">
                    Fax No.: 91-0532-2545341
                  </Typography>
                </div>
                <div>
                  <StyledIcon icon={EmailIcon} />
                  <Typography variant="body1">secretary@mnnit.ac.in</Typography>
                </div>
                <div>
                  <Typography variant="body1">
                    <a href="http://www.mnnit.ac.in/index.php/tel">
                      Telephone Directory (Click Here)
                    </a>
                  </Typography>
                </div>
              </div>
            </StyledContact>
          </Grid>
        </Grid>
      </StyledRoot>
      <ToastContainer />
    </div>
  );
};

export default ContactPage;
