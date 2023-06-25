import TopBar from "../components/TopBar.jsx";
import SideBar from "../components/SideBar.jsx";
import MessageInput from "../components/MessageInput.jsx";

function Chat() {
    return (
        <>
            <TopBar/>
            <div className="d-flex">
                <SideBar/>
                <div className="d-flex w-100">
                    <div className="col">
                        <div className="border-bottom d-flex align-items-center" style={{height: "3.5rem"}}>
                            <h2 className="mb-0">「聊天标题」</h2>
                        </div>
                        <div className="overflow-auto" style={{
                            height: "calc(100vh - 20rem)",
                        }}>
                            <h2>聊天界面</h2>
                        </div>
                        <MessageInput/>
                    </div>
                    <div className="col-2 border-start">
                        <h2>好友信息 / 群聊成员</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;
