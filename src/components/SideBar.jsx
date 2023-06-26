import Avatar from "./Avatar.jsx";
import {Modal} from "bootstrap";

function SideBar() {
    Modal;
    return (<div className="d-flex flex-column align-items-center border-end gap-3 pt-2 p-2"
                 style={{
                     height: "calc(100vh - 6.5rem)",
                 }}
    >
        <Avatar name="AAA"/>
        <Avatar name="BBB"/>
        <Avatar name="CCC"/>
        <Avatar name="DDD"/>
        <div
            data-bs-toggle="modal"
            data-bs-target={"#addConversation"}
        >
            <Avatar name="+" color="#ffffff" textColor="#000000"/>
        </div>
    </div>)
}

export default SideBar;
