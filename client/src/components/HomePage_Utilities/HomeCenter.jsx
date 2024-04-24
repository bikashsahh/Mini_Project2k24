import Banner from "./Banner";
import Important_Message from "../Admin/Messages/Important_Message";
import TaskList from "./TaskList";
// import Footer from "./Footer";
// import StudentProfileForm from "./StudentProfile";
import StudentProfileForm from "../Students/StudentProfile";

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
