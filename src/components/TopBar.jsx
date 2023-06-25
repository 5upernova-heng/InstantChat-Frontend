import Avatar from "./Avatar.jsx";

function TopBar() {
    const name = "横宇";
    return (
        <div className="d-flex border-bottom justify-content-between align-items-center px-3"
             style={{height: "6.5rem"}}
        >
            <div className="d-flex justify-content-evenly align-items-center gap-3">
                <img
                    style={{
                        width: "5.5rem",
                        height: "5.5rem",
                    }}
                    src="/src/assets/logo.svg"
                    alt="Logo"
                    className="d-inline-block"
                />
                <p className="fw-bold fs-1 mb-0">即时聊天系统</p>
            </div>
            <div className="d-flex justify-content-evenly align-items-center gap-3">
                <Avatar name={name} size={"lg"}/>
                <p className="fw-bold fs-2 mb-0">{name}</p>
            </div>
        </div>
    )
}

export default TopBar;
