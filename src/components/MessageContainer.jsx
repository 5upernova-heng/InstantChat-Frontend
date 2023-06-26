import Message from "./Message.jsx";

function MessageContainer() {
    return (
        <div className="d-flex flex-column gap-3 pt-3">
            <Message message={"其他人的消息"} role={"others"}/>
            <Message
                message={"很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息"}
                role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"\n含有空行的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
            <Message message={"其他人的消息"} role={"others"}/>
            <Message message={"我的消息"} role={"user"}/>
        </div>
    );
}

export default MessageContainer;
