import React from "react";
import { Box, Modal, Typography, Button, Divider, Stack } from "@mui/material";

const IgnouRegistrationBanner = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack
      justifyContent={"space-evenly"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "#B9F6CA",
        color: "",
        p: 0,
        borderRadius: "8px",
      }}
    >
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        onClick={handleOpen}
        sx={{ alignContent: "center", p: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {/* <i className="fa fa-graduation-cap fa-3x" /> */}
          <Typography
            variant="contained"
            component="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              mt: -2,
            }}
          >
            IGNOU Registration
          </Typography>
          <Typography variant="subtitle1">
            Register for new admission or re-registration at IGNOU.
          </Typography>
        </Box>
      </Stack>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "21%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 200,
            bgcolor: "#EDE7F6",
            color: "",
            borderRadius: "8px",
            p: 5,
            alignContent: "center",
          }}
        >
          <Divider>
            <Typography
              variant="h4"
              component="h2"
              alignContent={"center"}
              sx={{ mb: 3 }}
            >
              IGNOU REGISTRATION
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                href="https://ignouiop.samarth.edu.in/index.php/registration/user/register"
                sx={{ mr: 2 }}
              >
                New Admission
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                href="https://onlinerr.ignou.ac.in/"
              >
                Re-Registration
              </Button>
            </Box>
          </Divider>
        </Box>
      </Modal>
    </Stack>
  );
};

export default IgnouRegistrationBanner;
