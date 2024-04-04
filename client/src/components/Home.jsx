import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./Header";
import NotificationCenter from "./NotificationCenter";
import axios from "axios";
import { addMessage } from "../redux/Slice/message"; // Import the addMessage action

function Home() {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    return async () => {
      try {
        const response = await axios.get("http://localhost:3000/messages");
        if (response.status === 200) {
          setMessages(response.data);
          // console.log("QQQ", response.data);
          // Dispatch addMessage action to update Redux store with fetched messages
          response.data.forEach((message) => {
            dispatch(addMessage(message));
          });
        } else {
          throw new Error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    // fetchMessages();
  }, [dispatch]); // Include dispatch function in dependency array to prevent unnecessary re-fetching

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <NotificationCenter />
        {/* <ScrollableCards></ScrollableCards> */}
      </div>
    </div>
  );
}

export default Home;

// import Header from "./Header";
// import NotificationCenter from "./NotificationCenter";
// import ScrollableCards from "./ScrollableCards";

// function Home() {
//   return (
//     <div className="app-container">
//       <Header></Header>
//       <div className="content">
//         <NotificationCenter></NotificationCenter>
//         {/* <ScrollableCards></ScrollableCards> */}
//       </div>
//     </div>
//   );
// }

// export default Home;
