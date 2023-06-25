import "/src/styles/MessageInput.css"

function MessageInput() {
    return (
        <div className="d-flex justify-content-center align-items-start gap-3"
             style={{
                 height: "10rem"
             }}
        >
            <div style={{width: "50%"}}>
                <textarea className="message-input" autoFocus={true}/>
            </div>
            <button className="btn btn-lg rounded-3 btn-primary shadow">发送</button>
        </div>
    )
}

export default MessageInput;
