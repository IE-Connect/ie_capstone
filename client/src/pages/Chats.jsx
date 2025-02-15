import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";

const Chats = () => {
  return (
    <div className="">
      <div className="flex h-screen bg-green-100">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Chats;
