import React from "react";
import { useUserContext } from "../../context/context";
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
    </div>
  );
};
export default Important_Message;
