import Message from "./Message.jsx";

function MessageContainer() {
    const you = {
        id: 0,
        username: "you",
        name: "you",
    }
    const me = {
        id: 1,
        username: "me",
        name: "me",
    }
    return (
        <div className="d-flex flex-column gap-3 pt-3">
            <Message message={"其他人的消息"} user={you} role={"others"}/>
            <Message message={"我的消息"} user={me} role={"user"}/>
        </div>
    );
}

export default MessageContainer;
