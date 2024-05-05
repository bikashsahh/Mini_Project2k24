import React, { useContext, useEffect, useState, createContext } from "react";
import axios from "axios";
const UserContext = createContext();

const Provider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [registrationno, setRegistrationNo] = useState();
  const [messages, addMessages] = useState([]);
  const [tasksData, setTaskData] = useState([
    {
      id: 1,
      course: "BCA",
      text: "Unlock your potential in the digital age with our dynamic BCA program.",
      link: "https://ignouadmission.samarth.edu.in/index.php/site/programme-detail?id=6f204386c359d7aeb65f9700e81f8958cacceaa803f708ac54a230a588c659ef1167",
    },
    {
      id: 2,
      course: "MCA",
      text: "Empower your career in technology with our prestigious MCA (Master of Computer Applications) program.",
      link: "https://www.ignouadmissions.com/distance-mca/",
    },
    {
      id: 3,
      course: "PGDCA",
      text: "Elevate your career in the digital realm with our comprehensive PGDCA (Post Graduate Diploma in Computer Applications) program.",
      link: "https://ignouadmission.samarth.edu.in/index.php/site/programme-detail?id=db6cf2758e95b3d7e1aa1eb3ab19fd8b6f46686f5c7c0e755af29b51767391961638",
    },
    {
      id: 4,
      course: "CIT",
      text: "Embark on a transformative journey in technology with our CIT (Certificate in Information Technology) program.",
      link: "https://www.ignouhelp.in/ignou-cit-prospectus/",
    },
  ]);
  useEffect(() => {
    fetchStudentProfile();
    fetchMessages();
  }, []);

  async function fetchStudentProfile() {
    const url = `http://localhost:3000/studentsprofile?registrationno=${registrationno}`;

    try {
      const response = await axios.get(url);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching student profile:", error);
      return null;
    }
  }
  async function fetchMessages() {
    try {
      const response = await axios.get("http://localhost:3000/messages");
      if (response.status === 200) {
        addMessages(response.data);
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        registrationno,
        setRegistrationNo,
        tasksData,
        messages,
        addMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { Provider, useUserContext };
