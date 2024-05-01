import React from "react";
// import { useSelector } from "react-redux";
// import AdminMessageForm from "./Admin/AddMessage";
// import MessagesList from "./MessagesList";
// import DeleteMessage from "./DeleteMessage";
import { useUserContext } from "../../../context/context";
const Important_Message = () => {
  const { messages } = useUserContext();
  console.log("Imp msg", messages);
  // const messages = useSelector((state) => state.message.messages);
  return (
    <div className="important-messages">
      <div className="marquee">
        <marquee>
          {messages
            .slice()
            .reverse()
            .map((message, index) => (
              <div key={message.id} className="message-card">
                {message.message_text}
              </div>
            ))}
        </marquee>
      </div>
      {/* <AdminMessageForm></AdminMessageForm> */}
      {/* <MessagesList></MessagesList> */}
    </div>
  );
};
export default Important_Message;

// import React from "react";
// import { useSelector } from "react-redux";
// import AdminMessageForm from "./AddMessage";
// // import MessagesList from "./MessagesList";
// // import DeleteMessage from "./DeleteMessage";

// const Important_Message = () => {
//   const messages = useSelector((state) => state.message.messages);

//   return (
//     <div className="important-messages">
//       <div className="marquee">
//         <marquee>
//           {messages.map((message) => (
//             <div key={message.id} className="message-card">
//               {message.message_text}
//             </div>
//           ))}
//         </marquee>
//       </div>
//       <AdminMessageForm></AdminMessageForm>
//       {/* <MessagesList></MessagesList> */}
//     </div>
//   );
// };

// export default Important_Message;
