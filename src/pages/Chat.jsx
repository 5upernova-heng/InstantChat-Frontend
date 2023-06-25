import TopBar from "../components/TopBar.jsx";
import SideBar from "../components/SideBar.jsx";

function Chat() {
    return (
        <>
            <TopBar/>
            <div className="d-flex">
                <SideBar/>
                <div className="d-flex w-100">
                    <div className="col">
                        <div className="border-bottom" style={{height: "3.5rem"}}>
                            <h2>聊天标题</h2>
                        </div>
                        <div className="overflow-auto" style={{
                            height: "calc(100vh - 20rem)",
                            border: "1px solid black"
                        }}>
                            <h2>聊天界面</h2>
                        </div>
                        <div>
                            <h2 className="text-center">消息输入框 + 发送按钮</h2>
                        </div>
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
