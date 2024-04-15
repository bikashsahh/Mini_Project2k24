import "../base.css";
import Banner from "./HomePage_Utilities/Banner";
import Important_Message from "./Important_Message";
import TaskList from "./HomePage_Utilities/TaskList";
import Footer from "./HomePage_Utilities/Footer";
import StudentProfileForm from "./StudentProfile";

const NotificationCenter = () => {
  return (
    <div className="scroll">
      <Banner></Banner>
      <Important_Message />

      <div className="container marketing">
        <TaskList></TaskList>
        <StudentProfileForm></StudentProfileForm>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
};
export default NotificationCenter;
