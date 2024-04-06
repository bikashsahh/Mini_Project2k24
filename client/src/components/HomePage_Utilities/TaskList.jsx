import React from "react";
import Tasks from "./Tasks";
import { useSelector } from "react-redux";

const TaskList = () => {
  const tasksData = useSelector((state) => state.task.tasksData);
  return (
    <div className="row">
      {tasksData.map((data) => (
        <Tasks
          key={data.id}
          image={data.image}
          heading={data.heading}
          text={data.text}
        />
      ))}
    </div>
  );
};
export default TaskList;
