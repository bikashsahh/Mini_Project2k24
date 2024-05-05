import { Box, Button, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import ViewListIcon from "@mui/icons-material/ViewList";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AdminAnnouncementPage from "./AdminAnnouncementPage";
import { tokens } from "../../ui/theme";
import HeaderNew from "../../ui/Heading";
import StatBox from "../../ui/StatBox";

const AdminDashboard = ({ handlePage }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleEmailClick = () => {
    handlePage("Email");
  };

  const handleStudentListClick = () => {
    handlePage("StudentList");
  };

  const handleProgrammeClick = () => {
    handlePage("Attendance");
  };

  return (
    <Box m="35px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderNew
          title="Welcome To Your Dashboard"
          subtitle="MNNIT Allahabad Ignou Study Center"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="flex"
        flexDirection="row"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        alignItems="center"
        justifyContent="center"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 4 }}
          borderRadius={"10px"}
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        >
          <StatBox
            title="Sent Email's"
            subtitle=""
            progress=""
            increase=""
            icon={
              <EmailIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "35px",
                  marginLeft: "30%",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 4 }}
          borderRadius={"10px"}
          onClick={handleStudentListClick}
          style={{ cursor: "pointer" }}
        >
          <StatBox
            title="Student's List"
            subtitle=""
            progress=""
            increase=""
            icon={
              <GroupsIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "35px",
                  marginLeft: "30%",
                }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 4 }}
          borderRadius={"10px"}
          onClick={handleProgrammeClick}
          style={{ cursor: "pointer" }}
        >
          <StatBox
            title="Attendance Sheet"
            subtitle=""
            progress=""
            increase=""
            icon={
              <CoPresentIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "35px",
                  marginLeft: "30%",
                }}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <br />
      </Box>
      <AdminAnnouncementPage></AdminAnnouncementPage>
    </Box>
  );
};

export default AdminDashboard;
