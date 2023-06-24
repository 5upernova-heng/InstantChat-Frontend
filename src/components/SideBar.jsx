import Avatar from "./Avatar.jsx";

function SideBar() {
    return (<div className="d-flex flex-column align-items-center border-end gap-3 pt-2 p-2"
                 style={{
                     height: "calc(100vh - 6.5rem)",
                 }}
    >
        <Avatar name="AAA"/>
        <Avatar name="BBB"/>
        <Avatar name="CCC"/>
        <Avatar name="DDD"/>
        <Avatar name="+" color="#ffffff" textColor="#000000"/>
    </div>)
}

export default SideBar;
