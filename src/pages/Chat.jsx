import TopBar from "../components/TopBar.jsx";
import SideBar from "../components/SideBar.jsx";
import MessageInput from "../components/MessageInput.jsx";
import {useContext, useEffect} from "react";
import {LoginContext} from "../context/LoginContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import MessageContainer from "../components/MessageContainer.jsx";
import RightBar from "../components/RightBar.jsx";

function Chat() {
    const {isLogin} = useContext(LoginContext);
    const navigate = useNavigate();
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
                            <h2 className="mb-0">「聊天标题」</h2>
                        </div>
                        <div className="overflow-auto" style={{
                            height: "calc(100vh - 20rem)",
                        }}>
                            <MessageContainer/>
                        </div>
                        <MessageInput/>
                    </div>
                    <div className="col-2 border-start">
                        <RightBar/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;
