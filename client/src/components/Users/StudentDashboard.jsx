import { Box, useTheme } from "@mui/material";
import { tokens } from "../../ui/theme";
import AssignmentForm from "./AssignmentForm";
import Heading from "../../ui/Heading";

const StudentDashboard = ({ handlePage, registrationno }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="35px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading
          title="Welcome To Your Dashboard"
          subtitle="MNNIT Allahabad Ignou Study Center"
        />
      </Box>
      <AssignmentForm registrationno={registrationno}></AssignmentForm>
    </Box>
  );
};

export default StudentDashboard;
