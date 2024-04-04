import "../base.css";
import Banner from "./Banner";
import Important_Message from "./Important_Message";
import TaskList from "./TaskList";
import ListingView from "./ListingView";
import Footer from "./Footer";

const NotificationCenter = () => {
  return (
    <div className="scroll">
      <Banner></Banner>
      <Important_Message />

      <div className="container marketing">
        <TaskList></TaskList>
        <ListingView></ListingView>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default NotificationCenter;
