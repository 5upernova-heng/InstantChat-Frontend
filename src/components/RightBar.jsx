// 上方用于显示好友请求
// 下方用于显示成员信息

import { useContext, useEffect, useState } from "react";
import UserCard from "./UserCard.jsx";
import { ChatContext } from "../context/ChatContextProvider.jsx";
import { LoginContext } from "../context/LoginContextProvider.jsx";

function RightBar() {
    const {loginAccount} = useContext(LoginContext);
    const {
        mode, conversation, findMembersById,
        setConversation, chats, setChats, setMode,
        newMessages, friendRequests, handleRequest,
        findUserById, findGroupById, deleteNewMessages,
    } = useContext(ChatContext);

  const [members, setMembers] = useState([]);

  const loadMember = async () => {
    if (mode === 0) {
      setMembers([]);
      return;
    }
    const newMembers = await findMembersById(conversation);
    setMembers(newMembers);
  };
  useEffect(() => {
    loadMember();
  }, [conversation]);

    const jumpToChat = (entity, type) => {
        if (entity.id === loginAccount.id && type === 0)
            return;

        console.log(entity.id);
        console.log(type);
        setMode(type);
        let flag = 0;
        chats.map((chat) => {
            if (chat.id === entity.id) {
                setConversation(chat.id);
                flag = 1;
            }
        });
        if (flag === 0) {
            const newChats = chats;
            newChats.push({id: entity.id, type: type, name: entity.name});
            setChats(newChats);
            setConversation(entity.id);
        }
        deleteNewMessages(entity.id, type);
    };

  const renderFriendRequest = () => {
    if (friendRequests.length === 0) return null;
    return (
      <>
        <h4 className="fw-bold text-center pt-2">您有新的好友请求</h4>
        <div className="d-flex flex-column gap-3">
          {friendRequests.map((user, index) => (
            <div key={index} className="px-2 d-flex align-items-center">
              <UserCard name={user.name} />
              <div className="d-flex justify-content-evenly gap-2">
                <button
                  className="btn btn-sm btn-success shadow"
                  onClick={() => handleRequest(user.id, 1)}
                >
                  <i className="fa fa-check" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger shadow"
                  onClick={() => handleRequest(user.id, 2)}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr className="mb-0" />
      </>
    );
  };

    const renderNewMessages = () => {
        if (newMessages.length === 0) return (
            <>
                <h4 className="fw-bold text-center pt-2">新的消息</h4>
                <h5 className="text-center">暂无新的消息</h5>
                <hr className="mb-0"/>
            </>
        );
        else return (
            <>
                <h4 className="fw-bold text-center pt-2">新的消息</h4>
                <div className="d-flex flex-column gap-3">
                    {newMessages.map((newMessage, index) => (
                        <div
                            key={index}
                            style={{cursor: "pointer"}}
                            className="px-2 d-flex align-items-center"
                            onClick={() => {
                                console.log(newMessage.id);
                                if(newMessage.type === 0)
                                    jumpToChat(findUserById(newMessage.id), 0);
                                else
                                    jumpToChat(findGroupById(newMessage.id), 1);
                            }}
                        >
                            <UserCard name={newMessage.name}/>
                        </div>
                    ))}
                </div>
                <hr className="mb-0"/>
            </>
        );
    };

    const renderMemberList = () => {
        if (mode === 0) return null;
        return (
            <>
                <h4 className="fw-bold text-center pt-2">成员列表</h4>
                <div className="d-flex flex-column gap-3">
                    {members.map((user, index) => (
                        <div key={index} style={{cursor: "pointer"}}
                             className="px-2 d-flex align-items-center" onClick={() => {
                            jumpToChat(user, 0);
                        }}>
                            <UserCard name={user.name}/>
                        </div>
                    ))}
                    <div style={{cursor: "pointer"}}
                         className="px-2 d-flex align-items-center" onClick={() => {
                    }}
                         data-bs-toggle="modal"
                         data-bs-target={"#inviteMember"}
                    >
                        <Avatar name="+" color="#ffffff" textColor="#000000" size={"sm"}/>
                    </div>
                </div>
            </>
        );
    };

  return (
    <div>
      {renderFriendRequest()}
      {renderNewMessages()}
      {renderMemberList()}
    </div>
  );
}

export default RightBar;
