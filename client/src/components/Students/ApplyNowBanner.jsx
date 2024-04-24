import React from "react";
import { Box, Modal, Typography, Button, Divider, Stack } from "@mui/material";

const ApplyNowBanner = () => {
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
        bgcolor: "#B39DDB",
        color: "",
        p: 0,
        borderRadius: "8px",
      }}
    >
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        onClick={handleOpen}
        sx={{
          alignContent: "center",
          p: 2,
        }}
      >
        <Typography
          variant="contained"
          className="design"
          component="h2"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
          }}
        >
          Apply Now
        </Typography>
        <Typography variant="subtitle1">
          Click here for online registration and admission module of online
          programmes on offer.
        </Typography>
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
            top: "20%",
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
              // id="modal-modal-title"
              variant="contained"
              component="h2"
              alignContent={"center"}
              sx={{ mb: 3 }}
            >
              ONLINE PROGRAMME
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                href="https://ignouiop.samarth.edu.in/index.php/registration/user/register"
                sx={{ mr: 2 }}
              >
                National Students
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                target="_blank"
                href="https://ignouforeigniop.samarth.edu.in/index.php/registration/user/register"
              >
                International Students
              </Button>
            </Box>
          </Divider>
        </Box>
      </Modal>
    </Stack>
  );
};

export default ApplyNowBanner;
