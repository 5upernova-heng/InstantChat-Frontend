import TopBar from "../components/TopBar.jsx";
import SideBar from "../components/SideBar.jsx";
import MessageInput from "../components/MessageInput.jsx";
import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import MessageContainer from "../components/MessageContainer.jsx";
import RightBar from "../components/RightBar.jsx";
import Modal from "../components/Modal.jsx";
import AddConversation from "../components/AddConversation.jsx";
import {ChatContext} from "../context/ChatContextProvider.jsx";


function Chat() {
    // which tab is modal in
    const [tab, setTab] = useState(0);

    const {isLogin} = useContext(LoginContext);
    const {submitNewGroup, conversation, mode, findUserById, findGroupById} = useContext(ChatContext);

    const navigate = useNavigate();
    const title = conversation === -1
        ? "选择一个对话以开始聊天"
        : (mode ? findGroupById(conversation).name
                : findUserById(conversation).name
        );
    useEffect(() => {
        if (!isLogin) {
            navigate("/login");
        }
    }, [isLogin, navigate])

    return (
        <>
            <TopBar/>
            <div className="d-flex">
                <SideBar/>
                <div className="d-flex w-100">
                    <div className="col">
                        <div className="border-bottom d-flex align-items-center" style={{height: "3.5rem"}}>
                            <h2 className="mb-0">{`「${title}」`}</h2>
                        </div>
                        <div className="overflow-auto" style={{
                            height: "calc(100vh - 20rem)",
                        }}>
                            <MessageContainer/>
                        </div>
                        <MessageInput disabled={conversation === -1}/>
                    </div>
                    <div className="col-2 border-start">
                        <RightBar/>
                    </div>
                </div>
            </div>
            <Modal id={"addConversation"}
                   headerLabel={"添加好友 / 群聊"}
                   bodyComponent={
                       <AddConversation tab={tab} setTab={setTab}/>
                   }
                   footerComponent={
                       <>
                           {tab < 2 ||
                               <button className="btn btn-success"
                                       data-bs-dismiss="modal"
                                       onClick={submitNewGroup}
                               >添加</button>
                           }
                           <button className="btn btn-secondary" data-bs-dismiss="modal">取消
                           </button>
                       </>
                   }
            />
            <Modal id={"inviteMember"}
                   headerLabel={"邀请好友加入群聊"}
                   bodyComponent={
                       <></>
                   }
                   footerComponent={
                       <>
                           <button className="btn btn-secondary" data-bs-dismiss="modal">取消
                           </button>
                       </>
                   }
            />
        </>
    )
}

export default Chat;
