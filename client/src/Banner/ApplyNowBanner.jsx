import React from "react";
import { Box, Modal, Typography, Button, Divider, Stack } from "@mui/material";
import { ColorModeContext, useMode } from "../ui/theme";
import { ThemeProvider } from "@mui/material/styles";

const ApplyNowBanner = () => {
  const [theme, colorMode] = useMode();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Stack
          justifyContent={"space-evenly"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#d0d1d5",
            color: "black",
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
                borderRadius: "5px",
                p: "20px",
              }}
            >
              Apply Now
            </Typography>
            <Typography variant="subtitle1">
              online registration and admission module programmes.
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
                bgcolor: "#e1e2fe",
                color: "black",
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
                    color="primary"
                    target="_blank"
                    href="https://ignouiop.samarth.edu.in/index.php/registration/user/register"
                    sx={{ mr: 2 }}
                  >
                    National Students
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ApplyNowBanner;
