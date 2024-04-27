import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import HeaderNew from "./HeaderNew";
import StatBox from "./StatBox";
import EmailIcon from "@mui/icons-material/Email";
import GroupsIcon from "@mui/icons-material/Groups";
import ViewListIcon from "@mui/icons-material/ViewList";
import AdminAnnouncementPage from "../Messages/AdminAnnouncementPage";

const DashboardNew = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="35px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <HeaderNew
          title="Welcome To Your Dashboard"
          subtitle="MNNIT Allahabad Ignou Study Center"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
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
                  // alignItems: "center",
                  // justifyContent: "center",
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
        >
          <StatBox
            title="Programme"
            subtitle=""
            progress=""
            increase=""
            icon={
              <ViewListIcon
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

export default DashboardNew;
