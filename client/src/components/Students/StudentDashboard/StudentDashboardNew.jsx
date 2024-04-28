import {
    Box,
    Button,
    IconButton,
    Stack,
    Typography,
    useTheme,
  } from "@mui/material";
  import { tokens } from "../../../theme";
  import StudentHeaderNew from "./StudentHeaderNew";
  import AssignmentForm from "../Assignment/AssignmentForm";
  // import { useNavigate } from "react-router-dom";
  // import { useDispatch, useSelector } from "react-redux";
  // import { setTab } from "../../../redux/Slice/selectedtab";
  
  const StudentDashboardNew = ({ handlePage }) => {
    // const dispatch = useDispatch();
    // const tab = useSelector((state) => state.selectedTab.tab);
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const navigate = useNavigate();
    // function
  
    
  
    return (
      <Box m="35px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <StudentHeaderNew
            title="Welcome To Your Dashboard"
            subtitle="MNNIT Allahabad Ignou Study Center"
          />
          </Box>
          
        
        <AssignmentForm></AssignmentForm>
      </Box>
    );
  };
  
  export default StudentDashboardNew;
  