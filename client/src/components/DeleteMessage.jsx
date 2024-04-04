// import React from "react";
// import { useDispatch } from "react-redux";
// import { deleteMessage } from "../redux/Slice/message";

// const DeleteMessage = ({ id, message }) => {
//   const dispatch = useDispatch();

//   const handleDelete = () => {
//     dispatch(deleteMessage({ id }));
//   };

//   return (
//     <div>
//       <span>{message}</span>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default DeleteMessage;
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteMessage } from "../redux/Slice/message";

const DeleteMessage = ({ id }) => {
  const dispatch = useDispatch();

  // const [idOfMessage, setIdOfMessage] = useEffect(null);
  const handleDelete = async () => {
    try {
      console.log("sssssKJ", id);
      // Send DELETE request to the server
      await axios.delete(`http://localhost:3000/messages/${id}`);
      // Dispatch deleteMessage action to update Redux store
      dispatch(deleteMessage({ id }));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteMessage;
