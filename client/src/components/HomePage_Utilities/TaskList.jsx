import React from "react";
import Tasks from "./Tasks";
// import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useUserContext } from "../../context/context";
const TaskList = () => {
  const { tasksData } = useUserContext();
  // const tasksData = useSelector((state) => state.task.tasksData);

  return (
    <Box
      sx={{
        display: "flex",
        // overflowX: "auto",
        // overflowY: "hidden",
        // whiteSpace: "nowrap",
      }}
    >
      {tasksData.map((data) => (
        <Box key={data.id} sx={{ flexShrink: 0, mx: 2 }}>
          <Tasks course={data.course} text={data.text} link={data.link} />
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
