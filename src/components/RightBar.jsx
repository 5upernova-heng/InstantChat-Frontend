// 上方用于显示好友请求
// 下方用于显示成员信息

import UserCard from "./UserCard.jsx";

function RightBar() {
    const requests = [{
        id: 1,
        username: "user1",
        name: "test1000",
    }, {
        id: 2,
        username: "user2",
        name: "test2000",
    },
    ]
    const renderFriendRequest = () => {
        return (
            <>
                <h4 className="fw-bold text-center pt-2">您有新的好友请求</h4>
                <div className="d-flex flex-column gap-3">
                    {requests.map((user, index) => <div
                        key={index} className="px-2 d-flex align-items-center">
                        <UserCard name={user.name}/>
                        <div className="d-flex justify-content-evenly gap-2">
                            <button className="btn btn-sm btn-success shadow">
                                <i className="fa fa-check" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-sm btn-danger shadow">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>)}
                </div>
                <hr className="mb-0"/>
            </>
        )
    }
    const renderMemberList = () => {
        return (<>
            <h4 className="fw-bold text-center pt-2">成员列表</h4>
            <div className="d-flex flex-column gap-3">
                {requests.map((user, index) => <div
                    key={index} className="px-2 d-flex align-items-center">
                    <UserCard name={user.name}/>
                </div>)}
            </div>
        </>)
    }
    return (
        <div>
            {renderFriendRequest()}
            {renderMemberList()}
        </div>
    )
}

export default RightBar;
